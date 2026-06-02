<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use ZipArchive;

class AdminExportTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login_and_download_answer_export(): void
    {
        config([
            'app.admin_username' => 'admin',
            'app.admin_password' => 'secret',
            'app.admin_token' => 'test-token',
        ]);

        DB::table('responses')->insert([
            'id' => '11111111-1111-4111-8111-111111111111',
            'session_id' => '22222222-2222-4222-8222-222222222222',
            'participant_name' => 'Ayesha Khan',
            'participant_age' => 29,
            'total_score' => 18,
            'outcome_base_type' => 'Linear Specialist',
            'outcome_branch' => 'Contented Specialist',
            'outcome_score_range' => '18-29',
            'completed_at' => now(),
        ]);

        DB::table('answers')->insert([
            'response_id' => '11111111-1111-4111-8111-111111111111',
            'question_id' => 'q_01',
            'category' => 'engagement_pattern',
            'answer_key' => 'A',
            'answer_text' => 'Answer text',
            'score_value' => 1,
            'question_index' => 0,
        ]);

        $login = $this->postJson('/api/admin/login', [
            'username' => 'admin',
            'password' => 'secret',
        ]);

        $login->assertOk()
            ->assertJsonPath('token', 'test-token');

        $stats = $this
            ->withToken('test-token')
            ->getJson('/api/admin/stats');

        $stats->assertOk()
            ->assertJsonPath('stats.total_attempts', 1)
            ->assertJsonPath('stats.total_answers', 1)
            ->assertJsonPath('stats.top_branches.0.name', 'Contented Specialist')
            ->assertJsonPath('stats.top_branches.0.total', 1);

        $export = $this
            ->withToken('test-token')
            ->get('/api/admin/export');

        $export->assertOk();
        $this->assertSame(
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            $export->headers->get('content-type'),
        );

        $content = $export->streamedContent();

        $this->assertStringStartsWith('PK', $content);
        $this->assertExportContainsRows($content, [
            ['name', 'age', 'score', 'result'],
            ['Ayesha Khan', '29', '18', 'Contented Specialist'],
        ]);
    }

    public function test_admin_login_rejects_invalid_credentials(): void
    {
        config([
            'app.admin_username' => 'admin',
            'app.admin_password' => 'secret',
            'app.admin_token' => 'test-token',
        ]);

        $response = $this->postJson('/api/admin/login', [
            'username' => 'admin',
            'password' => 'wrong',
        ]);

        $response->assertUnauthorized();
    }

    /**
     * @param  array<int, array<int, string>>  $rows
     */
    private function assertExportContainsRows(string $content, array $rows): void
    {
        $path = tempnam(sys_get_temp_dir(), 'joat-export-test-');

        $this->assertIsString($path);

        file_put_contents($path, $content);

        $zip = new ZipArchive;

        $this->assertTrue($zip->open($path));

        $worksheet = $zip->getFromName('xl/worksheets/sheet1.xml');

        $zip->close();
        unlink($path);

        $this->assertIsString($worksheet);

        foreach ($rows as $row) {
            foreach ($row as $cellValue) {
                $this->assertStringContainsString('<t>'.$cellValue.'</t>', $worksheet);
            }
        }
    }
}
