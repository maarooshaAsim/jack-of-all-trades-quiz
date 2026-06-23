<?php

namespace Tests\Feature;

use App\Models\ResultType;
use App\Services\OutcomeCalculator;
use Database\Seeders\ResultTypeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResultTypeOutcomeIntegrityTest extends TestCase
{
    use RefreshDatabase;

    public function test_every_calculated_outcome_resolves_to_a_seeded_result_type(): void
    {
        $this->seed(ResultTypeSeeder::class);

        $calculator = new OutcomeCalculator(base_path('docs/score_type_link.csv'));
        $resolvedSlugs = [];

        foreach (range(18, 90) as $totalScore) {
            $outcome = $calculator->calculate($this->answersForTotal($totalScore));
            $slug = $outcome['outcome']['branch_slug'];

            $this->assertTrue(
                ResultType::query()->where('slug', $slug)->exists(),
                "Calculated outcome [{$slug}] for score [{$totalScore}] is not seeded.",
            );

            $resolvedSlugs[$slug] = true;
        }

        foreach (array_keys($resolvedSlugs) as $slug) {
            $this->getJson("/api/result-types/{$slug}")
                ->assertOk()
                ->assertJsonPath('data.slug', $slug);
        }
    }

    /**
     * @return array<int, array{question_id: string, answer_key: string, score_value: int}>
     */
    private function answersForTotal(int $totalScore): array
    {
        $scores = array_fill(0, 18, 1);
        $remainingScore = $totalScore - 18;

        foreach ($scores as $index => $score) {
            if ($remainingScore === 0) {
                break;
            }

            $increase = min(4, $remainingScore);
            $scores[$index] = $score + $increase;
            $remainingScore -= $increase;
        }

        return array_map(
            static fn (int $score, int $index): array => [
                'question_id' => sprintf('q_%02d', $index + 1),
                'answer_key' => 'A',
                'score_value' => $score,
            ],
            $scores,
            array_keys($scores),
        );
    }
}
