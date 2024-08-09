import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useUserStore = defineStore('user', {
	//State
	state: () => ({
		user: null,
		token: localStorage.getItem('token') || null,
		loading: false,
		error: null,
	}),

	//Actions
	async login(credentials) {
		this.loading = true;

		try {
			const response = await axios.post('', credentials);
			this.token = response.data.token;
			localStorage.setItem('token', this.token);
			axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
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
			const response = await axios.get('');
			this.user = response.data;
		} catch (error) {
			this.error = error;
		} finally {
			this.loading = false;
		}
	},

	async register(userData) {
		this.loading = true;

		try {
			await axios.post('', userData);
			await this.login({ email: userData.email, password: userData.password });
		} catch (error) {
			this.error = error.response.data.message;
		}
	},

	getters: {
		userRole: (state) => state.user?.role || null,
		isAdmin: (state) => state.user?.role === 'admin',
		isAgent: (state) => state.user?.role === 'agent',
		isAuthenticated: (state) => !!state.token,
	},
});
