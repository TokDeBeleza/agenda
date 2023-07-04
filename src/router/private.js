import _ from '@/consts/privateRoutes.js';
import teacherRoutes from './teacherRoutes';
import ViewComplementData from '@/views/ViewComplementData.vue';

const privateRoutes = [
  ...teacherRoutes,
  {
    path: _.USER_COMPLEMENT_DATA.PATH,
    name: _.USER_COMPLEMENT_DATA.NAME,
    component: ViewComplementData
  }
];

export default privateRoutes.map((route) => {
  if (route.meta) {
    route.meta.requireAuth = true;
  } else {
    route.meta = {
      requireAuth: true
    };
  }

  return route;
});
