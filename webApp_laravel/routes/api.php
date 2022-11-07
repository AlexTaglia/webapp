<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StructureController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\SponsorController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('structures',StructureController::class);
Route::resource('exams',ExamController::class);
Route::resource('sponsors',SponsorController::class);
Route::get('structures/getStructures', [StructureController::class,  'getStructures']);

