<?php

namespace Database\Seeders;

use App\Models\ResultType;
use Illuminate\Database\Seeder;

class ResultTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->resultTypes() as $index => $resultType) {
            $baseType = ResultType::query()->updateOrCreate(
                ['slug' => $resultType['slug']],
                [
                    ...$this->attributesFor($resultType),
                    'parent_id' => null,
                    'sort_order' => $index + 1,
                ],
            );

            foreach ($resultType['branches'] as $branchIndex => $branch) {
                ResultType::query()->updateOrCreate(
                    ['slug' => $branch['slug']],
                    [
                        ...$this->attributesFor([...$resultType, ...$branch]),
                        'parent_id' => $baseType->id,
                        'sort_order' => $branchIndex + 1,
                    ],
                );
            }
        }
    }

    /**
     * @param  array<string, mixed>  $resultType
     * @return array<string, mixed>
     */
    private function attributesFor(array $resultType): array
    {
        return [
            'name' => $resultType['name'],
            'description' => $resultType['description'],
            'breadth_percentage' => $resultType['dimensions']['breadth']['percentage'],
            'breadth_description' => $resultType['dimensions']['breadth']['description'],
            'output_percentage' => $resultType['dimensions']['output']['percentage'],
            'output_description' => $resultType['dimensions']['output']['description'],
            'depth_percentage' => $resultType['dimensions']['depth']['percentage'],
            'depth_description' => $resultType['dimensions']['depth']['description'],
            'recognition_percentage' => $resultType['dimensions']['recognition']['percentage'],
            'recognition_description' => $resultType['dimensions']['recognition']['description'],
            'integration_percentage' => $resultType['dimensions']['integration']['percentage'],
            'integration_description' => $resultType['dimensions']['integration']['description'],
            'base_color' => $resultType['base_color'],
            'accent_color' => $resultType['accent_color'],
            'graph_path' => $resultType['graph_path'],
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function resultTypes(): array
    {
        return [
            [
                'slug' => 'linear-specialist',
                'name' => 'Linear Specialist',
                'description' => 'Here energy flows through a single, well-defined channel. You have found your place in one domain and built there with precision and commitment.',
                'base_color' => '#69B2F5',
                'accent_color' => '#00395D',
                'graph_path' => '/storage/assets/result_categories/contended_specialist.svg',
                'dimensions' => [
                    'breadth' => ['percentage' => 25, 'description' => 'Your interests concentrate in one or two areas. The narrowness is deliberate, not accidental.'],
                    'output' => ['percentage' => 70, 'description' => 'You produce consistently within your domain. The output may not be flashy, but it compounds.'],
                    'depth' => ['percentage' => 85, 'description' => 'You pursue skills until they become reliable, visible, and valuable. Going deep is your primary strength.'],
                    'recognition' => ['percentage' => 80, 'description' => 'You are known for what you do. The title, credential, or reputation generally matches the work.'],
                    'integration' => ['percentage' => 20, 'description' => 'Your skills do not need to connect across domains because the work itself already feels whole.'],
                ],
                'branches' => [
                    [
                        'slug' => 'contented-specialist',
                        'name' => 'Contented Specialist',
                        'description' => 'Deep satisfaction in focused mastery. Concentrated, recognized, productive.',
                        'graph_path' => '/storage/assets/result_categories/contended_specialist.svg',
                    ],
                    [
                        'slug' => 'assigned-specialist',
                        'name' => 'Assigned Specialist',
                        'description' => 'Specialization chosen by external pressure. Inherited path, not elected.',
                        'graph_path' => '/storage/assets/result_categories/assigned_specialist.svg',
                    ],
                    [
                        'slug' => 'settling-generalist',
                        'name' => 'Settling Generalist',
                        'description' => 'Curiosity alive but constrained. External systems compress exploration.',
                        'graph_path' => '/storage/assets/result_categories/settling_generlist.svg',
                    ],
                ],
            ],
            [
                'slug' => 'emerging-explorer',
                'name' => 'Emerging Explorer',
                'description' => 'Curiosity is active, but the shape is still forming. You are negotiating between structure, permission, and the urge to explore.',
                'base_color' => '#F4BE21',
                'accent_color' => '#6B4414',
                'graph_path' => '/storage/assets/result_categories/suppressed_explorer.svg',
                'dimensions' => [
                    'breadth' => ['percentage' => 48, 'description' => 'You feel the pull of multiple paths, even if some remain quiet or postponed.'],
                    'output' => ['percentage' => 38, 'description' => 'Output comes in bursts. The work often needs a clearer container before it becomes public.'],
                    'depth' => ['percentage' => 42, 'description' => 'Your commitment can deepen when the work feels personally meaningful and safe to pursue.'],
                    'recognition' => ['percentage' => 30, 'description' => 'You may not yet be fully seen for the range you carry, but the signal is growing.'],
                    'integration' => ['percentage' => 35, 'description' => 'Connections are beginning to appear, but they may not yet feel stable or named.'],
                ],
                'branches' => [
                    [
                        'slug' => 'suppressed-explorer',
                        'name' => 'Suppressed Explorer',
                        'description' => 'Once explored widely, now consolidated. Broader curiosity lies dormant.',
                        'graph_path' => '/storage/assets/result_categories/suppressed_explorer.svg',
                    ],
                    [
                        'slug' => 'contained-polymath',
                        'name' => 'Contained Polymath',
                        'description' => 'Start with intensity, abandon at difficulty. Fear of imperfection blocks progress.',
                        'graph_path' => '/storage/assets/result_categories/contained_dropper.svg',
                    ],
                ],
            ],
            [
                'slug' => 'active-synthesizer',
                'name' => 'Active Synthesizer',
                'description' => 'You gather, test, and connect ideas quickly. The challenge is turning that movement into chosen direction and visible output.',
                'base_color' => '#A9D90A',
                'accent_color' => '#38470A',
                'graph_path' => '/storage/assets/result_categories/perfectionist_dropper.svg',
                'dimensions' => [
                    'breadth' => ['percentage' => 72, 'description' => 'Your range is real and active. New subjects are not distractions; they are fuel.'],
                    'output' => ['percentage' => 45, 'description' => 'The main work is choosing what gets finished, shipped, or made visible.'],
                    'depth' => ['percentage' => 52, 'description' => 'Depth grows unevenly, often where curiosity and usefulness overlap.'],
                    'recognition' => ['percentage' => 40, 'description' => 'Others may see fragments before they understand the system behind them.'],
                    'integration' => ['percentage' => 58, 'description' => 'You naturally compare fields and borrow methods across contexts.'],
                ],
                'branches' => [
                    [
                        'slug' => 'perfectionist-dropper',
                        'name' => 'Perfectionist Dropper',
                        'description' => 'Learn voraciously, create sparingly. Knowledge accumulates without direction.',
                        'graph_path' => '/storage/assets/result_categories/perfectionist_dropper.svg',
                    ],
                    [
                        'slug' => 'passive-accumulator',
                        'name' => 'Passive Accumulator',
                        'description' => 'Breadth is real but socially mediated. Skills driven by external utility.',
                        'graph_path' => '/storage/assets/result_categories/passive_accumulator.svg',
                    ],
                    [
                        'slug' => 'drifting-aspirant',
                        'name' => 'Drifting Aspirant',
                        'description' => 'Move between interests without depth or integration. Drift follows trends.',
                        'graph_path' => '/storage/assets/result_categories/drifting_aspirant.svg',
                    ],
                ],
            ],
            [
                'slug' => 'integrated-architect',
                'name' => 'Integrated Architect',
                'description' => 'Your skills are becoming a coherent system. Different domains no longer feel separate; they start to form one working architecture.',
                'base_color' => '#FF5A2C',
                'accent_color' => '#7D2B17',
                'graph_path' => '/storage/assets/result_categories/systematic_weiver.svg',
                'dimensions' => [
                    'breadth' => ['percentage' => 78, 'description' => 'You hold a wide field without treating every interest as equal.'],
                    'output' => ['percentage' => 72, 'description' => 'Your work becomes stronger when the parts are allowed to reinforce each other.'],
                    'depth' => ['percentage' => 72, 'description' => 'Depth is built where the system requires it, not simply where tradition points.'],
                    'recognition' => ['percentage' => 58, 'description' => 'Recognition may lag behind the complexity of what you are actually building.'],
                    'integration' => ['percentage' => 88, 'description' => 'Integration is the center of gravity. You connect tools, roles, and disciplines into one method.'],
                ],
                'branches' => [
                    [
                        'slug' => 'systemic-weaver',
                        'name' => 'Systemic Weaver',
                        'description' => 'In motion. Patterns forming but not fixed. Becoming, not yet arrived.',
                        'graph_path' => '/storage/assets/result_categories/systematic_weiver.svg',
                    ],
                    [
                        'slug' => 'survival-synthesizer',
                        'name' => 'Survival Synthesizer',
                        'description' => 'Hold vision of skill connections. Actively weave into coherent systems.',
                        'graph_path' => '/storage/assets/result_categories/survival_sythetizer.svg',
                    ],
                    [
                        'slug' => 'serial-builder',
                        'name' => 'Serial Builder',
                        'description' => 'Integration from necessity. Hard-won, pragmatic combination of skills.',
                        'graph_path' => '/storage/assets/result_categories/serial_builder.svg',
                    ],
                ],
            ],
            [
                'slug' => 'transformative-polymath',
                'name' => 'Transformative polymath',
                'description' => 'Your work has crossed from collection into transformation. You build systems where multiple disciplines become one original language.',
                'base_color' => '#9B21F0',
                'accent_color' => '#3C0D61',
                'graph_path' => '/storage/assets/result_categories/systems_architect.svg',
                'dimensions' => [
                    'breadth' => ['percentage' => 90, 'description' => 'Breadth is mature and intentional. You know what belongs in the system and what does not.'],
                    'output' => ['percentage' => 84, 'description' => 'Your output carries the signature of multiple domains working together.'],
                    'depth' => ['percentage' => 86, 'description' => 'Depth is built across time, with each phase strengthening the next.'],
                    'recognition' => ['percentage' => 76, 'description' => 'Recognition may arrive through the originality of the system rather than a conventional title.'],
                    'integration' => ['percentage' => 94, 'description' => 'Integration is no longer a tactic; it is the way the work thinks.'],
                ],
                'branches' => [
                    [
                        'slug' => 'systems-architect',
                        'name' => 'Systems Architect',
                        'description' => 'Develop intensely, one at a time, each building on the last. Polymath in time.',
                        'graph_path' => '/storage/assets/result_categories/systems_architect.svg',
                    ],
                ],
            ],
        ];
    }
}
