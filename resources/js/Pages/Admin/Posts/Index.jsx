

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

export default function AdminPostsIndex({ posts }) {
    const [filters, setFilters] = useState({
        published: null
    });

    const handleDelete = (post) => {
        if (confirm('Are you sure you want to delete this post?')) {
            Inertia.delete(route('admin.posts.destroy', post.id));
        }
    };

    const handlePublishToggle = (post) => {
        const routeName = post.published_at
            ? 'admin.posts.unpublish'
            : 'admin.posts.publish';

        Inertia.post(route(routeName, post.id), {}, {
            onSuccess: () => {
                Inertia.get(route('admin.posts.index'), { published: filters.published }, {
                    preserveState: true,
                    replace: true,
                });
            },
        });
    };

    const handleFilterChange = (value) => {
        setFilters(prev => ({ ...prev, published: value }));

        Inertia.get(route('admin.posts.index'), { published: value }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Admin Posts</h2>}>
            <div
                className="py-12 bg-fixed bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/admin3.jpeg')", backgroundSize: '100% 100%' }}
            >
                <div className="mx-auto max-w-6xl space-y-6">

                    {/* Filter Controls */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => handleFilterChange(null)}
                            className={`px-3 py-1 rounded ${filters.published === null ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            All Posts
                        </button>
                        <button onClick={() => Inertia.visit(route('admin.users.index'))}
                            className={`px-3 py-1 rounded ${filters.published === true ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Users
                        </button>
                        <button onClick={() => Inertia.visit(route('admin.roles.index'))}
                            className={`px-3 py-1 rounded ${filters.published === false ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Roles
                        </button>
                    </div>

                    {/* Posts List */}
                    {posts.data.length === 0 && <p>No posts found.</p>}

                    {posts.data.map(post => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-black transition">
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p className="text-gray-700 mb-2">{post.content.slice(0, 100)}...</p>
                            <p className="text-sm text-gray-500 mb-2">
                                Author: {post.author.name} | 
                                {post.published_at ? ` Published: ${new Date(post.published_at).toLocaleString()}` : ' Not Published'}
                            </p>
                            <div className="flex space-x-2">
                                <Link
                                    href={route('admin.posts.edit', post.id)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handlePublishToggle(post)}
                                    className={`px-3 py-1 rounded ${post.published_at ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                >
                                    {post.published_at ? 'Unpublish' : 'Publish'}
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {posts.links && (
                        <div className="mt-6 flex justify-center">
                            {posts.links.map((link, index) => (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} mx-1 cursor-pointer`}
                                    onClick={() => link.url && (window.location.href = link.url)}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
