<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the authenticated user is admin
        if (! $request->user()?->is_admin) {
            abort(403, 'Unauthorized'); // block access if not admin
        }

        return $next($request);
    }
}
