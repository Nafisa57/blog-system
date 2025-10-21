<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function index(Request $request)
    {
        $query = Post::query();

        if ($request->has('published')) {
            if ($request->published === 'published') $query->whereNotNull('published_at');
            if ($request->published === 'unpublished') $query->whereNull('published_at');
        }

        $posts = $query->with('author')->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'permissions' => Auth::user()->getAllPermissions()->pluck('name')->toArray(),
        ]);
    }

    public function edit(Post $post)
    {
        if (!Auth::user()->can('edit posts')) abort(403);
        return Inertia::render('Admin/Posts/Edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post)
    {
        if (!Auth::user()->can('edit posts')) abort(403);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|min:100',
            'published_at' => 'nullable|date',
        ]);

        $post->update($request->only('title', 'content', 'published_at'));
        return redirect()->route('admin.posts.index')->with('success', 'Post updated!');
    }

    public function destroy(Post $post)
    {
        if (!Auth::user()->can('delete posts')) abort(403);

        $post->delete();
        return redirect()->route('admin.posts.index')->with('success', 'Post deleted!');
    }

    public function publish(Post $post)
    {
        if (!Auth::user()->can('publish posts')) abort(403);
        $post->update(['published_at' => now()]);
        return redirect()->route('admin.posts.index')->with('success', 'Post published!');
    }

    public function unpublish(Post $post)
    {
        if (!Auth::user()->can('unpublish posts')) abort(403);
        $post->update(['published_at' => null]);
        return redirect()->route('admin.posts.index')->with('success', 'Post unpublished!');
    }
}
