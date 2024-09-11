<template>
	<AppForm
		v-if="!loading && property"
		:fields="fields"
		formTitle="Edit Property"
		submitText="Update Property"
		:initialFieldsValues="initialFieldsValues"
		@submit="handleEdit"
	/>
	<p v-else-if="loading">Loading property data...</p>
	<p v-else>Property not found!</p>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/store/userStore';
import { usePropertyStore } from '@/store/propertyStore';
import { useRoute, useRouter } from 'vue-router';
import AppForm from '@/components/ui/AppForm.vue';

const userStore = useUserStore();
const propertyStore = usePropertyStore();
const route = useRoute();
const router = useRouter();

const fields = ref([]);
const initialFieldsValues = ref({});
const loading = computed(() => propertyStore.loading);
const property = computed(() => propertyStore.property);

onMounted(async () => {
	const propertyId = route.params.id;
	await propertyStore.fetchProperty(propertyId);
	await userStore.fetchUsers();

	const agents = userStore.users.filter((user) => user.role === 'agent');

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
			type: 'number',
			placeholder: 'Enter Property Price',
			validation: {
				required: true,
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
				required: true,
			},
		},
	];

	initialFieldsValues.value = {
		title: property.value.title,
		description: property.value.description,
		state: property.value.state,
		footage: property.value.footage,
		bedrooms: property.value.bedrooms,
		bathrooms: property.value.bathrooms,
		price: property.value.price,
		city: property.value.city,
		address: property.value.address,
		geolocation: property.value.geolocation,
		status: property.value.status,
		agent: property.value.agent,
	};
});

const handleEdit = async (formData) => {
	try {
		const propertyId = route.params.id;
		await propertyStore.updateProperty(propertyId, formData);
		router.replace('/dashboard/property-tab');
	} catch (error) {
		console.error('Error updating user:', error);
	}
};
</script>
