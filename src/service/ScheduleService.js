import BaseService from './utils/BaseService';
import moment from 'moment';
import { db } from './utils/firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  where,
  setDoc,
  deleteDoc,
  limit
} from 'firebase/firestore';

export default class ScheduleService extends BaseService {
  constructor(subCollection, teacherId) {
    super();
    this.collection = subCollection;
    this.teacherId = teacherId;
  }

  async getClasses(day) {
    return await getDocs(
      query(
        collection(...this.#factoryCollection()),
        where('date', '<=', new Date(moment(day).endOf('day'))),
        where('date', '>=', new Date(moment(day).startOf('day')), orderBy('date', 'desc'))
      )
    )
      .then(({ docs }) => this.success(docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
      .catch(this.failure);
  }

  async getNextClasses(day) {
    return await getDocs(
      query(
        collection(...this.#factoryCollection()),
        where('date', '>=', new Date(), orderBy('date', 'desc'), limit(20))
      )
    )
      .then(({ docs }) => this.success(docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
      .catch(this.failure);
  }

  async postAppointments(payload) {
    const ref = collection(...this.#factoryCollection());
    try {
      return payload.forEach(async (document) => {
        await setDoc(doc(ref), document).then(this.success).catch(this.failure);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAppointments(item) {
    try {
      return await deleteDoc(doc(...this.#factoryCollection(item)))
        .then(this.success)
        .catch(this.failure);
    } catch (error) {
      console.log(error);
    }
  }

  async getAppointments() {
    return await getDocs(collection(...this.#factoryCollection()))
      .then(({ docs }) => this.success(docs.map((doc) => doc.data())))
      .catch(this.failure);
  }

  #factoryCollection(item) {
    const parameters = [db, 'users', this.teacherId, this.collection];
    if (item) parameters.push(item);
    return parameters;
  }
}
