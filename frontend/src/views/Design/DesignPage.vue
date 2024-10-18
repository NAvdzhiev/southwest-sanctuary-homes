<template>
	<section class="design__intro-section">
		<ContentContainer imageSrc="living-room.jpg">
			<h2>Let <span>your vision</span><br />Inspire <span>our design</span></h2>
			<p class="regular">
				At Southwest Sanctuary Homes, we believe that your home should be a true
				reflection of your unique style and personality. Our design and
				renovation services are tailored to bring your vision to life, combining
				your ideas with our expertise to create spaces that are both beautiful
				and functional. Whether you're looking to refresh a single room or
				undertake a complete home makeover, our team of skilled designers and
				craftsman are dedicated to transforming your dreams into reality. Let us
				help you craft a home that inspires and delights every day.
			</p>
			<AppButton text="DISCOVER YOUR STYLE" to="/step-1" />
		</ContentContainer>
	</section>
	<section class="design__process-steps">
		<h1>Your Journey <br />to Perfect Design</h1>
		<div class="design__process-steps--row">
			<ContentContainer imageSrc="concept.svg" reverse>
				<h4>Conception</h4>
				<p class="small">
					Transform your ideas into reality with our expert design team. We'll
					work with you to develop a clear and inspiring vision for your space,
					ensuring every detail aligns with your personal style and needs.
				</p>
			</ContentContainer>
			<ContentContainer imageSrc="sofa.svg" reverse>
				<h4>Research</h4>
				<p class="small">
					Our research process involves analyzing the design trends, materials,
					and techniques to ensure your project is both innovative and
					functional. We gather all necessary information to create a design
					that stands the test of time.
				</p>
			</ContentContainer>
			<ContentContainer imageSrc="image.svg" reverse>
				<h4>Visualization</h4>
				<p class="small">
					See your project come to life before construction begins with our
					advanced visualization tools. We create detailed renderings and
					models, giving you a realistic preview of your transformed space.
				</p>
			</ContentContainer>
		</div>
		<div class="design__process-steps--row">
			<ContentContainer imageSrc="house.svg" reverse>
				<h4>Planning</h4>
				<p class="small">
					Effective planning is crucial for a successful renovation. Our team
					meticulously plans every aspect of your project, from timelines and
					budgets to materials and logistics, ensuring a smooth and efficient
					process from start to finish.
				</p>
			</ContentContainer>
			<ContentContainer imageSrc="hammer-tool.svg" reverse>
				<h4>Construction</h4>
				<p class="small">
					Our skilled craftsmen and construction experts bring your vision to
					life with precision and care. We focus on quality workmanship,
					attention to detail, and adherence to timelines, delivering results
					that exceed your expectations.
				</p>
			</ContentContainer>
			<ContentContainer imageSrc="checked.svg" reverse>
				<h4>Coordination</h4>
				<p class="small">
					Seamless coordination is key to a stress-free renovation. We manage
					all aspects of the project, coordinating between designers,
					contractors, and suppliers to ensure everything runs smoothly and
					stays on track.
				</p>
			</ContentContainer>
		</div>
	</section>
	<section class="design__slider-section">
		<h1>Our Portfolio</h1>
		<AppSlider :image-urls="imageUrlsFirstRow" :slides-per-view="6" />
		<AppSlider :image-urls="imageUrlsSecondRow" :slides-per-view="6" />
	</section>
	<section class="design__virtual-design-section">
		<ContentContainer imageSrc="online-consultation.jpg" reverse>
			<h2>Online <span>Consultation</span></h2>
			<p class="regular">
				Experience the convenience and flexibility of our virtual design
				consultations. Our expert designers are available to collaborate with
				you through video calls, providing personalized advice and detailed
				plans to bring your vision to life. Whether you're at home or on the go,
				our virtual consultations ensure you get the professional guidance you
				need without the need for in-person meetings. Schedule your virtual
				consultation today and start transforming your space with ease.
			</p>
			<AppButton text="START NOW" to="/step-1" />
		</ContentContainer>
	</section>
	<section class="design__inperson-design-section">
		<ContentContainer imageSrc="inperson-consultation.jpeg">
			<h2>In-Person <span>Consultation</span></h2>
			<p class="regular">
				For those who prefer a personal touch, our in-person design
				consultations offer a hands-on approach to transforming your space. Meet
				with our skilled designers in the comfort of your home or at our design
				centers. We'll discuss your ideas, take measurements, and provide
				tailored recommendations to suit your unique style and needs. Experience
				the benefits of direct interaction and immediate feedback by scheduling
				your in-person consultation today.
			</p>
			<AppButton text="START NOW" to="/step-1" />
		</ContentContainer>
	</section>
	<section class="design__testimonial-section">
		<h1>
			Love notes from <br />
			<span>our clients</span>
		</h1>
		<TestimonialSection />
	</section>
