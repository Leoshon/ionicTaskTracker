import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private fireAuth: Auth, private fireStore: Firestore) {}
  async login(user: User) {
    return await signInWithEmailAndPassword(
      this.fireAuth,
      user.email,
      user.password
    );
  }
  async register(user: User) {
    return await createUserWithEmailAndPassword(
      this.fireAuth,
      user.email,
      user.password
    );
  }
  async signOut() {
    return await this.fireAuth.signOut();
  }
  updateUser(user: any) {
    const auth = getAuth();
    if(!auth.currentUser) return;
    return updateProfile(auth.currentUser, user);
  }
 async addDocument(path: string, data: any) {
    return await addDoc(collection(this.fireStore, path), data);
  }
 getTasks(path:string, collectionquery?:any){
    const ref = collection(this.fireStore, path);
    return  collectionData(query(ref, collectionquery), {idField: 'id'});
  }
  updateDocument(path: string, data: any) {
    return updateDoc(doc(this.fireStore, path), data);
  }
  deleteDocument(path: string, id: any) {
    return deleteDoc(doc(this.fireStore, path, id));
  }
  
}
