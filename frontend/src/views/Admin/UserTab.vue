<template>
	<div class="table-container">
		<h1>User Tab</h1>
		<table>
			<thead>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email</th>
				<th>Phone Number</th>
				<th>Properties</th>
				<th>Role</th>
				<th>Edit</th>
				<th>Delete</th>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user._id">
					<td>
						{{ user.firstName }}
					</td>
					<td>{{ user.lastName }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.phone }}</td>
					<td>{{ user.properties.length }}</td>
					<td>{{ user.role }}</td>
					<td><i class="fa fa-solid fa-pencil"></i></td>
					<td><i class="fa fa-solid fa-trash"></i></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

onMounted(() => {
	userStore.fetchUsers();
});

const users = computed(() => userStore.users);
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
