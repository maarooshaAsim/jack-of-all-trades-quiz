<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubmitQuizTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_answers_and_total_score_for_a_completed_quiz(): void
    {
        $sessionId = '11111111-1111-4111-8111-111111111111';

        $response = $this->postJson('/api/submit', [
            'session_id' => $sessionId,
            'answers' => array_map(
                static fn (int $index): array => [
                    'question_id' => sprintf('q_%02d', $index + 1),
                    'category' => 'engagement_pattern',
                    'answer_key' => 'A',
                    'answer_text' => sprintf('Answer %d', $index + 1),
                    'question_index' => $index,
                    'score_value' => 1,
                ],
                range(0, 17),
            ),
        ]);

        $response->assertOk()->assertJson([
            'status' => 'ok',
            'total_score' => 18,
            'outcome' => [
                'base_type' => 'Linear Specialist',
                'branch_slug' => 'contented-specialist',
                'branch' => 'Contented Specialist',
                'score_range' => '18-29',
                'description' => 'Deep satisfaction in focused mastery. Concentrated, recognized, productive.',
            ],
        ]);

        $this->assertDatabaseHas('responses', [
            'session_id' => $sessionId,
            'outcome_id' => null,
            'total_score' => 18,
            'outcome_base_type' => 'Linear Specialist',
            'outcome_branch' => 'Contented Specialist',
            'outcome_score_range' => '18-29',
            'outcome_description' => 'Deep satisfaction in focused mastery. Concentrated, recognized, productive.',
        ]);

        $this->assertDatabaseHas('answers', [
            'question_id' => 'q_01',
            'score_value' => 1,
        ]);

        $this->assertDatabaseCount('answers', 18);
    }
}
