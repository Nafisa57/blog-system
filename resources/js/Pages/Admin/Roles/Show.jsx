import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Show({ role }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Role Details</h2>}>
            <div className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-6">
                
                {/* Back Button */}
                <div className="flex justify-start">
                    <Link
                        href={route('admin.roles.index')}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        &larr; Back
                    </Link>
                </div>

                {/* Role Info */}
                <div>
                    <p><strong>ID:</strong> {role.id}</p>
                    <p><strong>Role Name:</strong> {role.name}</p>
                </div>

                {/* Permissions */}
                <div>
                    <p><strong>Permissions:</strong></p>
                    {role.permissions.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                            {role.permissions.map((p, index) => (
                                <span
                                    key={index}
                                    className="bg-green-100 text-black text-xs px-2 py-1 rounded-full"
                                >
                                    {p.name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No permissions assigned</p>
                    )}
                </div>

                {/* Users with this role */}
                <div>
                    <p><strong>Users with this role:</strong></p>
                    {role.users && role.users.length > 0 ? (
                        <ul className="list-disc list-inside mt-1">
                            {role.users.map(user => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm">No users assigned to this role</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
