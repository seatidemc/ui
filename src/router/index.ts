import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const originalPush = VueRouter.prototype.push;

// @ts-ignore
VueRouter.prototype.push = function push(location) {
	// @ts-ignore
	return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
		path: '/',
		name: 'home',
		component: () => import('@/views/Home.vue'),
		meta: {
			authRequired: true
		},
		children: [
			{
				path: 'overview',
				name: 'f.overview',
				meta: {
					authRequired: true
				},
				component: () => import('@/functional/Overview.vue')
			},
			{
				path: 'users',
				name: 'f.users',
				meta: {
					authRequired: true
				},
				component: () => import('@/functional/Users.vue')
			},
			{
				path: "fund",
				name: "f.fund",
				meta: {
					authRequired: true
				},
				component: () => import("@/functional/Fund.vue")
			},
			{
				path: "server",
				name: "f.server",
				meta: {
					authRequired: true
				},
				component: () => import("@/functional/Server.vue")
			}
		]
	}
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
});

export default router;
