<template>
	<div class="testimonial-slider__container">
		<swiper
			:slides-per-view="3"
			space-between="24"
			loop
			:navigation="{
				nextEl: '.custom-buttons__next',
				prevEl: '.custom-buttons__prev',
			}"
			:modules="[Navigation]"
		>
			<swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
				<div class="testimonial-card">
					<p class="testimonial-slider__message">{{ testimonial.message }}</p>
					<p class="testimonial-slider__author">- {{ testimonial.author }}</p>
				</div>
			</swiper-slide>
		</swiper>
	</div>

	<div class="custom-buttons">
		<div class="custom-buttons__prev">
			<svg
				id="Layer_2"
				height="512"
				viewBox="0 0 24 24"
				width="512"
				xmlns="http://www.w3.org/2000/svg"
				data-name="Layer 2"
			>
				<path
					d="m22 11h-17.586l5.293-5.293a1 1 0 1 0 -1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414l-5.293-5.293h17.586a1 1 0 0 0 0-2z"
				/>
			</svg>
		</div>
		<div class="custom-buttons__next">
			<svg
				id="Layer_2"
				height="512"
				viewBox="0 0 24 24"
				width="512"
				xmlns="http://www.w3.org/2000/svg"
				data-name="Layer 2"
			>
				<path
					d="m22.707 11.293-7-7a1 1 0 0 0 -1.414 1.414l5.293 5.293h-17.586a1 1 0 0 0 0 2h17.586l-5.293 5.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z"
				/>
			</svg>
		</div>
	</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

// Example testimonials data
const testimonials = [
	{
		message: `"Our renovation experience with Southwest Sanctuary Homes was seamless and stress-free. The team was incredibly responsive and the final result was exactly what we wanted."`,
		author: 'Emily R.',
	},
	{
		message: `"The virtual consultation was so convenient. The designers were knowledgeable and made great suggestions that we hadn't considered."`,
		author: 'Sarah K.',
	},
	{
		message: `"Our renovation experience with Southwest Sanctuary Homes was seamless and stress-free. The team was incredibly responsive and the final result was exactly what we wanted."`,
		author: 'Michael B.',
	},
	{
		message: `Working with Southwest Sanctuary Homes was a dream come true. Their attention to detail and commitment to quality made our renovation exceed our expectations. We couldn't be happier with the outcome!`,
		author: 'Jane R.',
	},
	{
		message: `Southwest Sanctuary Homes transformed our outdated house into a modern, stylish home. Their design ideas were innovative, and the team executed everything flawlessly. Highly recommend!`,
		author: 'James R.',
	},
	{
		message: `"From start to finish, the process was smooth and transparent. Southwest Sanctuary Homes delivered exceptional results, and our home now looks better than we ever imagined!"`,
		author: 'Emma L.',
	},
];
</script>

<style scoped>
.testimonial-slider__container {
	margin: 50px 0;
}

.testimonial-slider__message {
	font-size: 18px;
	line-height: 27px;
	text-align: center;
	color: var(--text-color-dark);
}

.testimonial-slider__author {
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	color: var(--text-color-dark);
}

.custom-buttons {
	width: 25%;
	margin: auto;
	display: flex;
	justify-content: space-around;
}

.custom-buttons__next,
.custom-buttons__prev {
	background-color: var(--accent-color);
	color: #fff;
	padding: 10px;
	border-radius: 50%;
	cursor: pointer;
	margin: 10px;
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	transition: background-color 0.3s ease;
}

.custom-buttons__next svg,
.custom-buttons__prev svg {
	width: 20px;
	height: 20px;
	fill: var(--text-color-dark); /* Uses the button's text color for the SVG */
}
</style>
