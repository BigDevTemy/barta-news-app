<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserPreference;
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

Route::get('/', function (Request $request) {
    return 'Welcome to  barta-news-app local';
});



Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('refresh', [AuthController::class, 'refresh']);
Route::get('logout', [AuthController::class, 'logout']);
Route::get('me', [AuthController::class, 'me'])->middleware('jwt.auth');
Route::post('save_category', [UserPreference::class, 'save_preference'])->middleware('jwt.auth');
Route::post('save_source', [UserPreference::class, 'save_source'])->middleware('jwt.auth');
Route::post('save_author', [UserPreference::class, 'save_author'])->middleware('jwt.auth');
Route::get('get_news_source_author', [UserPreference::class, 'getNewSources'])->middleware('jwt.auth');
Route::get('get_top_headline', [UserPreference::class, 'getNewsHeadline'])->middleware('optional.auth');
Route::post('query', [UserPreference::class, 'search_query']);
