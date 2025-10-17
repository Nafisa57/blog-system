import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

export default function PostsCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { errors, flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('posts.store'), { title, content }, {
            onSuccess: () => {
                setTitle('');
                setContent('');
            }
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Create New Post</h2>}>
           <div
  className="py-12 bg-fixed bg-cover bg-[center_bottom_2rem] bg-no-repeat"
  style={{
    backgroundImage: "url('/images/create_bg1.jpeg')",
    backgroundSize: '60% ',
  }}
>

                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 mt-6">

                    {flash?.success && (  
                        <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
                            {flash.success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded h-40"
                                required
                            ></textarea>
                            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Create Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
