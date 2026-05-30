<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ResultTypeController;
use App\Http\Controllers\SubmitController;
use Illuminate\Support\Facades\Route;

Route::get('/result-types', [ResultTypeController::class, 'index']);
Route::get('/result-types/{resultType:slug}', [ResultTypeController::class, 'show']);
Route::post('/submit', [SubmitController::class, 'store']);
Route::post('/admin/login', [AdminController::class, 'login']);
Route::get('/admin/export', [AdminController::class, 'export'])
    ->middleware('admin.password');
