<?php

namespace Tests\Unit;

use App\Services\OutcomeCalculator;
use PHPUnit\Framework\TestCase;

class OutcomeCalculatorTest extends TestCase
{
    public function test_it_calculates_dimension_totals_and_grand_total(): void
    {
        $calculator = new OutcomeCalculator;

        $result = $calculator->calculate([
            [
                'question_id' => 'ep_q1',
                'answer_key' => 'B',
                'breadth' => 4,
                'depth' => 2,
                'integration' => 2,
                'output' => 2,
                'recognition' => 1,
            ],
            [
                'question_id' => 'ep_q2',
                'answer_key' => 'C',
                'breadth' => 3,
                'depth' => 2,
                'integration' => 2,
                'output' => 2,
                'recognition' => 1,
            ],
        ]);

        $this->assertSame([
            'breadth' => 7,
            'depth' => 4,
            'integration' => 4,
            'output' => 4,
            'recognition' => 2,
        ], $result['dimension_totals']);
        $this->assertSame(21, $result['grand_total']);
        $this->assertSame(1, $result['outcome_id']);
    }
}
