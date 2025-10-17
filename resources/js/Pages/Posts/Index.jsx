

// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Link } from '@inertiajs/react';
// import { Inertia } from '@inertiajs/inertia';

// export default function PostsIndex({ posts }) {
//     // Handle publish/unpublish toggle
//     const togglePublish = (postId, isPublished) => {
//         Inertia.post(route('posts.publish', postId), {}, {
//             onSuccess: () => {
//                 // Redirect to blog after publishing
//                 if (!isPublished) {
//                     Inertia.visit(route('blog.show', postId));
//                 }
//             },
//         });
//     };

//     return (
//         <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Your Posts</h2>}>
//             <div className="py-12">
//                 <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">

//                     {/* Create Post Button */}
//                     <div className="mb-4">
//                         <Link
//                             href={route('posts.create')}
//                             className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                         >
//                             + Create New Post
//                         </Link>
//                     </div>

//                     {/* Posts List */}
//                     <div className="space-y-6">
//                         {posts.data.length === 0 && (
//                             <p className="text-gray-500">No posts found.</p>
//                         )}

//                         {posts.data.map((post) => (
//                             <div
//                                 key={post.id}
//                                 className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
//                             >
//                                 <h3 className="text-xl font-bold mb-2">{post.title}</h3>
//                                 <p className="text-gray-700 mb-2">
//                                     {post.content.slice(0, 100)}...
//                                 </p>
//                                 {post.author && (
//                                     <p className="text-sm text-gray-500 mb-2">
//                                         Author: {post.author.name}
//                                     </p>
//                                 )}

//                                 {/* Publish / Unpublish Button */}
//                                 <button
//                                     onClick={() => togglePublish(post.id, post.published_at)}
//                                     className={`px-3 py-1 rounded mb-2 ${
//                                         post.published_at
//                                             ? 'bg-red-600 text-white hover:bg-red-700'
//                                             : 'bg-blue-600 text-white hover:bg-blue-700'
//                                     }`}
//                                 >
//                                     {post.published_at ? 'Unpublish' : 'Publish'}
//                                 </button>

//                                 {/* Read More */}
//                                 <Link
//                                     href={route('posts.show', post.id)}
//                                     className="text-blue-600 hover:underline ml-4"
//                                 >
//                                     Read More
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Pagination */}
//                     {posts.links && (
//                         <div className="mt-6 flex justify-center">
//                             {posts.links.map((link, index) => (
//                                 <span
//                                     key={index}
//                                     dangerouslySetInnerHTML={{ __html: link.label }}
//                                     className={`px-3 py-1 rounded ${
//                                         link.active
//                                             ? 'bg-blue-600 text-white'
//                                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                                     } mx-1 cursor-pointer`}
//                                     onClick={() => {
//                                         if (link.url) window.location.href = link.url;
//                                     }}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }




//////////////////











// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Link } from '@inertiajs/react';
// import { Inertia } from '@inertiajs/inertia';

// export default function PostsIndex({ posts }) {
//     const togglePublish = (postId, isPublished) => {
//         Inertia.post(route('posts.publish', postId), {}, {
//             onSuccess: () => {
//                 if (!isPublished) {
//                     Inertia.visit(route('blog.show', postId));
//                 }
//             },
//         });
//     };

//     const deletePost = (postId) => {
//         if (confirm('Are you sure you want to delete this post?')) {
//             Inertia.delete(route('posts.destroy', postId));
//         }
//     };

//     return (
//         <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Your Posts</h2>}>
//             <div className="py-12">
//                 <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
//                     {/* Create Post Button */}
//                     <div className="mb-4">
//                         <Link
//                             href={route('posts.create')}
//                             className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                         >
//                             + Create New Post
//                         </Link>
//                     </div>

//                     {/* Posts List */}
//                     <div className="space-y-6">
//                         {posts.data.length === 0 && (
//                             <p className="text-gray-500">No posts found.</p>
//                         )}

