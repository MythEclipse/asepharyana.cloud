import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from './init';
import bcrypt from 'bcrypt';

const firestore = getFirestore(app);
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDocs(collection(firestore, collectionName, id));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  return data.find((item) => item.id === id);
}

export async function register(data: { fullName: string; email: string; password: string; role?: string }) {
  const q = query(collection(firestore, 'users'), where('email', '==', data.email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: 'Email already exists'
    };
  } else {
    data.role = 'member';
    data.password = await bcrypt.hash(data.password, 10);
    try {
      await addDoc(collection(firestore, 'users'), data);
      return {
        status: true,
        statusCode: 200,
        message: 'register successfully'
      };
    } catch (error) {
      return {
        status: false,
        statusCode: 400,
        message: 'register failed'
      };
    }
  }
}

export async function login(data: any) {
  const q = query(collection(firestore, 'users'), where('email', '==', data.email));
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  if (user) {
    return user[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callbacks: any) {
  const q = query(collection(firestore, 'users'), where('email', '==', data.email));
  const snapshot = await getDocs(q);
  const user: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  if (user.length > 0) {
    data.role = user[0].role;
    await updateDoc(doc(firestore, 'users', user[0].id), data).then(() => {
      callbacks({ status: true, data: data });
    });
  } else {
    data.role = 'member';
    await addDoc(collection(firestore, 'users'), data).then(() => {
      return data;
    });
  }
}

export async function postComment(data: { content: string; postId: string; userId: string; email: string }) {
  // const userQuery = query(collection(firestore, 'users'), where('email', '==', data.email));
  // const postQuery = query(collection(firestore, 'posts'), where('id', '==', data.postId));

  // const userSnapshot = await getDocs(userQuery);
  // const postSnapshot = await getDocs(postQuery);

  // const user = userSnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data()
  // }));

  // const post = postSnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data()
  // }));

  // Perform comment logic here
  const commentData = {
    email: data.email,
    // userId: user[0].id,
    // postId: post[0].id,
    content: data.content,
    createdAt: new Date()
  };

  try {
    await addDoc(collection(firestore, 'comments'), commentData);
    return { status: true, data: commentData };
  } catch (error) {
    return { status: false, error };
  }
}

export async function getComments() {
  const comments = await retrieveData('comments');
  return comments;
}
