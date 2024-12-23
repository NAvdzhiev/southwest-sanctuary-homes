import AdminPanel from '@/views/Admin/AdminPanel.vue';
import AddProperty from '@/views/Admin/AddProperty.vue';
import DesignPage from '@/views/Design/DesignPage.vue';
import QuizStep1 from '@/views/Design/QuizStep1.vue';
import QuizStep2 from '@/views/Design/QuizStep2.vue';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import NotFound from '@/views/NotFound.vue';
import PropertyDetails from '@/views/Properties/PropertyDetails.vue';
import PropertyList from '@/views/Properties/PropertyList.vue';
import WishList from '@/views/WishList.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import PropertyTab from '@/views/Admin/PropertyTab.vue';
import UserTab from '@/views/Admin/UserTab.vue';
import RegisterUser from '@/views/Admin/RegisterUser.vue';
import EditUser from '@/views/Admin/EditUser.vue';
import EditProperty from '@/views/Admin/EditProperty.vue';
import DesignQuiz from '@/views/Design/DesignQuiz.vue';
import QuizStep3 from '@/views/Design/QuizStep3.vue';

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
	},
	{
		path: '/quiz',
		name: 'DesignQuiz',
		component: DesignQuiz,
		children: [
			{
				path: '',
				name: 'QuizStep1',
				component: QuizStep1,
			},
			{
				path: 'step-2',
				name: 'QuizStep2',
				component: QuizStep2,
			},
			{
				path: 'step-3',
				name: 'QuizStep3',
				component: QuizStep3,
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
		component: AddProperty,
		meta: {
			requiresAuth: true,
			requiresAdmin: true,
		},
	},
	{
		path: '/register',
		name: 'Register User',
		component: RegisterUser,
		meta: {
			requiresAuth: true,
			requiresAdmin: true,
		},
	},
	{
		path: '/edit-user/:id',
		name: 'Edit User',
		component: EditUser,
		props: true,
		meta: {
			requiresAuth: true,
			requiresAdmin: true,
		},
	},
	{
		path: '/edit-property/:id',
		name: 'Edit Property',
		component: EditProperty,
		props: true,
		meta: {
			requiresAuth: true,
			requiresAdmin: true,
		},
	},
	{
		path: '/dashboard',
		name: 'Admin Panel',
		component: AdminPanel,
		children: [
			{ path: 'property-tab', name: 'Property Tab', component: PropertyTab },
			{
				path: 'user-tab',
				name: 'User Tab',
				component: UserTab,
				meta: { requiresAuth: true, requiresAdmin: true },
			},
		],
		meta: {
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
