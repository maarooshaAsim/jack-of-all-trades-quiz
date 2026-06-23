<?php

namespace Tests\Feature;

use App\Models\ResultType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResultTypeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_base_result_types_with_branches(): void
    {
        $baseType = ResultType::factory()->create([
            'slug' => 'linear-specialist',
            'name' => 'Linear Specialist',
            'parent_id' => null,
            'sort_order' => 1,
        ]);

        ResultType::factory()->create([
            'slug' => 'contented-specialist',
            'name' => 'Contented Specialist',
            'parent_id' => $baseType->id,
            'sort_order' => 1,
        ]);

        $response = $this->getJson('/api/result-types');

        $response->assertOk()
            ->assertJsonPath('data.0.slug', 'linear-specialist')
            ->assertJsonPath('data.0.breadth.percentage', $baseType->breadth_percentage)
            ->assertJsonPath('data.0.branches.0.slug', 'contented-specialist');
    }

    public function test_it_shows_a_result_type_by_slug(): void
    {
        ResultType::factory()->create([
            'slug' => 'active-synthesizer',
            'name' => 'Active Synthesizer',
        ]);

        $response = $this->getJson('/api/result-types/active-synthesizer');

        $response->assertOk()
            ->assertJsonPath('data.slug', 'active-synthesizer')
            ->assertJsonPath('data.name', 'Active Synthesizer');
    }

    public function test_it_resolves_a_legacy_result_type_slug(): void
    {
        ResultType::factory()->create([
            'slug' => 'iterative-designer',
            'name' => 'Iterative Designer',
        ]);

        $response = $this->getJson('/api/result-types/perfectionist-dropper');

        $response->assertOk()
            ->assertJsonPath('data.slug', 'iterative-designer')
            ->assertJsonPath('data.name', 'Iterative Designer');
    }
}
