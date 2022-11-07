<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StructureController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/structures', function (Request $request) {
    $structures = Stucture::paginate(2);
    return $structures;
});