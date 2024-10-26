<template>
	<div>
		<h2>Step 3: Personal Information</h2>
		<AppForm
			:fields="fields"
			:initial-fields-values="initialFieldsValues"
			:submit-text="'Submit Quiz'"
			@submit="onSubmit"
		/>
	</div>
</template>

<script setup>
import AppForm from '@/components/ui/AppForm.vue';

defineProps({
	fields: Array,
	initialFieldsValues: Object,
	onSubmit: Function,
});
</script>

<style scoped>
/* Add styles here if needed */
</style>