</template>
<script setup>
import ContentContainer from '@/components/ui/ContentContainer.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppSlider from '@/components/ui/AppSlider.vue';
import TestimonialSection from '@/components/design/TestimonialSection.vue';

const imageUrlsFirstRow = [
	require('@/assets/images/kitchen/kitchen-02.webp'),
	require('@/assets/images/living-room/living-room-09.jpeg'),
	require('@/assets/images/kitchen/kitchen-08.webp'),
	require('@/assets/images/living-room/living-room-01.png'),
	require('@/assets/images/kitchen/kitchen-03.webp'),
	require('@/assets/images/living-room/living-room-05.jpeg'),
	require('@/assets/images/kitchen/kitchen-02.webp'),
	require('@/assets/images/living-room/living-room-09.jpeg'),
	require('@/assets/images/kitchen/kitchen-08.webp'),
	require('@/assets/images/living-room/living-room-01.png'),
	require('@/assets/images/kitchen/kitchen-03.webp'),
	require('@/assets/images/living-room/living-room-05.jpeg'),
];

const imageUrlsSecondRow = [
	require('@/assets/images/kitchen/kitchen-07.webp'),
	require('@/assets/images/living-room/living-room-08.jpeg'),
	require('@/assets/images/kitchen/kitchen-10.webp'),
	require('@/assets/images/living-room/living-room-04.jpeg'),
	require('@/assets/images/kitchen/kitchen-12.webp'),
	require('@/assets/images/living-room/living-room-02.jpeg'),
	require('@/assets/images/kitchen/kitchen-07.webp'),
	require('@/assets/images/living-room/living-room-08.jpeg'),
	require('@/assets/images/kitchen/kitchen-10.webp'),
	require('@/assets/images/living-room/living-room-04.jpeg'),
	require('@/assets/images/kitchen/kitchen-12.webp'),
	require('@/assets/images/living-room/living-room-02.jpeg'),
];
</script>

<style scoped>
.design__intro-section .content-container {
	gap: 150px;
}

.design__intro-section >>> .content-image,
.design__inperson-design-section >>> .content-image {
	width: 420px;
	height: 530px;
}

.design__process-steps h1 {
	text-align: center;
	font-size: 48px;
	font-weight: 500;
}

.design__process-steps--row {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px;
}

.design__process-steps--row .content-container {
	gap: 50px;
	margin-bottom: 50px;
}

.design__process-steps--row:nth-of-type(2) .content-container {
	margin-bottom: 150px;
}

.design__process-steps--row >>> .content-image {
	width: 120px;
}

.design__process-steps--row h4 {
	text-transform: uppercase;
}

.design__slider-section {
	margin-bottom: 150px;
}

.design__slider-section h1 {
	font-size: 48px;
	text-align: center;
	font-weight: 500;
}

.design__virtual-design-section >>> .content-image {
	width: 478px;
	height: 535px;
}

.design__virtual-design-section .content-container,
.design__inperson-design-section .content-container {
	gap: 150px;
}

.design__testimonial-section {
	background-color: var(--container-color);
	padding: 30px;
	border-radius: 24px;
}

.design__testimonial-section h1 {
	font-size: 48px;
	text-align: center;
	font-weight: 500;
}

.design__testimonial-section h1 > span {
	color: var(--accent-color);
}
</style>
