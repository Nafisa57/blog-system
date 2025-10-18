<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;


class PostPolicy
{
    public function before(User $user, $ability)
    {
        if ($user->role === 'admin') {
            return true;
        }
    }

    public function viewAny(User $user)
    {
        return true; // Everyone can view published posts
    }

    public function view(User $user, Post $post)
    {
        return true; // Everyone can view individual posts
    }

    public function update(User $user, Post $post)
    {
        return $user->id === $post->author_id;
    }

    public function delete(User $user, Post $post)
    {
        return $user->id === $post->author_id;
    }

    public function publish(User $user, Post $post)
    {
        return $user->id === $post->author_id;
    }
}