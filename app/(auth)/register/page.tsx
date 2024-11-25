// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
// import Link from 'next/link';

// export default function RegisterPage() {
//   const { push } = useRouter();
//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const formData = new FormData(e.target as HTMLFormElement);
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: formData.get('name'),
//           email: formData.get('email'),
//           password: formData.get('password')
//         })
//       });

//       if (res.status === 200) {
//         (e.target as HTMLFormElement).reset();
//         push('/login');
//       } else {
//         setError('Email already exists');
//       }
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <section className="bg-gray-50 dark:bg-dark">
//       <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
//         {error && (
//           <Alert variant="destructive" className="mb-3">
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-darkb sm:max-w-md md:mt-0 xl:p-0">
//           <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
//               Create an account
//             </h1>
//             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <Label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
//                   Your name
//                 </Label>
//                 <Input type="text" name="name" id="name" placeholder="namecompany" required className="w-full" />
//               </div>
//               <div>
//                 <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
//                   Your email
//                 </Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="name@company.com"
//                   required
//                   className="w-full"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
//                   Password
//                 </Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="••••••••"
//                   required
//                   className="w-full"
//                 />
//               </div>
//               <div className="flex items-start">
//                 <Checkbox id="terms" aria-describedby="terms" className="h-5 w-5" required />
//                 <Label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
//                   I accept the{' '}
//                   <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">
//                     Terms and Conditions
//                   </Link>
//                 </Label>
//               </div>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 {isLoading ? 'Loading...' : 'Sign up'}
//               </Button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Already have an account?{' '}
//                 <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
//                   Login here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
