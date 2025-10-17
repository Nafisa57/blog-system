
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function BlogShow({ post }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{post.title}</h2>}
        >
            <Head title={post.title} />

            <div
                className="py-12 bg-fixed bg-contain bg-no-repeat bg-center"
                style={{
                    backgroundImage: "url('/images/show1.jpeg')",
                    backgroundSize: '90% 100%',
                }}
            >
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
<div
    className="bg-transparent p-6 rounded-lg shadow"
    style={{ transform: 'translateX(-11rem)' }}
>
                        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                        <p className="text-sm text-gray-500 mb-2">
                            Author: {post.author?.name}
                        </p>

                        {post.published_at && (
                            <p className="text-sm text-green-600 font-semibold mb-4">
                                Published on:{' '}
                                {new Date(post.published_at).toLocaleString()}
                            </p>
                        )}

                        <p className="text-gray-800 whitespace-pre-line mb-6">
                            {post.content}
                        </p>

                        <Link
                            href={route('blog.index')}
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
