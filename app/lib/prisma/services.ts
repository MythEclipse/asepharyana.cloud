// lib/prisma/service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  fullName?: string;
  avatar?: string;
  bio?: string;
}

export async function register(data: RegisterInput) {
  const { email, password, name, fullName, avatar, bio } = data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        fullName,
        avatar,
        bio,
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
