<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GiftController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('signup', [UserController::class, 'store']);
Route::post('login', [UserController::class, 'login']);

// gifts
// Route::get('create_gift', [GiftController::class, 'store']);


Route::group(['middleware' => ['auth:sanctum']], function() {

    Route::get('profile', [UserController::class, 'show']);
    Route::get('logout', [UserController::class, 'logout']);

    Route::resource('gift', GiftController::class);
    Route::post('gifts/{id}', [GiftController::class, 'update']);
    Route::post('bulk_gifts', [GiftController::class, 'bulkInsert']);

    // coupons
    Route::post('bulk_coupons', [CouponController::class, 'bulkInsert']);
    Route::resource('coupon', CouponController::class);

});