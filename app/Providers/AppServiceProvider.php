<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
protected $policies = [
    Post::class => PostPolicy::class,
];

    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Add this inside the boot() method
        Inertia::share([
            'permissions' => function () {
                return auth()->check() ? auth()->user()->getPermissionNames()->toArray() : [];
            },
        ]);
        Vite::prefetch(concurrency: 3);
    }
}
