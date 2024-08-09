import { defineStore } from 'pinia';
import axios from 'axios';

export const usePropertyStore = defineStore('property', {
	state: () => ({
		properties: [],
		selectedProperty: null,
		sortBy: null,
		order: 'asc',
		filterState: null,
		filterStatus: null,
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
				};

				const response = await axios.get('', { params });
				this.properties = response.data;
			} catch (error) {
				this.error = error.response
					? error.response.data.message
					: error.message;
			} finally {
				this.loading = false;
			}
		},
		async fetchProperty(id) {
			this.loading = true;
			try {
				const response = await axios.get(`${id}`);
				this.selectedProperty = response.data;
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		async createProperty(propertyData) {
			this.loading = true;
			try {
				await axios.post('', propertyData);
				await this.fetchProperties();
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},
		async updateProperty(id) {
			this.loading = true;
			try {
				await axios.put(`${id}`);
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
				await axios.delete(`${id}`);
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
		sortedByNewest: (state) =>
			state.properties
				.slice()
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
		sortedByOldest: (state) =>
			state.properties
				.slice()
				.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
		sortedByPriceLowToHigh: (state) =>
			state.properties.slice().sort((a, b) => a.price - b.price),
		sortedByPriceHighToLow: (state) =>
			state.properties.slice().sort((a, b) => b.price - a.price),
		filteredByState: (state) =>
			state.properties.filter((property) =>
				state.filterState ? property.state === state.filterState : true,
			),
		filteredByStatus: (state) =>
			state.properties.filter((property) =>
				state.filterState ? property.status === state.filterStatus : true,
			),
	},
});
