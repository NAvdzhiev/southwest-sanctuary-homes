<template>
	<AppForm
		:fields="fields"
		formTitle="Register New User"
		submitText="Register"
		:loading="userStore.loading"
		:error="userStore.error"
		@submit="handleRegister"
	/>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';
import AppForm from '@/components/ui/AppForm.vue';

const userStore = useUserStore();
const router = useRouter();

const fields = ref([
	{
		name: 'firstName',
		id: 'firstName',
		label: 'First Name',
		type: 'text',
		placeholder: 'Enter First Name',
		validation: {
			required: true,
			pattern: /^[a-z ,.'-]+$/i,
		},
	},
	{
		name: 'lastName',
		id: 'lastName',
		label: 'Last Name',
		type: 'text',
		placeholder: 'Enter Last Name',
		validation: {
			required: true,
			pattern: /^[a-z ,.'-]+$/i,
		},
	},
	{
		name: 'email',
		id: 'email',
		label: 'Email',
		type: 'email',
		placeholder: 'Enter Email',
		validation: {
			required: true,
			pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		},
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
		name: 'password',
		id: 'password',
		label: 'Password',
		type: 'password',
		placeholder: 'Enter your password',
		validation: {
			required: true,
			minLength: 8,
		},
	},
	{
		name: 'role',
		id: 'role',
		label: 'Assign Role for User',
		type: 'select',
		options: [
			{ value: 'admin', text: 'Admin' },
			{ value: 'agent', text: 'Agent' },
			{ value: 'designer', text: 'Designer' },
		],
		validation: {
			required: true,
		},
	},
]);

const handleRegister = async (formData) => {
	try {
		await userStore.register(formData);
		router.replace('/dashboard/user-tab');
	} catch (error) {
		console.error('Register error:', error);
		alert('An error occurred during register. Please try again.');
	}
};
</script>
