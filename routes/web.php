<?php



use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Admin\PostController as AdminPostController;

// Home / Welcome
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authenticated user profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin panel routes
Route::middleware(['auth', 'admin'])
    ->prefix('admin/posts')
    ->name('admin.posts.')
    ->group(function () {
        Route::get('/', [AdminPostController::class, 'index'])->name('index');
        Route::get('{post}/edit', [AdminPostController::class, 'edit'])->name('edit');
        Route::put('{post}', [AdminPostController::class, 'update'])->name('update');
        Route::delete('{post}', [AdminPostController::class, 'destroy'])->name('destroy');
        Route::post('{post}/publish', [AdminPostController::class, 'publish'])->name('publish');
        Route::post('{post}/unpublish', [AdminPostController::class, 'unpublish'])->name('unpublish');
    });

// Author (regular user) posts
Route::middleware('auth')->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index'); // Only author's posts
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
    Route::post('/posts/{post}/publish', [PostController::class, 'togglePublish'])->name('posts.publish');
});

// Public blog routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');

// In routes/web.php
Route::get('/ziggy', function () {
    return response()->json(app('ziggy')->toArray());
});


// Auth routes
require __DIR__.'/auth.php';
