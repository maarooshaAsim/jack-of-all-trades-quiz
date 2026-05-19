<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class SubmitQuizTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_answers_and_dimension_totals_for_a_completed_quiz(): void
    {
        DB::table('outcomes')->insert([
            'id' => 1,
            'title' => 'Placeholder Outcome',
            'description' => 'Placeholder outcome used while thresholds are pending.',
            'graph_image_path' => null,
            'scoring_rules' => json_encode([]),
        ]);

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
                    'score_breadth' => 1,
                    'score_depth' => 2,
                    'score_integration' => 3,
                    'score_output' => 4,
                    'score_recognition' => 5,
                ],
                range(0, 17),
            ),
        ]);

        $response->assertOk()->assertJson([
            'status' => 'ok',
            'dimension_totals' => [
                'breadth' => 18,
                'depth' => 36,
                'integration' => 54,
                'output' => 72,
                'recognition' => 90,
            ],
            'grand_total' => 270,
            'outcome_id' => 1,
        ]);

        $this->assertDatabaseHas('responses', [
            'session_id' => $sessionId,
            'outcome_id' => 1,
            'total_breadth' => 18,
            'total_depth' => 36,
            'total_integration' => 54,
            'total_output' => 72,
            'total_recognition' => 90,
            'grand_total' => 270,
        ]);

        $this->assertDatabaseHas('answers', [
            'question_id' => 'q_01',
            'score_breadth' => 1,
            'score_depth' => 2,
            'score_integration' => 3,
            'score_output' => 4,
            'score_recognition' => 5,
        ]);

        $this->assertDatabaseCount('answers', 18);
    }
}
