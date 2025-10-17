<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Admin\PostController as AdminPostController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


// Route::get('/blog', [BlogController::class, 'index'])
//     ->middleware(['auth', 'verified'])
//     ->name('blog.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', \App\Http\Middleware\AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('posts', [AdminPostController::class, 'index'])->name('posts.index');
        Route::get('posts/{post}/edit', [AdminPostController::class, 'edit'])->name('posts.edit');
        Route::put('posts/{post}', [AdminPostController::class, 'update'])->name('posts.update');
        Route::delete('posts/{post}', [AdminPostController::class, 'destroy'])->name('posts.destroy');
        Route::post('posts/{post}/publish', [AdminPostController::class, 'publish'])->name('posts.publish');
        Route::post('posts/{post}/unpublish', [AdminPostController::class, 'unpublish'])->name('posts.unpublish');
    });

Route::middleware('auth')->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');

    // Publish/Unpublish toggle
Route::post('/posts/{post}/publish', [PostController::class, 'togglePublish'])->name('posts.publish');


    });
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');

require __DIR__.'/auth.php';
