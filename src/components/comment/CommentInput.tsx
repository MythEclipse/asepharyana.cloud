// "use client";

// import { useState } from "react";

// type HandleInputEvent = {
//   event: React.ChangeEvent<HTMLTextAreaElement>;
// };

// const CommentInput = () => {
//   const [comment, setComment] = useState("");

//   const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setComment(event.target.value);
//   };
//   const handlePost = (event: any) => {
//     event.preventDefault;
//   };

//   return (
//     <section className="bg-white py-8 antialiased dark:bg-gray-900 lg:py-16">
//       <div className="mx-auto max-w-2xl px-4">
//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
//             Discussion
//           </h2>
//         </div>
//         <form className="mb-6">
//           <div className="mb-4 rounded-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
//             <label htmlFor="comment" className="sr-only">
//               Your comment
//             </label>
//             <textarea
//               id="comment"
//               onChange={handleInput}
//               value={comment}
//               rows={6}
//               className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
//               placeholder="Write a comment..."
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             onClick={handlePost}
//             className="inline-flex items-center rounded-lg bg-primary-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
//           >
//             Post comment
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default CommentInput;
