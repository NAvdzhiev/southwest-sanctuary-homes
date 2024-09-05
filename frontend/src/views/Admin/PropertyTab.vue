<template>
	<div class="table-container">
		<h1>Property List</h1>
		<div class="table-container__actions">
			<SortButton />
			<AppFilter />
		</div>
		<table>
			<thead>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th>Address</th>
				<th>Location</th>
				<th>Footage</th>
				<th>Bedrooms</th>
				<th>Bathrooms</th>
				<th>Status</th>
				<th>Date Added</th>
				<th>Agent</th>
				<th>Offers</th>
				<th v-if="isAdmin">Edit</th>
				<th v-if="isAdmin">Delete</th>
			</thead>
			<tbody>
				<tr v-for="property in properties" :key="property._id">
					<td>
						<img
							:src="setTitleImage(property.images)"
							:alt="property.title"
							width="65"
							height="65"
						/>
					</td>
					<td>{{ property.title }}</td>
					<td>
						{{ formatPrice(property.price) }}
					</td>
					<td>{{ property.address }}</td>
					<td>{{ property.city }} {{ property.state }}</td>
					<td>{{ property.footage }} sqft</td>
					<td>{{ property.bedrooms }} bds</td>
					<td>{{ property.bathrooms }} bts</td>
					<td>{{ property.status }}</td>
					<td>{{ formatDate(property.createdAt) }}</td>
					<td v-if="property.agent">
						{{ property.agent.firstName }} {{ property.agent.lastName }}
					</td>
					<td>{{ property.offers.length }}</td>
					<td v-if="isAdmin"><i class="fa fa-solid fa-pencil"></i></td>
					<td v-if="isAdmin" @click="handleDelete(property._id)">
						<i class="fa fa-solid fa-trash"></i>
					</td>
				</tr>
			</tbody>
		</table>
		<AppPagination />
	</div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';
import { useUserStore } from '@/store/userStore';
import SortButton from '@/components/ui/SortButton.vue';
import AppFilter from '@/components/ui/AppFilter.vue';
import AppPagination from '@/components/ui/AppPagination.vue';
const propertyStore = usePropertyStore();
const userStore = useUserStore();

const isAdmin = userStore.isAdmin;

onMounted(() => {
	propertyStore.fetchProperties();
});

const properties = computed(() => propertyStore.properties);

function formatPrice(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${day}-${month}-${year}`;
}

function setTitleImage(images) {
	const reversedImages = [...images].reverse();
	return reversedImages[0];
}

function handleDelete(id) {
	if (isAdmin) {
		propertyStore.deleteProperty(id);
	} else {
		alert('Not authorized!');
	}
}
</script>

<style scoped>
.table-container {
	background-color: var(--container-color);
	border-radius: 24px;
	padding: 30px 20px;
	margin-top: 30px;
}

.table-container__actions {
	display: flex;
	justify-content: space-between;
	align-items: center;
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
