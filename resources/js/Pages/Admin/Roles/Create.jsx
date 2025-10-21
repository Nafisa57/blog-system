import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ permissions }) {
    const [form, setForm] = useState({
        name: '',
        permissions: []
    });

    const handleChange = (e) => {
        const { value, checked } = e.target;
        let newPermissions = [...form.permissions];
        if (checked) newPermissions.push(value);
        else newPermissions = newPermissions.filter(p => p !== value);
        setForm({ ...form, permissions: newPermissions });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('admin.roles.store'), form);
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-bold text-gray-800">Create Role</h2>}>
            
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
                
                {/* Back Button */}
                <div className="flex justify-start">
                    <Link 
                        href={route('admin.roles.index')} 
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        &larr; Back
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter role name" 
                            value={form.name} 
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    {/* Permissions */}
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Assign Permissions:</p>
                        <div className="flex flex-wrap gap-2">
                            {permissions.map(p => (
                                <label 
                                    key={p.id} 
                                    className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition"
                                >
                                    <input 
                                        type="checkbox" 
                                        value={p.name} 
                                        onChange={handleChange} 
                                        className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                                    />
                                    <span className="text-sm">{p.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition"
                    >
                        Create Role
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
