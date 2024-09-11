<template>
	<div>
		<AppForm
			:fields="fields"
			formTitle="Edit User"
			submitText="Update User"
			:initialFieldsValues="initialFieldsValues"
			@submit="handleEdit"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

onMounted(async () => {
	const userId = route.params.id;

	await userStore.fetchUserById(userId);
	await propertyStore.fetchProperties();
	const user = userStore.user;

	// Define form fields
	fields.value = [
		{
			name: 'firstName',
			id: 'firstName',
			label: 'First Name',
			type: 'text',
			placeholder: 'Enter first name',
			validation: { pattern: /^[a-z ,.'-]+$/i, required: true },
		},
		{
			name: 'lastName',
			id: 'lastName',
			label: 'Last Name',
			type: 'text',
			placeholder: 'Enter last name',
			validation: { pattern: /^[a-z ,.'-]+$/i, required: true },
		},
		{
			name: 'email',
			id: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Enter email',
			validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, required: true },
		},
		{
			name: 'phone',
			id: 'phone',
			label: 'Phone Number',
			type: 'tel',
			placeholder: 'Enter Phone Number',
			validation: {
				required: true,
				pattern: /([0-9\s-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
			},
		},
		{
			name: 'role',
			id: 'role',
			label: 'Role',
			type: 'select',
			options: [
				{ value: 'user', text: 'User' },
				{ value: 'agent', text: 'Agent' },
				{ value: 'admin', text: 'Admin' },
			],
			validation: { required: true },
		},
	];

	// Set initial values from user data
	initialFieldsValues.value = {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		phone: user.phone,
		role: user.role,
	};
});

const handleEdit = async (formData) => {
	try {
		const userId = route.params.id;
		await userStore.updateUser(userId, formData);
		router.replace('/dashboard/user-tab');
	} catch (error) {
		console.error('Error updating user:', error);
	}
};
</script>
