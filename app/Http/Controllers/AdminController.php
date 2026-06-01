<?php

namespace App\Http\Controllers;

use App\Services\AnswerExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AdminController extends Controller
{
    public function login(Request $request): array
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $username = config('app.admin_username');
        $password = config('app.admin_password');
        $token = config('app.admin_token');

        if (! is_string($username) || $username === '' || ! is_string($password) || $password === '') {
            abort(500, 'Admin credentials are not configured.');
        }

        if (! is_string($token) || $token === '') {
            abort(500, 'Admin token is not configured.');
        }

        if (
            ! hash_equals($username, $credentials['username'])
            || ! hash_equals($password, $credentials['password'])
        ) {
            abort(401, 'Invalid admin credentials.');
        }

        return [
            'status' => 'ok',
            'token' => $token,
        ];
    }

    public function export(Request $request, AnswerExport $answerExport): BinaryFileResponse
    {
        $export = $answerExport->createXlsx();

        return response()
            ->download(
                $export['path'],
                $export['filename'],
                ['Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            )
            ->deleteFileAfterSend();
    }

    /**
     * @return array<string, mixed>
     */
    public function stats(Request $request): array
    {
        $totalAttempts = DB::table('responses')->count();
        $totalAnswers = DB::table('answers')->count();
        $latestAttempt = DB::table('responses')->max('completed_at');

        $branches = DB::table('responses')
            ->select('outcome_branch', DB::raw('COUNT(*) as total'))
            ->whereNotNull('outcome_branch')
            ->groupBy('outcome_branch')
            ->orderByDesc('total')
            ->orderBy('outcome_branch')
            ->limit(5)
            ->get()
            ->map(fn (object $row): array => [
                'name' => $row->outcome_branch,
                'total' => (int) $row->total,
            ])
            ->all();

        return [
            'status' => 'ok',
            'stats' => [
                'total_attempts' => $totalAttempts,
                'total_answers' => $totalAnswers,
                'latest_attempt_at' => $latestAttempt,
                'top_branches' => $branches,
            ],
        ];
    }
}
