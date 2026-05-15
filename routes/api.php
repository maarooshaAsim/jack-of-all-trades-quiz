<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SubmitController;
use Illuminate\Support\Facades\Route;

Route::post('/submit', [SubmitController::class, 'store']);
Route::post('/admin/login', [AdminController::class, 'login']);
Route::get('/admin/export', [AdminController::class, 'export'])
    ->middleware('admin.password');
