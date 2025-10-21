import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Show({ user }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-2xl font-semibold text-gray-800">User Details</h2>}>
            <div className="p-6 bg-white rounded-2xl shadow-lg max-w-xl mx-auto mt-8 space-y-4">
                <div className="space-y-2 text-gray-700">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
<p><strong>Roles:</strong> {user.roles.join(', ') || 'No roles assigned'}</p>
                </div>

                <div className="pt-6">
                    <Link
                        href={route('admin.users.index')}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        ← Back
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
