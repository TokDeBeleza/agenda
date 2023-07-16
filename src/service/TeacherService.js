import { db } from './utils/firebase';
import BaseService from './utils/BaseService';
import { collection, doc, getDoc } from 'firebase/firestore';

export default class UserService extends BaseService {
  constructor() {
    super();
    this.collectionName = 'users';
    this.collectionRef = collection(db, this.collectionName);
  }

  async get(id) {
    const docSnap = await getDoc(this.#factoryDoc(id));

    if (docSnap.exists()) {
      return this.success(docSnap.data());
    }

    throw this.failure({ code: 'error', message: 'Company not found' });
  }

  #factoryDoc(id, type = 1) {
    //checar se existe a possibilidade de criar o usuario já com as subcollections ou elas podem ser criadas ondemand
    return doc(db, this.collectionName, id);
  }
}
