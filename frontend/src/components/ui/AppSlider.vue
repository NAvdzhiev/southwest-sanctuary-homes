<template>
	<swiper
		:slides-per-view="4"
		space-between="24"
		loop
		:speed="5000"
		:autoplay="autoplayConfig"
		:modules="[Autoplay]"
	>
		<swiper-slide
			v-for="(image, index) in imageUrls"
			:key="index"
			@click="openFullscreen(image)"
		>
			<img :src="image" :alt="'Image ' + (index + 1)" />
		</swiper-slide>
	</swiper>

	<!-- Fullscreen Modal -->
	<div
		v-if="fullscreenVisible"
		class="fullscreen-dialog"
		@click="closeFullscreen"
	>
		<img :src="fullscreenImage" alt="Fullscreen Image" />
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import { ref } from 'vue';

// Example image names (you can replace these with your actual image names)
const imageNames = [
	'listing-01.jpg',
	'listing-02.jpg',
	'listing-03.jpg',
	'listing-04.jpg',
	'listing-01.jpg',
	'listing-02.jpg',
	'listing-03.jpg',
	'listing-04.jpg',
	// Add more images here
];

// Use require or new URL to dynamically load images
const imageUrls = imageNames.map((name) => require(`@/assets/images/${name}`));

// Alternatively, with Vite and ES modules:
// const imageUrls = imageNames.map(name => new URL(`@/assets/images/${name}`, import.meta.url).href);

const fullscreenVisible = ref(false);
const fullscreenImage = ref('');

const autoplayConfig = {
	enabled: true,
	delay: 0,
	pauseOnMouseEnter: false,
	disableOnInteraction: true,
};

const openFullscreen = (image) => {
	fullscreenImage.value = image;
	fullscreenVisible.value = true;
};

const closeFullscreen = () => {
	fullscreenVisible.value = false;
};
</script>

<style scoped>
.swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 50px;
}

.swiper-slide img {
	width: 100%;
	height: auto;
	border-radius: 12px;
}

.fullscreen-dialog {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.8);
	cursor: pointer;
	z-index: 100;
}

.fullscreen-dialog img {
	max-width: 90%;
	max-height: 90%;
	border-radius: 12px;
}
</style>
