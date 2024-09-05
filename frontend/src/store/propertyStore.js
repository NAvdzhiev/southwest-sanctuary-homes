import { defineStore } from 'pinia';
import api from '../axios';

export const usePropertyStore = defineStore('property', {
	state: () => ({
		properties: [],
		totalProperties: 0,
		totalPages: 0,
		currentPage: 1,
		property: null,
		sortBy: 'createdAt',
		order: 'desc',
		filterState: '',
		filterStatus: '',
		loading: false,
		error: null,
	}),

	actions: {
		async fetchProperties() {
			this.loading = true;
			try {
				const params = {
					sortBy: this.sortBy,
					order: this.order,
					state: this.filterState,
					status: this.filterStatus,
					page: this.currentPage,
					limit: 16,
				};

				const response = await api.get('/api/properties', { params });
				this.properties = response.data.properties;
				(this.totalProperties = response.data.totalProperties),
					(this.totalPages = response.data.totalPages),
					(this.currentPage = response.data.currentPage);
			} catch (error) {
				this.error = error.response
					? error.response.data.message
					: error.message;
			} finally {
				this.loading = false;
			}
		},

		setSort(sortBy, order) {
			this.sortBy = sortBy;
			this.order = order;
			this.fetchProperties();
		},

		setFilter(filterState, filterStatus) {
			this.filterState = filterState;
			this.filterStatus = filterStatus;
			this.fetchProperties();
		},

		setPage(page) {
			this.currentPage = page;
			this.fetchProperties();
		},

		async fetchProperty(id) {
			this.loading = true;
			try {
				const response = await api.get(`/api/properties/${id}`);
				this.property = response.data;
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		async createProperty(propertyData) {
			this.loading = true;
			try {
				const response = await api.post('/api/properties', propertyData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				console.log(response.data);

				//await this.fetchProperties();
			} catch (error) {
				this.error = error.response ? error.response.data : error.message;
				console.error('Error creating property:', this.error);
			} finally {
				this.loading = false;
			}
		},
		async updateProperty(id) {
			this.loading = true;
			try {
				await api.put(`${id}`);
				await this.fetchProperty(id);
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		async deleteProperty(id) {
			this.loading = true;
			try {
				await api.delete(`/api/properties/${id}`);
				await this.fetchProperties();
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		setSortOptions(sortBy, order = 'asc') {
			this.sortBy = sortBy;
			this.order = order;
			this.fetchProperties();
		},
		setFilterOptions() {
			this.filterState = this.state;
			this.filterStatus = this.status;
		},
	},
	getters: {
		sortedAndFilteredProperties: (state) => state.properties,
	},
});
