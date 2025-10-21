<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get(); // plain collection

        return Inertia::render('Admin/Users/Index', [
            'users' => $users->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->roles->map(function($role) {
                        return [
                            'id' => $role->id,
                            'name' => $role->name,
                        ];
                    })->toArray(),
                ];
            })->toArray(),
        ]);
    }

    public function create()
    {
        $roles = Role::all()->map(fn($role) => ['id' => $role->id, 'name' => $role->name]);
        return Inertia::render('Admin/Users/Create', ['roles' => $roles]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'roles' => 'required|array',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->syncRoles($request->roles);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully!');
    }

    public function edit(User $user)
    {
        $roles = Role::all()->map(fn($role) => ['id' => $role->id, 'name' => $role->name]);

        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')->toArray(),
            ],
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => "required|email|unique:users,email,{$user->id}",
            'roles' => 'required|array',
        ]);

        $user->update($request->only('name', 'email'));
        $user->syncRoles($request->roles);

        return redirect()->route('admin.users.index')->with('success', 'User updated!');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted!');
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(fn($role) => $role->name)->toArray(),
            ]
        ]);
    }
}
