<?php

namespace App\Services;

use RuntimeException;

class OutcomeCalculator
{
    public function __construct(
        private readonly ?string $scoreTypeLinkPath = null,
    ) {}

    /**
     * @param  array<int, array{
     *     question_id: string,
     *     answer_key: string,
     *     score_value: int
     * }>  $answers
     * @return array{
     *     total_score: int,
     *     outcome: array{
     *         base_type: string,
     *         branch: string,
     *         score_range: string,
     *         description: string
     *     }
     * }
     */
    public function calculate(array $answers): array
    {
        $totalScore = array_sum(
            array_map(
                static fn (array $answer): int => $answer['score_value'],
                $answers,
            ),
        );

        return [
            'total_score' => $totalScore,
            'outcome' => $this->matchOutcome($totalScore),
        ];
    }

    /**
     * @return array{
     *     base_type: string,
     *     branch: string,
     *     score_range: string,
     *     description: string
     * }
     */
    private function matchOutcome(int $totalScore): array
    {
        foreach ($this->scoreTypeLinks() as $scoreTypeLink) {
            if ($this->scoreIsWithinRange($totalScore, $scoreTypeLink)) {
                return [
                    'base_type' => $scoreTypeLink['base_type'],
                    'branch' => $scoreTypeLink['branch'],
                    'score_range' => $scoreTypeLink['score_range'],
                    'description' => $scoreTypeLink['description'],
                ];
            }
        }

        throw new RuntimeException("No outcome score range matched total score [{$totalScore}].");
    }

    /**
     * @param  array{min_score: int, max_score: int, is_final_range: bool}  $scoreTypeLink
     */
    private function scoreIsWithinRange(int $totalScore, array $scoreTypeLink): bool
    {
        if ($scoreTypeLink['is_final_range']) {
            return $totalScore >= $scoreTypeLink['min_score'] && $totalScore <= $scoreTypeLink['max_score'];
        }

        return $totalScore >= $scoreTypeLink['min_score'] && $totalScore < $scoreTypeLink['max_score'];
    }

    /**
     * CSV ranges share boundaries, for example 18-30 and 30-38.
     * Boundaries are treated as lower-inclusive and upper-exclusive, except the final range.
     *
     * @return array<int, array{
     *     base_type: string,
     *     branch: string,
     *     score_range: string,
     *     min_score: int,
     *     max_score: int,
     *     description: string,
     *     is_final_range: bool
     * }>
     */
    private function scoreTypeLinks(): array
    {
        $path = $this->scoreTypeLinkPath ?? base_path('docs/score_type_link.csv');
        $handle = fopen($path, 'r');

        if ($handle === false) {
            throw new RuntimeException("Could not open score type link file [{$path}].");
        }

        $header = fgetcsv($handle);
        $scoreTypeLinks = [];

        while (($row = fgetcsv($handle)) !== false) {
            if ($row === [null] || count(array_filter($row)) === 0) {
                continue;
            }

            [$minimumScore, $maximumScore] = array_map('intval', explode('-', $row[2]));

            $scoreTypeLinks[] = [
                'base_type' => trim($row[0]),
                'branch' => trim($row[1]),
                'score_range' => trim($row[2]),
                'min_score' => $minimumScore,
                'max_score' => $maximumScore,
                'description' => trim($row[3]),
                'is_final_range' => false,
            ];
        }

        fclose($handle);

        if ($header === false || $scoreTypeLinks === []) {
            throw new RuntimeException("Score type link file [{$path}] did not contain usable rows.");
        }

        $lastIndex = array_key_last($scoreTypeLinks);
        $scoreTypeLinks[$lastIndex]['is_final_range'] = true;

        return $scoreTypeLinks;
    }
}
