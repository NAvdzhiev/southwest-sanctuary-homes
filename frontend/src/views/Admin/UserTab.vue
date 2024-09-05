<template>
	<div class="table-container">
		<header class="table-container__header">
			<h1>User List</h1>
			<router-link v-if="isAdmin" to="/register">
				<i class="fa-solid fa-circle-plus"></i>
			</router-link>
		</header>
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
					<td v-if="isAdmin"><i class="fa fa-solid fa-pencil"></i></td>
					<td v-if="isAdmin" @click="handleDelete(user._id)">
						<i class="fa fa-solid fa-trash"></i>
					</td>
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
const isAdmin = userStore.isAdmin;

function handleDelete(id) {
	if (isAdmin) {
		userStore.deleteUser(id);
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

.table-container__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.table-container__header i {
	font-size: 36px;
	color: var(--accent-color);
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
