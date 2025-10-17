<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $posts = auth()->user()
            ->posts()
            ->with('author')
            ->latest()
            ->paginate(10);

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'flash' => session('success'),
        ]);

}

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string|min:100',
        ]);

        Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'author_id' => auth()->id(),
        ]);

        return redirect()->route('posts.index')->with('success', 'Post created successfully!');
    }

    public function show(Post $post)
    {
        $this->authorize('view', $post);

        return Inertia::render('Posts/Show', [
            'post' => $post->load('author'),
        ]);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);

        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:100',
        ]);

        $post->update($request->only('title', 'content'));

        return redirect()->route('posts.index')->with('success', 'Post updated successfully!');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully!');
    }

    public function togglePublish(Post $post)
    {
        if ($post->author_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        if ($post->published_at) {
            $post->update(['published_at' => null]);
            return redirect()->route('posts.index')->with('success', 'Post unpublished successfully.');
        } else {
            $post->update(['published_at' => now()]);
            return redirect()->route('blog.show', $post->id)->with('success', 'Post published successfully!');
        }
    }
}
