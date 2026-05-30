<?php

namespace Database\Factories;

use App\Models\ResultType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ResultType>
 */
class ResultTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(),
            'name' => fake()->words(2, true),
            'description' => fake()->paragraph(),
            'breadth_percentage' => fake()->numberBetween(0, 100),
            'breadth_description' => fake()->paragraph(),
            'output_percentage' => fake()->numberBetween(0, 100),
            'output_description' => fake()->paragraph(),
            'depth_percentage' => fake()->numberBetween(0, 100),
            'depth_description' => fake()->paragraph(),
            'recognition_percentage' => fake()->numberBetween(0, 100),
            'recognition_description' => fake()->paragraph(),
            'integration_percentage' => fake()->numberBetween(0, 100),
            'integration_description' => fake()->paragraph(),
            'base_color' => fake()->hexColor(),
            'accent_color' => fake()->hexColor(),
            'graph_path' => '/storage/assets/result_categories/contended_specialist.svg',
            'sort_order' => fake()->numberBetween(1, 100),
        ];
    }
}
