<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminPasswordMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->bearerToken() !== config('app.admin_token')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
