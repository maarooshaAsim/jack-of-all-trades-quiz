<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ClearQuizResultsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        try {
            DB::table('answers')->truncate();
            DB::table('responses')->truncate();
            DB::table('outcomes')->truncate();
        } finally {
            Schema::enableForeignKeyConstraints();
        }
    }
}
