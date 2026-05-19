<?php

namespace App\Services;

class OutcomeCalculator
{
    /**
     * @param  array<int, array{
     *     question_id: string,
     *     answer_key: string,
     *     breadth: int,
     *     depth: int,
     *     integration: int,
     *     output: int,
     *     recognition: int
     * }>  $answers
     * @return array{
     *     dimension_totals: array{
     *         breadth: int,
     *         depth: int,
     *         integration: int,
     *         output: int,
     *         recognition: int
     *     },
     *     grand_total: int,
     *     outcome_id: int
     * }
     */
    public function calculate(array $answers): array
    {
        $totals = [
            'breadth' => 0,
            'depth' => 0,
            'integration' => 0,
            'output' => 0,
            'recognition' => 0,
        ];

        foreach ($answers as $answer) {
            $totals['breadth'] += $answer['breadth'];
            $totals['depth'] += $answer['depth'];
            $totals['integration'] += $answer['integration'];
            $totals['output'] += $answer['output'];
            $totals['recognition'] += $answer['recognition'];
        }

        $grandTotal = array_sum($totals);

        return [
            'dimension_totals' => $totals,
            'grand_total' => $grandTotal,
            'outcome_id' => $this->matchOutcome($totals, $grandTotal),
        ];
    }

    /**
     * @param  array{
     *     breadth: int,
     *     depth: int,
     *     integration: int,
     *     output: int,
     *     recognition: int
     * }  $totals
     */
    private function matchOutcome(array $totals, int $grandTotal): int
    {
        return 1;
    }
}
