<template>
	<div class="sort-container">
		<label for="sort-by">Sort By:</label>
		<select id="sort-by" v-model="sortBy" @change="updateSort">
			<option value="createdAt" selected>Date</option>
			<option value="price">Price</option>
		</select>

		<label for="sort-order">Order By:</label>
		<select id="sort-order" v-model="order" @change="updateSort">
			<option value="asc" selected>Ascending</option>
			<option value="desc">Descending</option>
		</select>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';

const propertyStore = usePropertyStore();
const sortBy = ref(propertyStore.sortBy);
const order = ref(propertyStore.order);

const updateSort = () => {
	propertyStore.setSort(sortBy.value, order.value);
};
</script>

<style scoped>
.sort-container {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
}

.sort-container label {
	font-size: 14px;
	color: var(--text-color-dark);
}

.sort-container select {
	padding: 10px 20px;
	border: 1px solid var(--accent-color);
	color: var(--text-color-dark);
	background-color: var(--accent-color);
	border-radius: 50px;
	cursor: pointer;
}
</style>
