<?php



namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //  List all permissions
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
            'publish posts',
            'unpublish posts',
        ];

        //  Create each permission
        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        //  Create Admin role (if not exists)
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);

        // Assign all permissions to Admin role
        $adminRole->syncPermissions(Permission::all());

        $this->command->info('Permissions and Admin role seeded successfully!');
    }
}
