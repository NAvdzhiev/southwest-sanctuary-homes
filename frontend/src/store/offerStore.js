import { defineStore } from 'pinia';
import api from '@/axios';

export const useOfferStore = defineStore('offer', {
	state: () => ({
		offers: [],
	}),

	actions: {
		async fetchOffers() {
			try {
				const response = await api.get('');
				this.offers = response.data;
			} catch (error) {
				console.error('Error fetching offers:', error);
			}
		},
		async sendOffer(offerData, propertyId) {
			try {
				const response = await api.post(
					`/api/properties/${propertyId}/offers`,
					offerData,
				);
				this.offers.push(response.data);
			} catch (error) {
				console.error('Error submitting offer:', error);
			}
		},
	},
});
