<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles->map(function($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'permissions' => $role->permissions->map(function($p) {
                        return [
                            'id' => $p->id,
                            'name' => $p->name,
                        ];
                    })->toArray(),
                ];
            })->toArray(),
        ]);
    }

    public function create()
    {
        $permissions = Permission::all()->map(function($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
            ];
        });

        return Inertia::render('Admin/Roles/Create', [
            'permissions' => $permissions
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'required|array',
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully!');
    }

    public function edit(Role $role)
    {
        $permissions = Permission::all()->map(function($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
            ];
        });

        return Inertia::render('Admin/Roles/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('id')->toArray(),
            ],
            'permissions' => $permissions
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => "required|unique:roles,name,{$role->id}",
            'permissions' => 'required|array',
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('admin.roles.index')->with('success', 'Role updated!');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('admin.roles.index')->with('success', 'Role deleted!');
    }

    // public function show(Role $role)
    // {
    //     return Inertia::render('Admin/Roles/Show', [
    //         'role' => [
    //             'id' => $role->id,
    //             'name' => $role->name,
    //             'permissions' => $role->permissions->map(function($p) {
    //                 return $p->name;
    //             })->toArray(),
    //         ]
    //     ]);
    // }

    public function show(Role $role)
{
    $role->load(['permissions', 'users']); // Load permissions and users

    return Inertia::render('Admin/Roles/Show', [
        'role' => [
            'id' => $role->id,
            'name' => $role->name,
            'permissions' => $role->permissions->map(fn($p) => ['id' => $p->id, 'name' => $p->name])->toArray(),
            'users' => $role->users->map(fn($u) => ['id' => $u->id, 'name' => $u->name])->toArray(),
        ],
    ]);
}
}
