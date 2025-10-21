import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Edit({ role, permissions }) {
    const [form, setForm] = useState({
        name: role.name,
        permissions: role.permissions
    });

    const handleChange = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value);
        let newPermissions = [...form.permissions];
        if (checked) newPermissions.push(id);
        else newPermissions = newPermissions.filter(p => p !== id);
        setForm({ ...form, permissions: newPermissions });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('admin.roles.update', role.id), form);
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Edit Role</h2>}>
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={form.name} 
                            onChange={(e) => setForm({ ...form, name: e.target.value })} 
                            className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
                            placeholder="Enter role name"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Assign Permissions:</p>
                        <div className="flex flex-wrap gap-2">
                            {permissions.map(p => (
                                <label key={p.id} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition">
                                    <input 
                                        type="checkbox" 
                                        value={p.id} 
                                        checked={form.permissions.includes(p.id)} 
                                        onChange={handleChange} 
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                    />
                                    <span className="text-gray-800 text-sm">{p.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Update Role
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
