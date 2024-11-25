// // next-auth.d.ts
// import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   /**
//    * Extended User object that includes custom properties.
//    */
//   interface User extends DefaultUser {
//     id: string;
//     fullname?: string | null; // Add fullname property
//     role: string;
//   }

//   /**
//    * Extended Session object to include additional properties from the User.
//    */
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//       fullname?: string | null;
//     } & DefaultSession['user'];
//   }

//   /**
//    * Extended JWT to include custom properties.
//    */
//   interface JWT {
//     id: string;
//     role: string;
//     fullName?: string | null;
//   }
// }
