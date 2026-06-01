<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use RuntimeException;
use ZipArchive;

class AnswerExport
{
    /**
     * @return array{path: string, filename: string}
     */
    public function createXlsx(): array
    {
        $path = tempnam(sys_get_temp_dir(), 'joat-answers-');

        if ($path === false) {
            throw new RuntimeException('Could not create a temporary export file.');
        }

        $xlsxPath = "{$path}.xlsx";
        rename($path, $xlsxPath);

        $zip = new ZipArchive;

        if ($zip->open($xlsxPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new RuntimeException('Could not open the XLSX archive for writing.');
        }

        $zip->addFromString('[Content_Types].xml', $this->contentTypesXml());
        $zip->addFromString('_rels/.rels', $this->rootRelationshipsXml());
        $zip->addFromString('xl/workbook.xml', $this->workbookXml());
        $zip->addFromString('xl/_rels/workbook.xml.rels', $this->workbookRelationshipsXml());
        $zip->addFromString('xl/worksheets/sheet1.xml', $this->worksheetXml());
        $zip->close();

        return [
            'path' => $xlsxPath,
            'filename' => 'joat-answers-'.now()->format('Y-m-d-His').'.xlsx',
        ];
    }

    private function worksheetXml(): string
    {
        $rows = [$this->rowXml(1, $this->headings())];
        $rowNumber = 2;

        foreach ($this->answerRows() as $answerRow) {
            $rows[] = $this->rowXml($rowNumber++, [
                $answerRow->response_id,
                $answerRow->session_id,
                $answerRow->completed_at,
                $answerRow->ip_address,
                $answerRow->total_score,
                $answerRow->outcome_base_type,
                $answerRow->outcome_branch,
                $answerRow->outcome_score_range,
                $answerRow->question_index,
                $answerRow->question_id,
                $answerRow->category,
                $answerRow->answer_key,
                $answerRow->answer_text,
                $answerRow->score_value,
            ]);
        }

        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            .'<sheetData>'.implode('', $rows).'</sheetData>'
            .'</worksheet>';
    }

    /**
     * @return array<int, string>
     */
    private function headings(): array
    {
        return [
            'Response ID',
            'Session ID',
            'Completed At',
            'IP Address',
            'Total Score',
            'Base Type',
            'Branch',
            'Score Range',
            'Question Index',
            'Question ID',
            'Category',
            'Answer Key',
            'Answer Text',
            'Score Value',
        ];
    }

    /**
     * @return Collection<int, object>
     */
    private function answerRows()
    {
        return DB::table('answers')
            ->join('responses', 'answers.response_id', '=', 'responses.id')
            ->select([
                'answers.response_id',
                'responses.session_id',
                'responses.completed_at',
                'responses.ip_address',
                'responses.total_score',
                'responses.outcome_base_type',
                'responses.outcome_branch',
                'responses.outcome_score_range',
                'answers.question_index',
                'answers.question_id',
                'answers.category',
                'answers.answer_key',
                'answers.answer_text',
                'answers.score_value',
            ])
            ->orderBy('responses.completed_at')
            ->orderBy('answers.question_index')
            ->get();
    }

    /**
     * @param  array<int, mixed>  $values
     */
    private function rowXml(int $rowNumber, array $values): string
    {
        $cells = array_map(
            fn (mixed $value, int $index): string => $this->cellXml($rowNumber, $index + 1, $value),
            $values,
            array_keys($values),
        );

        return '<row r="'.$rowNumber.'">'.implode('', $cells).'</row>';
    }

    private function cellXml(int $rowNumber, int $columnNumber, mixed $value): string
    {
        $reference = $this->columnName($columnNumber).$rowNumber;
        $escapedValue = htmlspecialchars((string) ($value ?? ''), ENT_QUOTES | ENT_XML1, 'UTF-8');

        return '<c r="'.$reference.'" t="inlineStr"><is><t>'.$escapedValue.'</t></is></c>';
    }

    private function columnName(int $columnNumber): string
    {
        $name = '';

        while ($columnNumber > 0) {
            $columnNumber--;
            $name = chr(65 + ($columnNumber % 26)).$name;
            $columnNumber = intdiv($columnNumber, 26);
        }

        return $name;
    }

    private function contentTypesXml(): string
    {
        return <<<'XML'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>
XML;
    }

    private function rootRelationshipsXml(): string
    {
        return <<<'XML'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
XML;
    }

    private function workbookXml(): string
    {
        return <<<'XML'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Answers" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>
XML;
    }

    private function workbookRelationshipsXml(): string
    {
        return <<<'XML'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>
XML;
    }
}
