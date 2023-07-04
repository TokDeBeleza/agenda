import { db, storage } from './utils/firebase';
import { collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { geohashForLocation } from 'geofire-common';

import BaseService from './utils/BaseService';

export default class UserService extends BaseService {
  constructor() {
    super();
    this.collectionName = 'users';
    this.collectionRef = collection(db, this.collectionName);
  }

  async post(payload) {
    return await setDoc(this.#factoryDoc(payload.id), payload)
      .then(this.success)
      .catch(this.failure);
  }

  async get(id) {
    const docSnap = await getDoc(this.#factoryDoc(id));

    if (docSnap.exists()) {
      return this.success(docSnap.data());
    }

    throw this.failure({ code: 'error', message: 'User not found' });
  }

  async put(payload, id) {
    return await updateDoc(this.#factoryDoc(id), payload)
      .then(async () => {
        const updatedUser = await this.get(id);
        return this.success(updatedUser.body);
      })
      .catch(this.failure);
  }

  async uploadPhoto(file, id) {
    const path = `image/${id}_profile`;
    const storageChild = ref(storage, path);
    return uploadBytes(storageChild, file)
      .then(async (snapshot) => this.success({ ...snapshot, path: await this.downloadPhoto(path) }))
      .catch(this.failure);
  }
  async downloadPhoto(path) {
    const starsRef = ref(storage, path);
    const urlImg = await getDownloadURL(starsRef);
    return String(urlImg);
  }

  #factoryDoc(id, type = 1) {
    //checar se existe a possibilidade de criar o usuario já com as subcollections ou elas podem ser criadas ondemand
    return doc(db, this.collectionName, id);
  }
}
