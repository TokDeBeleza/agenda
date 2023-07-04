import _ from '@/consts/privateRoutes.js';
import { LOGIN } from '@/consts/publicRoutes.js';
import { useUserStore } from '@/stores/UserStore';
import ViewCreateClass from '@/views/ViewCreateClass.vue';
import { enumUserType } from '@/consts/enums';

const privateRoutes = [
  {
    path: _.CREATE_CLASS.PATH,
    name: _.CREATE_CLASS.NAME,
    component: ViewCreateClass,
    beforeEnter: ({ params }) => {
     /*  const userStore = useUserStore();
      if (!params?.id || userStore?.user?.type != enumUserType.teacher) return { name: LOGIN.NAME };
      return true; */
    }
  }
];

export default privateRoutes.map((route) => {
  route.meta = {
    requireAuth: true,
    userType: enumUserType.teacher
  };
  return route;
});
