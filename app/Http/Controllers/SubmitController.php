<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubmitQuizRequest;
use App\Services\OutcomeCalculator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SubmitController extends Controller
{
    public function store(SubmitQuizRequest $request, OutcomeCalculator $outcomeCalculator): array
    {
        /** @var array{
         *     session_id: string,
         *     answers: array<int, array{
         *         question_id: string,
         *         category: string,
         *         answer_key: string,
         *         answer_text: string,
         *         question_index: int,
         *         score_breadth: int,
         *         score_depth: int,
         *         score_integration: int,
         *         score_output: int,
         *         score_recognition: int
         *     }>
         * } $payload
         */
        $payload = $request->validated();

        $calculatedOutcome = $outcomeCalculator->calculate(
            array_map(
                static fn (array $answer): array => [
                    'question_id' => $answer['question_id'],
                    'answer_key' => $answer['answer_key'],
                    'breadth' => $answer['score_breadth'],
                    'depth' => $answer['score_depth'],
                    'integration' => $answer['score_integration'],
                    'output' => $answer['score_output'],
                    'recognition' => $answer['score_recognition'],
                ],
                $payload['answers'],
            ),
        );

        DB::transaction(function () use ($payload, $request, $calculatedOutcome): void {
            $responseId = (string) Str::uuid();
            $outcomeId = DB::table('outcomes')->where('id', $calculatedOutcome['outcome_id'])->exists()
                ? $calculatedOutcome['outcome_id']
                : null;

            DB::table('responses')->insert([
                'id' => $responseId,
                'session_id' => $payload['session_id'],
                'outcome_id' => $outcomeId,
                'ip_address' => $request->ip(),
                'total_breadth' => $calculatedOutcome['dimension_totals']['breadth'],
                'total_depth' => $calculatedOutcome['dimension_totals']['depth'],
                'total_integration' => $calculatedOutcome['dimension_totals']['integration'],
                'total_output' => $calculatedOutcome['dimension_totals']['output'],
                'total_recognition' => $calculatedOutcome['dimension_totals']['recognition'],
                'grand_total' => $calculatedOutcome['grand_total'],
                'completed_at' => now(),
            ]);

            DB::table('answers')->insert(
                array_map(
                    static fn (array $answer): array => [
                        'response_id' => $responseId,
                        'question_id' => $answer['question_id'],
                        'category' => $answer['category'],
                        'answer_key' => $answer['answer_key'],
                        'answer_text' => $answer['answer_text'],
                        'score_breadth' => $answer['score_breadth'],
                        'score_depth' => $answer['score_depth'],
                        'score_integration' => $answer['score_integration'],
                        'score_output' => $answer['score_output'],
                        'score_recognition' => $answer['score_recognition'],
                        'question_index' => $answer['question_index'],
                    ],
                    $payload['answers'],
                ),
            );
        });

        return [
            'status' => 'ok',
            'dimension_totals' => $calculatedOutcome['dimension_totals'],
            'grand_total' => $calculatedOutcome['grand_total'],
            'outcome_id' => $calculatedOutcome['outcome_id'],
        ];
    }
}
