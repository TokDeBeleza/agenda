import { createRouter, createWebHashHistory } from 'vue-router';
import { useIsAuthenticate } from '@/composables/user.js';
import { LOGIN } from '@/consts/publicRoutes.js';
import { useUserStore } from '@/stores/UserStore';
import publicRoutes from './public';
import privateRoutes from './private';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  const { meta } = to;

  if (!meta.requireAuth) return true;

  const { user } = await useIsAuthenticate();

  if (!from.name) userStore.fetch(user?.body?.uid);
  if (!user.body) return { name: LOGIN.NAME }; //retornar para a pagina de not found

  return true;
});

export default router;
