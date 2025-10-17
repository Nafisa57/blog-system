<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        //  $posts = Post::with('author')
        //     ->whereNotNull('published_at')
        //     ->latest()
        //     ->paginate(10);

        // return Inertia::render('Blog/Index', [
        //     'posts' => $posts,
        // ]);

    $search = $request->input('search'); // get search term

    $posts = Post::with('author')
        ->when($search, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%");
        })
        ->whereNotNull('published_at')
        ->latest()
        ->paginate(10)
        ->withQueryString(); // keeps search term in pagination links

    return Inertia::render('Blog/Index', [
        'posts' => $posts,
        'filters' => [
            'search' => $search,
        ],
    ]);



    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // if (!$post->published_at) abort(404);
        // return Inertia::render('Blog/Show', ['post' => $post]);
$post = Post::with('author')->findOrFail($id);

    if (!$post->published_at) {
        abort(404, 'This post is not published.');
    }

    return Inertia::render('Blog/Show', [
        'post' => $post,
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
