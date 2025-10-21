import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ user, roles }) {
    const [form, setForm] = useState({
        name: user.name || '',
        email: user.email || '',
        roles: user.roles || []
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'roles') {
            let newRoles = [...form.roles];
            if (checked) newRoles.push(value);
            else newRoles = newRoles.filter(r => r !== value);
            setForm({ ...form, roles: newRoles });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('admin.users.update', user.id), form);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-semibold text-gray-800">Edit User</h2>}>
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 mt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="border-gray-300 border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter user name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="border-gray-300 border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter user email"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Assign Roles:</p>
                        <div className="flex flex-wrap gap-3">
                            {roles.map(role => (
                                <label key={role.id} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                                    <input
                                        type="checkbox"
                                        name="roles"
                                        value={role.name}
                                        checked={form.roles.includes(role.name)}
                                        onChange={handleChange}
                                        className="accent-blue-500"
                                    />
                                    <span className="text-gray-800">{role.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Link
                            href={route('admin.users.index')}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            ← Back
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
