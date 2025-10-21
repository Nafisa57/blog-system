<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin role if not exists
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);

        //  Create all permissions 
        $permissions = [
            'view users', 'create users', 'edit users', 'delete users',
            'view roles', 'create roles', 'edit roles', 'delete roles',
            'view posts', 'create posts', 'edit posts', 'delete posts',
            'publish posts', 'unpublish posts',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign all permissions to Admin role
        $adminRole->syncPermissions(Permission::all());

        //  Create or update admin user
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password123'), // Change to a secure password
            ]
        );

        //  Assign Admin role to the user
        $admin->assignRole($adminRole);

        $this->command->info('Admin user and permissions seeded successfully!');
    }
}
