<template>
	<div class="testimonials-slider">
		<button class="nav-button prev" @click="prevSlide">&lt;</button>

		<div class="slides-container" ref="slidesContainer">
			<div
				class="slides"
				:style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
			>
				<div
					class="slide"
					v-for="(testimonial, index) in testimonials"
					:key="index"
					:style="{ minWidth: `${slideWidth}px` }"
				>
					<div class="testimonial">
						<p class="testimonial-text">{{ testimonial.text }}</p>
						<h3 class="testimonial-author">{{ testimonial.author }}</h3>
					</div>
				</div>
			</div>
		</div>

		<button class="nav-button next" @click="nextSlide">&gt;</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const testimonials = ref([
	{ text: 'This is the best service I have ever used!', author: 'John Doe' },
	{ text: 'Amazing experience, highly recommend!', author: 'Jane Smith' },
	{ text: 'I will definitely use this service again!', author: 'Bob Johnson' },
	{
		text: 'Exceptional quality and great customer service!',
		author: 'Emily Davis',
	},
	{ text: 'Absolutely fantastic!', author: 'Mike Wilson' },
	{ text: 'I had a wonderful time!', author: 'Sara Smith' },
]);

const currentSlide = ref(0);
const slideWidth = ref(0);
const slidesContainer = ref(null);

onMounted(() => {
	updateSlideWidth();
	window.addEventListener('resize', updateSlideWidth);
});

const updateSlideWidth = () => {
	if (slidesContainer.value) {
		slideWidth.value = slidesContainer.value.clientWidth / 3; // Divide by 3 to show 3 slides
	}
};

const nextSlide = () => {
	currentSlide.value = (currentSlide.value + 1) % testimonials.value.length;
};

const prevSlide = () => {
	currentSlide.value =
		(currentSlide.value - 1 + testimonials.value.length) %
		testimonials.value.length;
};

onUnmounted(() => {
	window.removeEventListener('resize', updateSlideWidth);
});
</script>

<style scoped>
.testimonials-slider {
	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;
	width: 100%;
}

.slides-container {
	width: 100%;
	overflow: hidden;
}

.slides {
	display: flex;
	transition: transform 0.5s ease;
}

.slide {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
}

.testimonial {
	padding: 20px;
	background: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	text-align: center;
}

.testimonial-text {
	font-size: 16px;
	margin-bottom: 10px;
}

.testimonial-author {
	font-size: 14px;
	font-weight: bold;
	text-align: right;
}

.nav-button {
	background: transparent;
	border: none;
	font-size: 24px;
	cursor: pointer;
	z-index: 1;
}

.prev {
	position: absolute;
	left: 10px;
}

.next {
	position: absolute;
	right: 10px;
}
</style>
