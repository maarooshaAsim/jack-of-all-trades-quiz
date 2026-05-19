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
            $table->unsignedSmallInteger('total_breadth')->nullable();
            $table->unsignedSmallInteger('total_depth')->nullable();
            $table->unsignedSmallInteger('total_integration')->nullable();
            $table->unsignedSmallInteger('total_output')->nullable();
            $table->unsignedSmallInteger('total_recognition')->nullable();
            $table->unsignedSmallInteger('grand_total')->nullable();
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
