
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

    // Function to get first 100 words
    const getFirstWords = (text, wordCount = 100) => {
        if (!text) return '';
        const words = text.split(/\s+/).slice(0, wordCount).join(' ');
        return words + (words.length < text.length ? '...' : '');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Blog</h2>}
        >
            <Head title="Blog" />

            <div
                className="py-12 bg-fixed bg-cover bg-center"
                style={{ backgroundImage: "url('/images/blog_bg.jpeg')" }}
            >
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-8 flex justify-center">
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

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.data.length === 0 && (
                            <p className="text-gray-500 text-center col-span-full">No posts found.</p>
                        )}

                        {posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl
                                    shadow-[0_4px_20px_2px_rgba(173,216,230,0.5)]
                                    hover:shadow-[0_6px_24px_4px_rgba(173,216,230,0.8)]
                                    transition transform hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                                    <p className="text-gray-700 mb-3">
                                        {getFirstWords(post.content, 100)}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Author: {post.author ? post.author.name : 'Unknown'}
                                    </p>
                                    {post.published_at && (
                                        <p className="text-sm text-green-600 font-medium mb-3">
                                            Published on: {new Date(post.published_at).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                                <Link
                                    href={route('blog.show', post.id)}
                                    className="mt-auto text-blue-600 hover:underline font-medium"
                                >
                                    Read more →
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {posts.links && (
                        <div className="mt-8 flex justify-center">
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

