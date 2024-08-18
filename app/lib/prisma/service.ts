// lib/prisma/service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface GoogleUserData {
  emailVerified: boolean;
  email: string;
  fullname?: string | null; // Ensure consistent naming
  role: string;
  type: string;
}

export async function loginWithGoogle(
  userData: GoogleUserData,
  callback: (result: { status: boolean; data: any }) => void
) {
  try {
    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email: userData.email } });

    if (!user) {
      // If the user does not exist, create a new user
      user = await prisma.user.create({
        data: {
          email: userData.email,
          fullname: userData.fullname,
          emailVerified: userData.emailVerified, // Correct field name
          role: userData.role,
          type: userData.type, // Ensure 'type' exists in your Prisma schema
          password: '', // Provide a default or empty password if needed
        },
      });
    } else {
      // If the user exists, update their information if necessary
      user = await prisma.user.update({
        where: { email: userData.email },
        data: {
          fullname: userData.fullname, // Correct field name
          role: userData.role,
          type: userData.type, // Ensure 'type' exists in your Prisma schema
        },
      });
    }

    callback({ status: true, data: user });
  } catch (error) {
    console.error('Error in loginWithGoogle:', error);
    callback({ status: false, data: (error as Error).message });
  }
}

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  fullname?: string;
  image?: string;
  bio?: string;
}

export async function register(data: RegisterInput) {
  const { email, password, name, fullname,image, bio } = data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        fullname,
        image,
        role: 'member',  // Set default role or any other default values as needed
        type: 'credentials',
      },
    });

    return {
      status: 'success',
      message: 'User registered successfully',
      statusCode: 201,
      user,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      status: 'error',
      message: 'Failed to register user',
      statusCode: 500,
    };
  }
}

