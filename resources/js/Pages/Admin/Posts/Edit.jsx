import AdminLayout from '@/Layouts/AdminLayout';
import { Inertia } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ post }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [publishedAt, setPublishedAt] = useState(post.published_at || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('admin.posts.update', post.id), {
            title,
            content,
            published_at: publishedAt || null,
        });
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        rows={10}
                        required
                        minLength={100}
                    />
                </div>
                <div>
                    <label className="block font-medium">Published At</label>
                    <input
                        type="datetime-local"
                        value={publishedAt ? new Date(publishedAt).toISOString().slice(0,16) : ''}
                        onChange={(e) => setPublishedAt(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Update Post
                </button>
            </form>
        </AdminLayout> 
    );
}
