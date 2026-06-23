<?php

namespace App\Support;

use Illuminate\Support\Str;

final class ResultTypeSlug
{
    /** @var array<string, string> */
    private const LEGACY_ALIASES = [
        'settling-generalist' => 'operational-generalist',
        'suppressed-explorer' => 'cross-domain-learner',
        'contained-polymath' => 'multidisciplinary-strategist',
        'perfectionist-dropper' => 'iterative-designer',
        'passive-accumulator' => 'research-sythesist',
        'drifting-aspirant' => 'creative-explorer',
        'survival-synthesizer' => 'resource-synthesizer',
        'systems-architect' => 'field-architect',
    ];

    public static function fromName(string $name): string
    {
        return self::resolve(Str::slug($name));
    }

    public static function resolve(string $slug): string
    {
        return self::LEGACY_ALIASES[$slug] ?? $slug;
    }
}
