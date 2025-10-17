<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

// class PostPolicy
// {
//     use HandlesAuthorization;

//     // Admin can do everything
//     public function before(User $user, $ability)
//     {
//         if ($user->is_admin) return true;
//     }

//   public function viewAny(User $user)
// {
//     // Only admins can see all posts in admin panel
//     // return $user->is_admin;
//      return true;
// }

//    public function view(User $user, Post $post)
// {
//     // Admin can see everything, normal user only own posts
//     // return $user->is_admin || $user->id === $post->author_id;
//  return true;
// }

//     public function create(User $user)
//     {
//         return true; // any authenticated user
//     }

//     public function update(User $user, Post $post)
//     {
//         // return $user->id === $post->author_id;
//         return $user->is_admin || $user->id === $post->author_id;
//     }

//     public function delete(User $user, Post $post)
//     {
//         // return $user->id === $post->author_id;
//         return $user->is_admin || $user->id === $post->author_id;

//     }

//     public function publish(User $user, Post $post)
//     {
//         // return $user->id === $post->author_id;
//                 return $user->is_admin || $user->id === $post->author_id;

//     }
// }


class PostPolicy
{
    public function before(User $user, $ability)
    {
        if ($user->is_admin) return true;
    }

    public function viewAny(User $user)
    {
        return true; // Everyone can view posts
    }

    public function view(User $user, Post $post)
    {
        return true; // Everyone can view individual posts
    }

    public function update(User $user, Post $post)
    {
        return $user->is_admin || $user->id === $post->author_id;
    }

    public function delete(User $user, Post $post)
    {
        return $user->is_admin || $user->id === $post->author_id;
    }

    public function publish(User $user, Post $post)
    {
        return $user->is_admin || $user->id === $post->author_id;
    }
}