<template>
	<AppForm
		:fields="fields"
		formTitle="Add New Property"
		submitText="Add Property"
		:initialFieldsValues="initialFieldsValues"
		@submit="handleSubmit"
	/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';
import AppForm from '@/components/ui/AppForm.vue';

const propertyStore = usePropertyStore();
const userStore = useUserStore();
const router = useRouter();
const fields = ref([]);
const initialFieldsValues = ref({});

onMounted(async () => {
	await userStore.fetchUsers();

	const agents = userStore.users.filter((user) => user.role === 'Agent');

	fields.value = [
		{
			name: 'title',
			id: 'title',
			label: 'Property Title',
			type: 'text',
			placeholder: 'Enter Property Title',
			validation: {
				required: true,
			},
		},
		{
			name: 'images',
			id: 'images',
			label: 'Property Images',
			placeholder: 'Upload Property Images',
			type: 'file',
			validation: {
				required: true,
				allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
				maxSize: 2 * 1024 * 1024, // 2 MB max file size
			},
		},
		{
			name: 'description',
			id: 'description',
			label: 'Property Description',
			type: 'textarea',
			placeholder: 'Enter Property Description',
			validation: {
				required: true,
			},
		},
		{
			name: 'state',
			id: 'state',
			label: 'Choose State',
			type: 'select',
			options: [
				{ value: 'NV', text: 'Nevada' },
				{ value: 'CA', text: 'California' },
				{ value: 'AZ', text: 'Arizona' },
				{ value: 'NM', text: 'New Mexico' },
			],
			validation: {
				required: true,
			},
		},
		{
			name: 'footage',
			id: 'footage',
			label: 'Property Square Footage',
			type: 'number',
			placeholder: 'Enter Property Square Footage',
			validation: {
				required: true,
				minLength: 500,
			},
		},
		{
			name: 'bedrooms',
			id: 'bedrooms',
			label: 'Property Bedrooms Count',
			type: 'number',
			placeholder: 'Enter Property Bedrooms Count',
			validation: {
				required: true,
				minLength: 1,
			},
		},
		{
			name: 'bathrooms',
			id: 'bathrooms',
			label: 'Property Bathrooms Count',
			type: 'number',
			placeholder: 'Enter Property Bathrooms Count',
			validation: {
				required: true,
				minLength: 1,
			},
		},
		{
			name: 'price',
			id: 'price',
			label: 'Property Price',
			type: 'text',
			placeholder: 'Enter Property Price',
			validation: {
				required: true,
				pattern: /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/,
			},
		},
		{
			name: 'city',
			id: 'city',
			label: 'Property City Location',
			type: 'text',
			placeholder: 'Enter Property City Location',
			validation: {
				required: true,
			},
		},
		{
			name: 'address',
			id: 'address',
			label: 'Property Address',
			type: 'text',
			placeholder: 'Enter Property Address',
			validation: {
				required: true,
				pattern: /^\s*\S+(?:\s+\S+){2}/,
			},
		},
		{
			name: 'status',
			id: 'status',
			label: 'Property Status',
			type: 'select',
			options: [
				{ value: 'New', text: 'New' },
				{ value: 'Open House', text: 'Open House' },
				{ value: 'Pending', text: 'Pending' },
				{ value: 'Sold', text: 'Sold' },
			],
			validation: {
				required: true,
			},
		},
		{
			name: 'geolocation',
			id: 'geolocation',
			label: 'Property Geolocation (lat, lng)',
			type: 'text',
			placeholder: 'Enter Property Geolocation Coordinates',
			validation: {
				required: true,
				pattern:
					/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
			},
		},
		{
			name: 'agent',
			id: 'agent',
			label: 'Property Agent',
			type: 'select',
			options: agents.map((agent) => ({
				value: agent._id,
				text: `${agent.firstName} ${agent.lastName}`,
			})),
			validation: {
				required: false,
			},
		},
	];

	initialFieldsValues.value = {
		title: '',
		description: '',
		state: '',
		footage: 500,
		bedrooms: 1,
		bathrooms: 1,
		price: '0',
		city: '',
		address: '',
		geolocation: '',
		status: '',
		agent: '',
	};
});

const handleSubmit = async (formData) => {
	try {
		await propertyStore.createProperty(formData);
		console.log('Property added successfully!');
		router.replace('/properties');
	} catch (error) {
		console.log('Failed to submit property:', error);
	}
};
</script>
