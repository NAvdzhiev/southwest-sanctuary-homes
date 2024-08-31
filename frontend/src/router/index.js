import AdminPanel from '@/views/Admin/AdminPanel.vue';
import PropertyForm from '@/views/Admin/PropertyForm.vue';
import DesignPage from '@/views/Design/DesignPage.vue';
import QuizStep1 from '@/views/Design/QuizStep1.vue';
import QuizStep2 from '@/views/Design/QuizStep2.vue';
import QuizSummary from '@/views/Design/QuizSummary.vue';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import NotFound from '@/views/NotFound.vue';
import PropertyDetails from '@/views/Properties/PropertyDetails.vue';
import PropertyList from '@/views/Properties/PropertyList.vue';
import WishList from '@/views/WishList.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/userStore';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/properties',
		name: 'PropertyList',
		component: PropertyList,
	},
	{
		path: '/properties/:id',
		name: 'PropertyDetails',
		component: PropertyDetails,
		props: true,
	},
	{
		path: '/design-and-renovation',
		name: 'Design',
		component: DesignPage,
		children: [
			{
				path: 'step-1',
				name: 'QuizStep1',
				component: QuizStep1,
			},
			{
				path: 'step-2',
				name: 'QuizStep2',
				component: QuizStep2,
			},
			{
				path: 'quiz-summary',
				name: 'QuizSummary',
				component: QuizSummary,
			},
		],
	},
	{
		path: '/wishlist',
		name: 'Wishlist',
		component: WishList,
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginPage,
		meta: {
			requiresGuest: true,
		},
	},
	{
		path: '/add-property',
		name: 'Add New Property',
		component: PropertyForm,
		metha: {
			requiresAuth: true,
			requiresAdmin: true,
		},
	},
	{
		path: '/dashboard',
		name: 'Admin Panel',
		component: AdminPanel,
		metha: {
			requiresAuth: true,
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore();

	await userStore.init();

	if (to.meta.requiresAuth && !userStore.isAuthenticated) {
		next('/login');
	} else if (to.meta.requiresGuest && userStore.isAuthenticated) {
		next('/');
	} else if (to.meta.requiresAdmin && !userStore.isAdmin) {
		next('/');
	} else {
		next();
	}
});
export default router;
