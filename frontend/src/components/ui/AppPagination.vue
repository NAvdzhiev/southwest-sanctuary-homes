<template>
	<div class="pagination-container">
		<button
			:disabled="currentPage === 1"
			@click="goToPreviousPage"
			aria-label="Previous"
		>
			<i class="fa-solid fa-arrow-left"></i>
		</button>
		<span
			v-for="page in pages"
			:key="page"
			:class="{ active: page === currentPage }"
			@click="goToPage(page)"
		>
			{{ page }}
		</span>
		<button
			:disabled="currentPage === totalPages"
			@click="goToNextPage"
			aria-label="Next"
		>
			<i class="fa-solid fa-arrow-right"></i>
		</button>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';

const propertyStore = usePropertyStore();
const currentPage = computed(() => propertyStore.currentPage);
const totalPages = computed(() =>
	Math.ceil(propertyStore.totalProperties / 16),
);

const pages = computed(() => {
	const pageArray = [];
	const total = totalPages.value;

	let startPage = Math.max(1, currentPage.value - 2);
	let endPage = Math.min(total, currentPage.value + 2);

	if (currentPage.value <= 3) {
		endPage = Math.min(5, total);
	}
	if (currentPage.value >= total - 2) {
		startPage = Math.max(total - 4, 1);
	}

	for (let i = startPage; i <= endPage; i++) {
		pageArray.push(i);
	}

	return pageArray;
});

const goToPreviousPage = () => {
	if (currentPage.value > 1) {
		propertyStore.setPage(currentPage.value - 1);
	}
};

const goToNextPage = () => {
	if (currentPage.value < totalPages.value) {
		propertyStore.setPage(currentPage.value + 1);
	}
};

const goToPage = (page) => {
	propertyStore.setPage(page);
};
</script>

<style scoped>
.pagination-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	margin-top: 20px;
}

.pagination-container button {
	border: none;
	width: 35px;
	height: 35px;
	background-color: var(--accent-color);
	border-radius: 50%;
	font-size: 14px;
	cursor: pointer;
}

.pagination-container button:disabled {
	color: grey;
	cursor: not-allowed;
}

.pagination-container span {
	color: var(--text-color-dark);
	opacity: 0.5;
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
	padding: 5px 10px;
}

.pagination-container span.active {
	font-weight: bold;
	text-decoration: underline;
	color: var(--text-color-dark);
	opacity: 1;
}
</style>
