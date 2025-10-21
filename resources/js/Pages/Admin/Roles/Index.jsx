

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Index({ roles }) {

    const handleDelete = (role) => {
        if(confirm(`Are you sure you want to delete the role "${role.name}"?`)){
            Inertia.delete(route('admin.roles.destroy', role.id));
        }
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Roles</h2>}>
            <div className="p-6 bg-white rounded shadow">
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-bold">Roles List</h3>
                    <Link
                        href={route('admin.roles.create')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create Role
                    </Link>
                </div>

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Permissions</th>
                            <th className="border px-4 py-2">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(role => (
                            <tr key={role.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{role.id}</td>
                                <td className="border px-4 py-2">{role.name}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex flex-wrap gap-1">
                                        {role.permissions.length > 0 ? (
                                            role.permissions.map(p => (
                                                <span
                                                    key={p.id}
                                                    className="bg-green-100 text-black text-xs px-2 py-1 rounded"
                                                >
                                                    {p.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-400 text-xs">No permissions</span>
                                        )}
                                    </div>
                                </td>
                                <td className="border px-4 py-2 flex gap-2">
                                    <Link
                                        href={route('admin.roles.edit', role.id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('admin.roles.show', role.id)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Show
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(role)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {roles.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No roles found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
