import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export class GalaxiesAccessLayer {
  config;
  db;
  constructor() {}

  setConfig(opts) {
    if (!opts.measurementId)
      throw new Error("measurement Id missing from the config options");

    if (!opts.apiKey)
      throw new Error("api key missing from the config options");

    if (!opts.authDomain)
      throw new Error("auth domain missing from the config options");

    if (!opts.projectId)
      throw new Error("project Id missing from the config options");

    if (!opts.storageBucket)
      throw new Error("storagee bucket missing from the config options");

    if (!opts.messagingSenderId)
      throw new Error("messaging sender Id missing from the config options");

    if (!opts.appId) throw new Error("app Id missing from the config options");
    this.config = opts;

    const app = initializeApp(opts);
    this.db = getFirestore(app);

    return this;
  }

  async add(collectionName, data) {
    try {
      const collectionRef = collection(this.db, collectionName);
      const docRef = await addDoc(collectionRef, data);
      return { id: docRef.id, ...data };
    } catch (error) {
      throw error;
    }
  }

  async get(collectionName, id) {
    try {
      const collectionRef = collection(this.db, collectionName);

      const docRef = doc(collectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      throw error;
    }
  }

  async fetch(collectionName) {
    try {
      const collectionRef = collection(this.db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(collectionName, id, data) {
    try {
      const collectionRef = collection(this.db, collectionName);
      const docRef = doc(collectionRef, id);
      await updateDoc(docRef, data);
      return { id, ...data };
    } catch (error) {
      throw error;
    }
  }

  async delete(collectionName, id) {
    try {
      const collectionRef = collection(this.db, collectionName);

      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
      return { id };
    } catch (error) {
      throw error;
    }
  }

  async query(collectionName, field, operator, value) {
    try {
      const collectionRef = collection(this.db, collectionName);
      const q = query(collectionRef, where(field, operator, value));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      throw error;
    }
  }

  async advancedQuery(collectionName, conditions = []) {
    try {
      let q = collection(this.db, collectionName);

      conditions.forEach((condition) => {
        q = query(
          q,
          where(condition.field, condition.operator, condition.value)
        );
      });

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (error) {
      throw error;
    }
  }
}
