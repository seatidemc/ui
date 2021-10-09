import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/Home.vue'),
		meta: {
			authRequired: true
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/views/About.vue')
	},
	{
		path: '/auth',
		name: 'auth',
		component: () => import('@/views/Auth.vue')
	},
	{
		path: '/:current',
		name: 'functional',
		component: () => import('@/views/Home.vue'),
		meta: {
			authRequired: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
