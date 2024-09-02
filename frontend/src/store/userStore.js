import { defineStore } from 'pinia';
import api from '../axios';
import router from '@/router';

export const useUserStore = defineStore('user', {
	//State
	state: () => ({
		user: null,
		users: [],
		token: localStorage.getItem('token') || null,
		loading: false,
		error: null,
	}),

	actions: {
		async login(credentials) {
			this.loading = true;
			try {
				const response = await api.post('/api/admin/login', credentials);
				this.token = response.data.token;
				localStorage.setItem('token', this.token);
				api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
				await this.fetchUser();
				router.replace('/dashboard');
			} catch (error) {
				this.error = error.response.data.message;
			} finally {
				this.loading = false;
			}
		},

		async fetchUser() {
			this.loading = true;
			try {
				const response = await api.get('/api/admin/profile');
				this.user = response.data;
			} catch (error) {
				this.error =
					error.response?.data?.message || 'Failed to fetch user data';
			} finally {
				this.loading = false;
			}
		},

		async fetchUsers() {
			this.loading = true;
			try {
				const response = await api.get('/api/admin/users');
				this.users = response.data;
			} catch (error) {
				error.response?.data?.message || 'Failed to fetch users';
			} finally {
				this.loading = false;
			}
		},

		async register(userData) {
			this.loading = true;
			try {
				await api.post('/api/admin/register', userData);
				await this.fetchUsers();
				router.replace('/dashboard/user-tab');
			} catch (error) {
				this.error = error.response.data.message;
			} finally {
				this.loading = false;
			}
		},

		async init() {
			if (this.token) {
				this.loading = true;
				try {
					api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
					const response = await api.get('/api/admin/profile');
					this.user = response.data;
				} catch (error) {
					this.error =
						error.response?.data?.message || 'Failed to fetch user data';
					this.token = null;
					localStorage.removeItem('token');
				} finally {
					this.loading = false;
				}
			}
		},
	},

	getters: {
		userRole: (state) => state.user?.role || null,
		isAdmin: (state) => state.user?.role === 'admin',
		isAgent: (state) => state.user?.role === 'agent',
		isAuthenticated: (state) => !!state.token,
	},
});
