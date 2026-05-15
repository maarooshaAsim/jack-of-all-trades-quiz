<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function login(Request $request): array
    {
        return ['status' => 'ok'];
    }

    public function export(Request $request): array
    {
        return ['status' => 'ok'];
    }
}
