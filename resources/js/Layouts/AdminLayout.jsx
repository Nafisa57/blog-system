// resources/js/Layouts/AdminLayout.jsx
import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <nav className="mt-2 space-x-4">
                    <Link href="/admin/posts" className="hover:underline">Posts</Link>
                    <Link href="/" className="hover:underline">Dashboard</Link>
                </nav>
            </header>
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}
