<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

    // Show all posts to admin
    // public function index()
    // {
    //     $posts = Post::with('author')->latest()->paginate(10); // fetch all posts
    //     return Inertia::render('Admin/Posts/Index', [
    //         'posts' => $posts
    //     ]);
    // }

     public function index(Request $request)
{
    $query = Post::with('author')
        ->when($request->has('published'), fn($q) => 
            $q->whereNotNull('published_at'))
        ->latest()
        ->toSql(); // Add this line to see the SQL

    dd($query); // This will dump the SQL query

    $posts = Post::with('author')
        ->when($request->has('published'), fn($q) => 
            $q->whereNotNull('published_at'))
        ->latest()
        ->paginate(10);

    return Inertia::render('Admin/Posts/Index', [
        'posts' => $posts,
        'filters' => ['published' => $request->input('published')]
    ]);
}

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|min:100',
            'published_at' => 'nullable|date',
        ]);

        $post->update($request->only('title', 'content', 'published_at'));

        return redirect()->route('admin.posts.index')
                         ->with('success', 'Post updated!');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')
                         ->with('success', 'Post deleted!');
    }

    public function publish(Post $post)
    {
        $post->update(['published_at' => now()]);

        return redirect()->route('admin.posts.index')
                         ->with('success', 'Post published!');
    }

    public function unpublish(Post $post)
    {
        $post->update(['published_at' => null]);

        return redirect()->route('admin.posts.index')
                         ->with('success', 'Post unpublished!');
    }
}
