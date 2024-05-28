import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./init";
const firestore = getFirestore(app);
export async function retrieveData(collectionName:string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
   const data = snapshot.docs.map((doc) =>( {
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveDataById(collectionName:string, id:string) {
    const snapshot = await getDocs(collection(firestore, collectionName,id));
    const data = snapshot.docs.map((doc) =>( {
        id: doc.id,
        ...doc.data(),
    }));
    return data.find((item) => item.id === id);
}