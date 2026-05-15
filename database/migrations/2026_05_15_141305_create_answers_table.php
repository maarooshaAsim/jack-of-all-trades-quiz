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
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('response_id')
                ->constrained('responses')
                ->cascadeOnDelete();
            $table->string('question_id');
            $table->string('category');
            $table->string('answer_key', 1);
            $table->text('answer_text');
            $table->unsignedTinyInteger('score_value');
            $table->unsignedTinyInteger('question_index');

            $table->unique(['response_id', 'question_id']);
            $table->unique(['response_id', 'question_index']);
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};
