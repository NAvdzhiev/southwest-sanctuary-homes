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
				const response = await api.post('', credentials);
				this.token = response.data.token;
				localStorage.setItem('token', this.token);
				api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
				await this.fetchUser();
				router.push('/dashboard');
			} catch (error) {
				this.error = error.response.data.message;
			} finally {
				this.loading = false;
			}
		},

		async fetchUser() {
			this.loading = true;
			try {
				const response = await api.get('');
				this.user = response.data;
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},

		async fetchUsers() {
			this.loading = true;
			try {
				const response = await api.get('');
				this.users = response.data;
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},

		async register(userData) {
			this.loading = true;

			try {
				await api.post('', userData);
				await this.login({
					email: userData.email,
					password: userData.password,
				});
			} catch (error) {
				this.error = error.response.data.message;
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
