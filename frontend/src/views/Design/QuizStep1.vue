<template>
	<section class="image-gallery">
		<div
			v-for="(image, index) in images"
			:key="index"
			class="image-tile"
			:class="{ selected: props.selectedImages.includes(image) }"
			@click="toggleSelection(image)"
		>
			<img :src="image" alt="Design Choice" />
			<div v-if="props.selectedImages.includes(image)" class="overlay">
				<span>Selected</span>
			</div>
		</div>
	</section>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Image array
const images = [
	require('@/assets/images/kitchen/kitchen-01.webp'),
	require('@/assets/images/living-room/living-room-01.png'),
	require('@/assets/images/kitchen/kitchen-02.webp'),
	require('@/assets/images/living-room/living-room-02.jpeg'),
];

// Define props and emits
const props = defineProps({
	selectedImages: Array,
});

const emit = defineEmits(['update:selected-images']);

const toggleSelection = (image) => {
	const updatedSelection = [...props.selectedImages];
	const index = updatedSelection.indexOf(image);

	if (index === -1) {
		updatedSelection.push(image);
	} else {
		updatedSelection.splice(index, 1);
	}

	emit('update:selected-images', updatedSelection);
};
</script>

<style scoped>
.image-gallery {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 20px;
}
.image-tile {
	position: relative;
	cursor: pointer;
	transition: transform 0.2s ease;
}
.image-tile img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.image-tile.selected {
	transform: scale(0.98);
}
.overlay {
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.2em;
	font-weight: bold;
}
</style>
