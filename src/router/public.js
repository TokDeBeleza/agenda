import _ from '@/consts/publicRoutes.js';

import ViewRegister from '@/views/Login/ViewRegister.vue';
import ViewLogin from '@/views/Login/ViewLogin.vue';
import ViewScheduleClass from '@/views/ViewScheduleClass.vue';

const publicRoutes = [
  {
    path: _.REGISTER.PATH,
    name: _.REGISTER.NAME,
    component: ViewRegister
  },
  {
    path: _.LOGIN.PATH,
    name: _.LOGIN.NAME,
    component: ViewLogin
  },
  {
    path: _.SCHEDULE_CLASS.PATH,
    name: _.SCHEDULE_CLASS.NAME,
    component: ViewScheduleClass
  }
];

export default publicRoutes.map((route) => {
  route.meta = {
    requireAuth: false
  };
  return route;
});
