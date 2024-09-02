<template>
	<div class="table-container">
		<h1>Property Tab</h1>
		<table>
			<thead>
				<th>Image</th>
				<th>Name</th>
				<th>Address</th>
				<th>Location</th>
				<th>Footage</th>
				<th>Bedrooms</th>
				<th>Bathrooms</th>
				<th>Status</th>
				<th>Date Added</th>
				<th>Agent</th>
				<th>Offers</th>
				<th>Edit</th>
				<th>Delete</th>
			</thead>
			<tbody>
				<tr v-for="property in properties" :key="property._id">
					<td>
						<img
							:src="property.images[3]"
							:alt="property - title"
							width="65"
							height="65"
						/>
					</td>
					<td>{{ property.title }}</td>
					<td>{{ property.address }}</td>
					<td>{{ property.city }} {{ property.state }}</td>
					<td>{{ property.footage }} sqft</td>
					<td>{{ property.bedrooms }} bds</td>
					<td>{{ property.bathrooms }} bts</td>
					<td>{{ property.status }}</td>
					<td>{{ property.createdAt }}</td>
					<td>{{ property.agent }}</td>
					<td>{{ property.offers.length }}</td>
					<td><i class="fa fa-solid fa-pencil"></i></td>
					<td><i class="fa fa-solid fa-trash"></i></td>
				</tr>
			</tbody>
		</table>
	</div>
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
.table-container {
	background-color: var(--container-color);
	border-radius: 24px;
	padding: 30px 20px;
	margin-top: 30px;
}

table {
	border-collapse: collapse;
	width: 100%;
}

th {
	text-align: left;
	font-size: 14px;
	font-weight: 500;
	border-bottom: 2px solid var(--footer-color);
	padding: 10px;
}

td {
	font-size: 12px;
	border-bottom: 1px solid rgba(171, 167, 167, 0.5);
	padding: 20px 10px;
}

td img {
	border-radius: 50px;
}
</style>
