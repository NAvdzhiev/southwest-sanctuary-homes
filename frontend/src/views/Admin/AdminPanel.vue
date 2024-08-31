<template>
	<h1>Admin Panel</h1>
	<h3>{{ user.firstName }} {{ user.lastName }} - {{ user.role }}</h3>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const user = userStore.user;
</script>
