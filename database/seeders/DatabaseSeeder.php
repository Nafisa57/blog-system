<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Run the AdminUserSeeder
        $this->call([
            AdminUserSeeder::class,
        ]);
    }
}