//                         {posts.data.map((post) => (
//                             <div
//                                 key={post.id}
//                                 className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
//                             >
//                                 <h3 className="text-xl font-bold mb-2">{post.title}</h3>
//                                 <p className="text-gray-700 mb-2">
//                                     {post.content.slice(0, 100)}...
//                                 </p>
//                                 {post.author && (
//                                     <p className="text-sm text-gray-500 mb-2">
//                                         Author: {post.author.name}
//                                     </p>
//                                 )}

//                                 {/* Action Buttons */}
//                                 <div className="flex flex-wrap gap-2 mt-3">
//                                     <button
//                                         onClick={() => togglePublish(post.id, post.published_at)}
//                                         className={`px-3 py-1 rounded ${
//                                             post.published_at
//                                                 ? 'bg-red-600 text-white hover:bg-red-700'
//                                                 : 'bg-blue-600 text-white hover:bg-blue-700'
//                                         }`}
//                                     >
//                                         {post.published_at ? 'Unpublish' : 'Publish'}
//                                     </button>

//                                     <Link
//                                         href={route('posts.edit', post.id)}
//                                         className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                                     >
//                                         Edit
//                                     </Link>

//                                     <button
//                                         onClick={() => deletePost(post.id)}
//                                         className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
//                                     >
//                                         Delete
//                                     </button>

//                                     <Link
//                                         href={route('posts.show', post.id)}
//                                         className="px-3 py-1 text-blue-600 hover:underline"
//                                     >
//                                         Read More
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }






// resources/js/Pages/Posts/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function PostsIndex({ posts }) {
    const { auth } = usePage().props;

    const togglePublish = (postId, isPublished) => {
        Inertia.post(route('posts.publish', postId), {}, {
            onSuccess: () => {
                if (!isPublished) {
                    // go to blog show if newly published
                    Inertia.visit(route('blog.show', postId));
                } else {
                    // just reload index
                    Inertia.visit(route('posts.index'));
                }
            },
        });
    };

    const deletePost = (postId) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        Inertia.delete(route('posts.destroy', postId));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">Your Posts</h2>}>
           <div
    className="py-12 bg-fixed bg-cover bg-[center_left_3rem]"
    style={{
        backgroundImage: "url('/images/post_bg1.jpeg')", // put your background image in public/images/post_bg.jpeg
    }}
>      
  
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="mb-4">
                        <Link href={route('posts.create')} className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            + Create New Post
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {posts.data.length === 0 && <p className="text-gray-500">No posts found.</p>}

                        {posts.data.map((post) => (
                            <div key={post.id} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl 
shadow-[0_4px_20px_2px_rgba(100,149,237,0.5)] 
hover:shadow-[0_6px_24px_4px_rgba(173,216,230,0.8)] 
transition transform hover:-translate-y-1
">
                                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                <p className="text-gray-700 mb-2">{post.content.slice(0, 100)}...</p>
                                {post.author && <p className="text-sm text-gray-500 mb-2">Author: {post.author.name}</p>}
                                {post.published_at && (
                                    <p className="text-sm text-green-600 font-medium mb-2">Published: {new Date(post.published_at).toLocaleString()}</p>
                                )}

                                <div className="flex flex-wrap gap-2 mt-3">
                                    <button
                                        onClick={() => togglePublish(post.id, post.published_at)}
                                        className={`px-3 py-1 rounded text-white ${
                                            post.published_at ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        {post.published_at ? 'Unpublish' : 'Publish'}
                                    </button>

                                    <Link href={route('posts.edit', post.id)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                        Edit
                                    </Link>

                                    <button onClick={() => deletePost(post.id)} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800">
                                        Delete
                                    </button>

                                    <Link href={route('posts.show', post.id)} className="px-3 py-1 text-blue-600 hover:underline">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {posts.links && (
                        <div className="mt-6 flex justify-center">
                            {posts.links.map((link, idx) => (
                                <span
                                    key={idx}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} mx-1 cursor-pointer`}
                                    onClick={() => { if (link.url) window.location.href = link.url; }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
