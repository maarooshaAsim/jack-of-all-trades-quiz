<?php

namespace Tests\Unit;

use App\Services\OutcomeCalculator;
use PHPUnit\Framework\TestCase;

class OutcomeCalculatorTest extends TestCase
{
    public function test_it_calculates_total_score_and_matches_outcome_range(): void
    {
        $calculator = new OutcomeCalculator(dirname(__DIR__, 2).'/docs/score_type_link.csv');

        $answers = array_map(
            static fn (int $index): array => [
                'question_id' => sprintf('q_%02d', $index + 1),
                'answer_key' => 'A',
                'score_value' => $index < 12 ? 1 : 3,
            ],
            range(0, 17),
        );

        $result = $calculator->calculate($answers);

        $this->assertSame(30, $result['total_score']);
        $this->assertSame([
            'base_type' => 'Linear Specialist',
            'branch_slug' => 'assigned-specialist',
            'branch' => 'Assigned Specialist',
            'score_range' => '30-38',
            'description' => 'Specialization chosen by external pressure. Inherited path, not elected.',
        ], $result['outcome']);
    }

    public function test_it_returns_the_current_slug_for_a_legacy_branch_name(): void
    {
        $scoreTypeLinkPath = tempnam(sys_get_temp_dir(), 'score-type-link-');

        file_put_contents(
            $scoreTypeLinkPath,
            "Base Type,Branch,Total Score Range,Description\nActive Synthesizer,Perfectionist Dropper,18-90,Legacy branch\n",
        );

        try {
            $calculator = new OutcomeCalculator($scoreTypeLinkPath);
            $result = $calculator->calculate([
                [
                    'question_id' => 'q_01',
                    'answer_key' => 'A',
                    'score_value' => 18,
                ],
            ]);

            $this->assertSame('iterative-designer', $result['outcome']['branch_slug']);
        } finally {
            unlink($scoreTypeLinkPath);
        }
    }
}
