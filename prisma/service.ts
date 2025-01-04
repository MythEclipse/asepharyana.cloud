// lib/prisma/service.ts
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface GoogleUserData {
  emailVerified: Date | null;
  email: string;
  fullname?: string | null;
  role: string;
  type: string;
}

export async function loginWithGoogle(
  userData: GoogleUserData,
  callback: (result: { status: boolean; data: User | string }) => void
) {
  try {
    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email: userData.email } });

    if (!user) {
      // If the user does not exist, create a new user
      user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.fullname,
          // emailVerified: userData.emailVerified,
          role: userData.role,
          image: '', // Provide a default or empty image if needed
        },
      });
    } else {
      // If the user exists, update their information if necessary
      user = await prisma.user.update({
        where: { email: userData.email },
        data: {
          name: userData.fullname,
          role: userData.role,
        },
      });
    }

    callback({ status: true, data: user });
  } catch (error) {
    console.error('Error in loginWithGoogle:', error);
    callback({ status: false, data: (error as Error).message });
  }
}

// interface RegisterInput {
//   email: string;
//   password: string;
//   name?: string;
//   fullname?: string;
//   image?: string;
//   bio?: string;
// }

// export async function register(data: RegisterInput) {
//   const { email, password, name, fullname, image, bio } = data;

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     // Create the user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         name,
//         fullname,
//         image,
//         role: 'member',  // Set default role or any other default values as needed
//       },
//     });

//     return {
//       status: 'success',
//       message: 'User registered successfully',
//       statusCode: 201,
//       user,
//     };
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return {
//       status: 'error',
//       message: 'Failed to register user',
//       statusCode: 500,
//     };
//   }
// }


export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}