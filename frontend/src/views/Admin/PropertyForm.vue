<template>
	<AppForm
		:fields="fields"
		formTitle="Add New Property"
		submitText="Add Property"
		@submit="handleAddProperty"
	/>
</template>

<script setup>
import { ref } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';
import { useRouter } from 'vue-router';
import AppForm from '@/components/ui/AppForm.vue';

const propertyStore = usePropertyStore();
const router = useRouter();

const fields = ref([{}]);
</script>
