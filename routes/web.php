<?php

use App\Http\Controllers\Product\OrderController;
use App\Http\Controllers\Product\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group([], function() {
    Route::get('/', fn() => Inertia::render('welcome'))->name('home');
    Route::get('catalogue', [ProductController::class, "index"])->name("catalog");
    Route::get('product/{id}', [ProductController::class, 'show'])->name('product');
    Route::get('panier', [OrderController::class, 'index'])->name('order');

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
