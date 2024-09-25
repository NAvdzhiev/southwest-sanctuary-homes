<template>
	<AppForm
		:fields="fields"
		formTitle="Book a Property Tour"
		submitText="Book Now"
		@submit="handleBooking"
	/>
</template>

<script setup>
import { useBookingStore } from '@/store/bookingStore';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppForm from '../ui/AppForm.vue';

const bookingStore = useBookingStore();
const route = useRoute();

const selectedDate = ref('');

const fields = ref([
	{
		name: 'firstName',
		label: 'First Name',
		type: 'text',
		validation: { required: true },
	},
	{
		name: 'lastName',
		label: 'Last Name',
		type: 'text',
		validation: { required: true },
	},
	{
		name: 'email',
		label: 'Email',
		type: 'email',
		validation: { required: true },
	},
	{
		name: 'phone',
		label: 'Phone',
		type: 'tel',
		validation: { required: true },
	},
	{
		name: 'date',
		label: 'Preferred Date',
		type: 'date',
		value: selectedDate,
		validation: { required: true },
	},
	{
		name: 'timeSlot',
		label: 'Select Time Slot',
		type: 'select',
		options: [],
		validation: { required: true },
	},
]);

watch(selectedDate, async (newDate) => {
	if (newDate) {
		const propertyId = route.params.id;

		await bookingStore.fetchAvailableSlots(newDate, propertyId);

		const availableSlots = bookingStore.availableSlots;
		const timeSlotField = fields.value.slice(-1)[0];
		timeSlotField.options = availableSlots.map((slot) => ({
			value: slot,
			text: slot,
		}));
	}
});

const handleBooking = async (formData) => {
	const propertyId = route.params.id;
	await bookingStore.submitBooking(propertyId, formData);
};
</script>
