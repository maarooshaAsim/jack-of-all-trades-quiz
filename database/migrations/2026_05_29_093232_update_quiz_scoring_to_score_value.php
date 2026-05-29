<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('answers', 'score_value')) {
            Schema::table('answers', function (Blueprint $table) {
                $table->unsignedTinyInteger('score_value')->nullable()->after('answer_text');
            });
        }

        foreach (['score_breadth', 'score_depth', 'score_integration', 'score_output', 'score_recognition'] as $column) {
            if (Schema::hasColumn('answers', $column)) {
                Schema::table('answers', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }

        if (! Schema::hasColumn('responses', 'total_score')) {
            Schema::table('responses', function (Blueprint $table) {
                $table->unsignedSmallInteger('total_score')->nullable()->after('ip_address');
            });
        }

        foreach ([
            'outcome_base_type' => 'total_score',
            'outcome_branch' => 'outcome_base_type',
            'outcome_score_range' => 'outcome_branch',
        ] as $column => $after) {
            if (! Schema::hasColumn('responses', $column)) {
                Schema::table('responses', function (Blueprint $table) use ($column, $after) {
                    $table->string($column)->nullable()->after($after);
                });
            }
        }

        if (! Schema::hasColumn('responses', 'outcome_description')) {
            Schema::table('responses', function (Blueprint $table) {
                $table->text('outcome_description')->nullable()->after('outcome_score_range');
            });
        }

        foreach ([
            'total_breadth',
            'total_depth',
            'total_integration',
            'total_output',
            'total_recognition',
            'grand_total',
        ] as $column) {
            if (Schema::hasColumn('responses', $column)) {
                Schema::table('responses', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach ([
            'score_breadth',
            'score_depth',
            'score_integration',
            'score_output',
            'score_recognition',
        ] as $column) {
            if (! Schema::hasColumn('answers', $column)) {
                Schema::table('answers', function (Blueprint $table) use ($column) {
                    $table->unsignedTinyInteger($column)->nullable()->after('answer_text');
                });
            }
        }

        if (Schema::hasColumn('answers', 'score_value')) {
            Schema::table('answers', function (Blueprint $table) {
                $table->dropColumn('score_value');
            });
        }

        foreach ([
            'total_breadth',
            'total_depth',
            'total_integration',
            'total_output',
            'total_recognition',
            'grand_total',
        ] as $column) {
            if (! Schema::hasColumn('responses', $column)) {
                Schema::table('responses', function (Blueprint $table) use ($column) {
                    $table->unsignedSmallInteger($column)->nullable()->after('ip_address');
                });
            }
        }

        foreach ([
            'outcome_description',
            'outcome_score_range',
            'outcome_branch',
            'outcome_base_type',
            'total_score',
        ] as $column) {
            if (Schema::hasColumn('responses', $column)) {
                Schema::table('responses', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }
    }
};
