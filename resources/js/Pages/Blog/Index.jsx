import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function BlogIndex({ posts, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const { auth } = usePage().props;

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('blog.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Blog</h2>}
        >
            <Head title="Blog" />

            <div
                className="py-12 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/blog_bg.jpeg')",
                }}
            >
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSearch} className="mb-6 flex justify-center">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title..."
                            className="w-2/3 px-4 py-2 border rounded-l-lg focus:ring focus:ring-blue-300 outline-none"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </form>

                    <div className="space-y-6">
                        {posts.data.length === 0 && (
                            <p className="text-gray-500 text-center">No posts found.</p>
                        )}

                        {posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl 
                                    shadow-[0_4px_20px_2px_rgba(100,149,237,0.5)] 
                                    hover:shadow-[0_6px_24px_4px_rgba(173,216,230,0.8)] 
                                    transition transform hover:-translate-y-1"
                            >
                                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                <p className="text-gray-700 mb-3">
                                    {post.content ? post.content.slice(0, 100) : ''}...
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Author: {post.author ? post.author.name : 'Unknown'}
                                </p>

                                {post.published_at && (
                                    <p className="text-sm text-green-600 font-medium mb-3">
                                        Published on: {new Date(post.published_at).toLocaleString()}
                                    </p>
                                )}

                                <Link
                                    href={route('blog.show', post.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Read more →
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {posts.links && (
                        <div className="mt-6 flex justify-center">
                            {posts.links.map((link, idx) => (
                                <span
                                    key={idx}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } mx-1 cursor-pointer`}
                                    onClick={() => {
                                        if (link.url) window.location.href = link.url;
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
