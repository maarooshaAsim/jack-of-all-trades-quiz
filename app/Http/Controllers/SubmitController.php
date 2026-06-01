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
         *     participant_name: string,
         *     participant_age: int,
         *     answers: array<int, array{
         *         question_id: string,
         *         category: string,
         *         answer_key: string,
         *         answer_text: string,
         *         question_index: int,
         *         score_value: int
         *     }>
         * } $payload
         */
        $payload = $request->validated();

        $calculatedOutcome = $outcomeCalculator->calculate(
            array_map(
                static fn (array $answer): array => [
                    'question_id' => $answer['question_id'],
                    'answer_key' => $answer['answer_key'],
                    'score_value' => $answer['score_value'],
                ],
                $payload['answers'],
            ),
        );

        DB::transaction(function () use ($payload, $request, $calculatedOutcome): void {
            $responseId = (string) Str::uuid();

            DB::table('responses')->insert([
                'id' => $responseId,
                'session_id' => $payload['session_id'],
                'participant_name' => $payload['participant_name'],
                'participant_age' => $payload['participant_age'],
                'outcome_id' => null,
                'ip_address' => $request->ip(),
                'total_score' => $calculatedOutcome['total_score'],
                'outcome_base_type' => $calculatedOutcome['outcome']['base_type'],
                'outcome_branch' => $calculatedOutcome['outcome']['branch'],
                'outcome_score_range' => $calculatedOutcome['outcome']['score_range'],
                'outcome_description' => $calculatedOutcome['outcome']['description'],
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
                        'score_value' => $answer['score_value'],
                        'question_index' => $answer['question_index'],
                    ],
                    $payload['answers'],
                ),
            );
        });

        return [
            'status' => 'ok',
            'participant' => [
                'name' => $payload['participant_name'],
                'age' => $payload['participant_age'],
            ],
            'total_score' => $calculatedOutcome['total_score'],
            'outcome' => $calculatedOutcome['outcome'],
        ];
    }
}
