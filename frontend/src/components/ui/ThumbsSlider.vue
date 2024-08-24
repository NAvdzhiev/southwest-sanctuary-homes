<template>
	<swiper
		:style="{
			'--swiper-navigation-color': '#fff',
			'--swiper-pagination-color': '#fff',
		}"
		:spaceBetween="20"
		:navigation="false"
		:thumbs="{ swiper: thumbsSwiper }"
		:modules="[FreeMode, Thumbs]"
		class="mySwiper2"
	>
		<swiper-slide v-for="(image, index) in images" :key="index">
			<img
				:src="image"
				:alt="'Property Image ' + index"
				class="swiper-main-image"
			/>
		</swiper-slide>
	</swiper>
	<swiper
		@swiper="setThumbsSwiper"
		:spaceBetween="10"
		:slidesPerView="4"
		:freeMode="true"
		:modules="[FreeMode, Thumbs]"
		class="mySwiper"
	>
		<swiper-slide v-for="(image, index) in images" :key="'thumb-' + index">
			<img
				:src="image"
				:alt="'Thumbnail ' + index"
				class="swiper-thumbnail-image"
			/>
		</swiper-slide>
	</swiper>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// Directly destructuring the 'images' prop from defineProps
const props = defineProps({
	images: {
		type: Array,
		required: true,
	},
});

const { images } = toRefs(props);

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
	thumbsSwiper.value = swiper;
};
</script>

<style scoped>
.main-swiper {
	width: 100%;
	height: 400px;
}

.swiper-main-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 12px;
	height: 600px;
}

.thumbs-swiper {
	width: 100%;
	height: 100px;
	margin-top: 10px;
}

.swiper-thumbnail-image {
	width: 100%;
	height: 220px;
	object-fit: cover;
	cursor: pointer;
	opacity: 0.7;
	border-radius: 12px;
}

.swiper-slide-thumb-active .swiper-thumbnail-image {
	opacity: 1;
	border: 2px solid #007bff; /* Highlight active thumbnail */
}
</style>
