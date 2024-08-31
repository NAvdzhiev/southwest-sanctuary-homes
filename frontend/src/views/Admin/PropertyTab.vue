<template>
	<h1>Property Tab</h1>
	{{ properties }}
	<table>
		<thead>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
		</thead>
		<tbody>
			<tr v-for="property in properties" :key="property._id">
				<td>{{ property.title }}</td>
				<td>
					<img
						:src="property.images[3]"
						:alt="property - title"
						width="80"
						height="80"
					/>
				</td>
				<td>{{ property.footage }}</td>
				<td>{{ property.bedrooms }}</td>
				<td>{{ property.bathrooms }}</td>
				<td>
					{{ property.address }}, {{ property.city }} {{ property.state }}
				</td>
				<td>{{ property.status }}</td>
				<td>{{ property.bookings.length }}</td>
				<td>{{ property.offers.length }}</td>
				<td>{{ property.createdAt }}</td>
			</tr>
		</tbody>
	</table>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';

const propertyStore = usePropertyStore();

onMounted(() => {
	propertyStore.fetchProperties();
});

const properties = computed(() => propertyStore.properties);
</script>

<style scoped>
td img {
	border-radius: 50px;
}
</style>
