<template>
	<AppForm
		:fields="fields"
		formTitle="Submit Your Offer"
		submitText="Submit Offer"
		@submit="handleSubmitOffer"
	/>
</template>

<script setup>
import { useOfferStore } from '@/store/offerStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppForm from '../ui/AppForm.vue';

const offerStore = useOfferStore();
const route = useRoute();

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
		name: 'offerAmount',
		label: 'Offer Amount',
		type: 'number',
		validation: { required: true },
	},
	{
		name: 'message',
		label: 'Leave a Message (Optional)',
		type: 'textarea',
	},
]);

const handleSubmitOffer = async (formData) => {
	const propertyId = route.params.id;
	await offerStore.sendOffer(formData, propertyId);
};
</script>
