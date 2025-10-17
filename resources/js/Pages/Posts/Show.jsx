// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Link } from '@inertiajs/react';

// export default function PostsShow({ post }) {
//     return (
//         <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Post Details</h2>}>
//             <div className="py-12">
//                 <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 bg-white p-6 rounded shadow">
//                     <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
//                     <p className="text-gray-700 mb-2">{post.content}</p>
//                     <p className="text-sm text-gray-500 mb-4">Author: {post.author.name}</p>
//                     <Link
//                         href={route('posts.index')}
//                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                     >
//                         Back to Posts
//                     </Link>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function PostShow({ post }) {
    return (
        <AuthenticatedLayout header={<h2>{post.title}</h2>}>
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 bg-white p-6 rounded shadow">
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <p className="text-sm text-gray-500 mb-4">
                        Author: {post.author.name}
                    </p>
                    {post.published_at && (
                        <p className="text-green-600 font-semibold">Published on: {new Date(post.published_at).toLocaleString()}</p>
                    )}
                    <Link
                        href={route('posts.index')}
                        className="text-blue-600 hover:underline mt-4 inline-block"
                    >
                        Back to My Posts
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
