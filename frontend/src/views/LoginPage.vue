<template>
	<AppForm
		:fields="fields"
		formTitle="Sign In"
		submitText="Login"
		:loading="userStore.loading"
		:error="userStore.error"
		@submit="handleLogin"
	/>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
//import { useRouter } from 'vue-router';
import AppForm from '@/components/ui/AppForm.vue';

const userStore = useUserStore();
//const router = useRouter();

const fields = ref([
	{
		name: 'email',
		id: 'email',
		label: 'Email',
		type: 'email',
		placeholder: 'Enter your email',
		validation: {
			required: true,
			pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
]);

const handleLogin = async (formData) => {
	console.log(formData);
};
</script>
