import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ post }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('posts.update', post.id));
    };

    return (
        <AuthenticatedLayout header={<h2>Edit Post</h2>}>
 <div
  className="py-12 bg-fixed bg-cover bg-[center_8rem] bg-no-repeat"
  style={{
    backgroundImage: "url('/images/edit_bg.jpeg')",
    backgroundSize: '75% 80%',
  }}
>      
          <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 bg-white p-6 rounded shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Content</label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows="6"
                                className="w-full border rounded p-2"
                            />
                            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Update
                            </button>

                            <Link
                                href={route('posts.index')}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
