


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ users, permissions }) {
    const canEdit = permissions.includes('edit users');
    const canDelete = permissions.includes('delete users');
    const canCreate = permissions.includes('create users');

    const handleDelete = (user) => {
        if (!canDelete) return alert('You do not have permission!');
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            Inertia.delete(route('admin.users.destroy', user.id));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-bold text-center text-gray-800">User Management</h2>}>
            <div className="p-8 bg-white rounded-2xl shadow-lg">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-700">All Registered Users</h3>
                    {canCreate && (
                        <Link
                            href={route('admin.users.create')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                        >
                            + Create User
                        </Link>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-center text-gray-800">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                            <tr>
                                <th className="border px-4 py-3">ID</th>
                                <th className="border px-4 py-3">Name</th>
                                <th className="border px-4 py-3">Roles</th>
                                <th className="border px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((u, index) => (
                                    <tr
                                        key={u.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                                    >
                                        <td className="border px-4 py-3">{u.id}</td>
                                        <td className="border px-4 py-3 font-medium">{u.name}</td>
                                        <td className="border px-4 py-3 text-sm">
                                            {u.roles && u.roles.length > 0 ? (
                                                u.roles.map((r) => (
                                                    <span
                                                        key={r.id}
                                                        className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full mr-1"
                                                    >
                                                        {r.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic">No Role</span>
                                            )}
                                        </td>
                                        <td className="border px-4 py-3 space-x-3">
                                            <Link
                                                href={route('admin.users.show', u.id)}
                                                className="text-green-600 hover:text-green-800 font-medium"
                                            >
                                                Show
                                            </Link>
                                            {canEdit && (
                                                <Link
                                                    href={route('admin.users.edit', u.id)}
                                                    className="text-yellow-600 hover:text-yellow-800 font-medium"
                                                >
                                                    Edit
                                                </Link>
                                            )}
                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDelete(u)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500 italic bg-gray-50">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


