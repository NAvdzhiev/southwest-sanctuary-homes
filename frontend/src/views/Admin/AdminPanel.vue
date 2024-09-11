<template>
	<section class="admin-panel">
		<header class="admin-panel__header">
			<div class="admin-panel__user-details">
				<i class="fa fa-solid fa-user"></i>
				<h3>
					{{ user.firstName }} {{ user.lastName }} -
					<span>{{ user.role }}</span>
				</h3>
			</div>
			<nav class="admin-panel__tabs">
				<router-link class="admin-panel__tab" to="/dashboard/property-tab">
					Properties
				</router-link>
				<router-link
					v-if="isAdmin"
					class="admin-panel__tab"
					to="/dashboard/user-tab"
				>
					Users
				</router-link>
			</nav>
		</header>
		<div class="admin-panel__content">
			<router-view></router-view>
		</div>
	</section>
</template>

<script setup>
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const user = userStore.userProfile;
const isAdmin = userStore.isAdmin;
</script>

<style scoped>
.admin-panel__header {
	background-color: var(--container-color);
	padding: 30px;
	border-radius: 24px;
	color: var(--footer-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.admin-panel__header i {
	font-size: 65px;
}

.admin-panel__user-details,
.admin-panel__tabs {
	display: flex;
	gap: 20px;
}

.admin-panel__tabs a {
	background-color: var(--footer-color);
	border: 2px solid var(--footer-color);
	color: #fff;
	font-size: 14px;
	font-weight: 400;
	padding: 15px 25px;
	border-radius: 12px;
	text-decoration: none;
}

.admin-panel__tabs a.router-link-active {
	background-color: transparent;
	color: var(--footer-color);
	border: 2px solid var(--footer-color);
}
</style>
