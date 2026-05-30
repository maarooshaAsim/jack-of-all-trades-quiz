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
        Schema::create('result_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')
                ->nullable()
                ->constrained('result_types')
                ->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedTinyInteger('breadth_percentage')->default(0);
            $table->text('breadth_description')->nullable();
            $table->unsignedTinyInteger('output_percentage')->default(0);
            $table->text('output_description')->nullable();
            $table->unsignedTinyInteger('depth_percentage')->default(0);
            $table->text('depth_description')->nullable();
            $table->unsignedTinyInteger('recognition_percentage')->default(0);
            $table->text('recognition_description')->nullable();
            $table->unsignedTinyInteger('integration_percentage')->default(0);
            $table->text('integration_description')->nullable();
            $table->string('base_color');
            $table->string('accent_color');
            $table->string('graph_path')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0)->index();
            $table->timestamps();

            $table->index('parent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('result_types');
    }
};
