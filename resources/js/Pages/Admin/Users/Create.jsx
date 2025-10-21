

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ roles }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
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
        Inertia.post(route('admin.users.store'), form);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-semibold text-gray-800">Create New User</h2>}>
            <div className="p-6 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter user name"
                            value={form.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter user email"
                            value={form.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Roles */}
                    <div>
                        <p className="font-medium text-gray-700 mb-2">Assign Roles:</p>
                        <div className="flex flex-wrap gap-4">
                            {roles.map(role => (
                                <label key={role.id} className="flex items-center space-x-2 text-gray-700">
                                    <input
                                        type="checkbox"
                                        name="roles"
                                        value={role.name}
                                        onChange={handleChange}
                                        className="accent-blue-500"
                                    />
                                    <span>{role.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6">
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
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
