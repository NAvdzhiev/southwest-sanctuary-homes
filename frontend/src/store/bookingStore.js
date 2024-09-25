import { defineStore } from 'pinia';
import api from '@/axios';

export const useBookingStore = defineStore('booking', {
	state: () => ({
		availableSlots: [],
		bookings: [],
		loading: false,
	}),
	actions: {
		async fetchAvailableSlots(date, propertyId) {
			this.loading = true;
			try {
				const response = await api.get(
					`/api/properties/${propertyId}/booking/available`,
					{ params: { date, propertyId } },
				);
				this.availableSlots = response.data.availableSlots;
				return this.availableSlots;
			} catch (error) {
				console.error('Error fetching available slots:', error);
			} finally {
				this.loading = false;
			}
		},
		async submitBooking(bookingData, propertyId) {
			try {
				const response = await api.post(
					`/api/properties/${propertyId}/booking`,
					bookingData,
				);
				this.bookings.push(response.data);
			} catch (error) {
				console.error('Error submitting booking:', error);
			}
		},
	},
});
