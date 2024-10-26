<template>
	<div class="space-selection">
		<h2>Select Spaces to Renovate</h2>
		<div class="space-grid">
			<div
				v-for="space in availableSpaces"
				:key="space.name"
				class="space-item"
				@click="selectSpace(space)"
			>
				<img :src="space.image" :alt="space.name" />
				<p>{{ space.name }}</p>
				<div class="counter" v-if="selectedSpaces[space.name]">
					<button @click="decrementCount(space.name)">-</button>
					<span>{{ selectedSpaces[space.name] }}</span>
					<button @click="incrementCount(space.name)">+</button>
				</div>
				<button
					v-if="!selectedSpaces[space.name]"
					@click="initializeCount(space.name)"
				>
					Select
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const availableSpaces = ref([
	{
		name: 'Kitchen',
		image: require('@/assets/images/kitchen/kitchen-01.webp'),
	},
	{
		name: 'Living Room',
		image: require('@/assets/images/living-room/living-room-01.png'),
	},
	{
		name: 'Kitchen',
		image: require('@/assets/images/kitchen/kitchen-01.webp'),
	},
	{
		name: 'Living Room',
		image: require('@/assets/images/living-room/living-room-01.png'),
	},
]);

const selectedSpaces = ref({});

const selectSpace = (space) => {
	if (Object.keys(selectedSpaces.value).length < 10) {
		initializeCount(space.name);
	}
};

const initializeCount = (name) => {
	selectedSpaces.value[name] = 1;
};

const incrementCount = (name) => {
	if (selectedSpaces.value[name] < 10) {
		selectedSpaces.value[name]++;
	}
};

const decrementCount = (name) => {
	if (selectedSpaces.value[name] > 1) {
		selectedSpaces.value[name]--;
	} else {
		delete selectedSpaces.value[name];
	}
};
</script>

<style scoped>
.space-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
	gap: 20px;
}

.space-item {
	text-align: center;
	cursor: pointer;
}

.space-item img {
	width: 100%;
}

.counter {
	display: flex;
	justify-content: center;
	align-items: center;
}

.counter button {
	margin: 0 5px;
}
</style>
