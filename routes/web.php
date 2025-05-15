<?php

use App\Http\Controllers\Product\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group([], function() {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');
    Route::get('product/{id}', [ProductController::class, 'show']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
