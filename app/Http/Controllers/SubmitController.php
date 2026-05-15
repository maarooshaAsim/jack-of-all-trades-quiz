<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubmitController extends Controller
{
    public function store(Request $request): array
    {
        return ['status' => 'ok'];
    }
}
