<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SubmitQuizRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'session_id' => ['required', 'uuid'],
            'participant_name' => ['required', 'string', 'max:120'],
            'participant_age' => ['required', 'integer', 'between:1,120'],
            'answers' => ['required', 'array', 'size:18'],
            'answers.*.question_id' => ['required', 'string'],
            'answers.*.category' => ['required', 'string'],
            'answers.*.answer_key' => ['required', 'string', 'in:A,B,C,D,E'],
            'answers.*.answer_text' => ['required', 'string'],
            'answers.*.question_index' => ['required', 'integer', 'between:0,17', 'distinct'],
            'answers.*.score_value' => ['required', 'integer', 'between:1,5'],
        ];
    }
}
