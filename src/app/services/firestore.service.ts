import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDocFromServer,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireStoreService {
  constructor(private firestore: Firestore) {}

  async getCollection(collectionPath: string): Promise<any[]> {
    const userCollection: CollectionReference = collection(
      this.firestore,
      collectionPath
    );
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userList;
  }

  async createDocument(docPath: string, data: any) {
    const docRef = doc(this.firestore, docPath);
    await setDoc(docRef, data);
  }

  async addDocument(collectionPath: string, data: any) {
    const collectionRef = collection(this.firestore, collectionPath);
    const doc = await addDoc(collectionRef, data);
    return doc.id;
  }

  async getDocument(docPath: string) {
    const docRef = doc(this.firestore, docPath);
    const docSnap = await getDocFromServer(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  }

  async updateDocument(collectionPath: string, data: any) {
    const docRef = doc(this.firestore, collectionPath);
    await setDoc(docRef, data, { merge: true });
  }

  async deleteDocument(docPath: string) {
    const docRef = doc(this.firestore, docPath);
    await deleteDoc(docRef);
  }
}
