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
        Schema::create('responses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('session_id')->index();
            $table->foreignId('outcome_id')
                ->nullable()
                ->constrained('outcomes')
                ->nullOnDelete();
            $table->string('ip_address', 45)->nullable();
            $table->unsignedSmallInteger('total_score')->nullable();
            $table->string('outcome_base_type')->nullable();
            $table->string('outcome_branch')->nullable();
            $table->string('outcome_score_range')->nullable();
            $table->text('outcome_description')->nullable();
            $table->timestamp('completed_at')->nullable()->index();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responses');
    }
};
