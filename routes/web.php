<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;   

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

  Route::middleware(['role:Admin'])->prefix('admin')->name('admin.')->group(function () {

        // --- Posts ---
        Route::get('/posts', [AdminPostController::class, 'index'])->name('posts.index');
        Route::get('/posts/{post}/edit', [AdminPostController::class, 'edit'])->name('posts.edit');
        Route::put('/posts/{post}', [AdminPostController::class, 'update'])->name('posts.update');
        Route::delete('/posts/{post}', [AdminPostController::class, 'destroy'])->name('posts.destroy');
        Route::post('/posts/{post}/publish', [AdminPostController::class, 'publish'])->name('posts.publish');
        Route::post('/posts/{post}/unpublish', [AdminPostController::class, 'unpublish'])->name('posts.unpublish');

        // --- Users ---
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [AdminUserController::class, 'create'])->name('users.create');
        Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');
        Route::get('/users/{user}', [AdminUserController::class, 'show'])->name('users.show');

        // --- Roles ---
        Route::get('/roles', [AdminRoleController::class, 'index'])->name('roles.index');
        Route::get('/roles/create', [AdminRoleController::class, 'create'])->name('roles.create');
        Route::post('/roles', [AdminRoleController::class, 'store'])->name('roles.store');
        Route::get('/roles/{role}/edit', [AdminRoleController::class, 'edit'])->name('roles.edit');
        Route::put('/roles/{role}', [AdminRoleController::class, 'update'])->name('roles.update');
        Route::delete('/roles/{role}', [AdminRoleController::class, 'destroy'])->name('roles.destroy');
        Route::get('/roles/{role}', [AdminRoleController::class, 'show'])->name('roles.show');

    });

// ✍️ Author (regular user) posts
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

// 🌍 Public blog routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');

// Ziggy route helper (for Inertia)
Route::get('/ziggy', function () {
    return response()->json(app('ziggy')->toArray());
});

// Auth routes
require __DIR__ . '/auth.php';







