import AuthService from '../service/AuthService';
import { defineStore, acceptHMRUpdate } from 'pinia';
import UserService from '../service/UserService';

export const useUserStore = defineStore('storeUser', {
  state: () => ({
    user: {
      procedures:[]
    }
  }),
  actions: {
    async create({ email, password, type }) {
      const payload = {
        email,
        type,
        complemented_data: false
      };
      const authService = new AuthService(email, password);
      const userService = new UserService();

      try {
        const { success, body } = await authService.create();
        payload.id = body.user.uid;
        await userService.post(payload).catch((e) => {
          body.user.delete();
          return userService.failure(e);
        });

        this.user = payload;
        return { userId: body.user.uid, success };
      } catch (error) {
        return error;
      }
    },

    async update(payload, profileImage = null, id) {
      const userService = new UserService();
      try {
        if (profileImage) {
          const { body } = profileImage && (await userService.uploadPhoto(profileImage, id));
          payload.photo = body.path;
        }

        const result = await userService.put(payload, id);
        this.user = result.body;
        return result;
      } catch (error) {
        console.log(error)
        return error;
      }
    },

    async fetch(id) {
      const userService = new UserService();
      try {
        const result = await userService.get(id);
        this.user = result.body;
        return result;
      } catch (error) {
        return error;
      }
    },

    async signIn({ email, password }) {
      const authService = new AuthService(email, password);
      const userService = new UserService();

      try {
        const { body: authBody } = await authService.signIn();
        const response = await userService.get(authBody.user.uid);

        this.user = response.body;
        localStorage.setItem('Token:', authBody._tokenResponse.refreshToken);

        return response;
      } catch (e) {
        console.log(e);
        return e;
      }
    },

    async signOut() {
      const authService = new AuthService();
      try {
        await authService.signOut();
        this.user = {};
        return;
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
