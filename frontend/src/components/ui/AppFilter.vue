<template>
	<div class="filter-container">
		<label for="state-filter">Filter By State:</label>
		<select id="state-filter" v-model="filterState" @change="updateFilter">
			<option value="">All</option>
			<option value="NV">Nevada</option>
			<option value="CA">California</option>
			<option value="NM">New Mexico</option>
			<option value="AZ">Arizona</option>
		</select>

		<label for="status-filter">Filter By Status:</label>
		<select id="status-filter" v-model="filterStatus" @change="updateFilter">
			<option value="">All</option>
			<option value="new">New</option>
			<option value="open house">Open House</option>
			<option value="pending">Pending</option>
		</select>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';

const propertyStore = usePropertyStore();
const filterState = ref(propertyStore.filterState);
const filterStatus = ref(propertyStore.filterStatus);

const updateFilter = () => {
	propertyStore.setFilter(filterState.value, filterStatus.value);
};
</script>

<style scoped>
.filter-container {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
}

.filter-container label {
	font-size: 14px;
	color: var(--text-color-dark);
}

.filter-container select {
	padding: 10px 20px;
	border: 1px solid var(--accent-color);
	color: var(--text-color-dark);
	background-color: var(--accent-color);
	border-radius: 50px;
	cursor: pointer;
}
</style>
