<template>
	<HeroSection />
	<section class="home__intro-section">
		<ContentContainer imageSrc="welcome-section.jpg">
			<h2>Your <span>Dreams</span></h2>
			<h2>Our <span>Expertise</span></h2>
			<p>
				Welcome to Southwest Sanctuary Homes, where your dreams of finding the
				perfect home come to life through our unparalleled expertise. Nestled in
				the heart of the Southwest, our dedicated team specializes in real
				estate and interior design, blending modern comfort with the timeless
				beauty of the desert. We understand that a home is more than just a
				place to live; it's a sanctuary that reflects your style and
				aspirations. From discovering stunning properties to crafting bespoke
				interiors, we are committed to guiding you every step of the way. Trust
				us to transform your vision into reality and create a space where you
				can truly thrive.
			</p>
			<AppButton text="Learn More!" to="/" />
		</ContentContainer>
	</section>

	<section class="home__property-list">
		<h1>New Listings</h1>
		<PropertyCardContainer>
			<PropertyCard
				v-for="property in properties"
				:key="property._id"
				:id="property._id"
				:title="property.title"
				:imageUrl="setTitleImage(property.images)"
				:bedrooms="property.bedrooms"
				:bathrooms="property.bathrooms"
				:footage="property.footage"
				:price="property.price"
			/>
		</PropertyCardContainer>
		<AppButton text="Check Out More!" to="/properties" />
	</section>

	<section class="home__design-section">
		<ContentContainer
			buttonText="Take our style quiz"
			buttonLink="/quiz"
			imageSrc="design-intro-section-01.jpg"
			reverse
		>
			<h2>Let <span>your vision</span></h2>
			<h2>Inspire <span>our design</span></h2>
			<p>
				At Southwest Sanctuary Homes, we believe your home should reflect your
				unique style. Our expert interior design team is dedicated to
				transforming your vision into reality, whether it's a cozy desert
				retreat or a modern adobe masterpiece. With a deep understanding of
				Southwest aesthetics, we ensure every detail is tailored to your taste,
				from selecting color palettes to curating bespoke furniture. Let your
				vision inspire our design, and together we'll create a home that is
				truly your sanctuary. Explore our design services to see how we can make
				your dream home a reality.
			</p>
			<AppButton text="Take our style quiz!" to="/quiz" />
		</ContentContainer>
	</section>
	<section class="home__design-section">
		<AppSlider />
		<AppSlider />
	</section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';
import HeroSection from '@/components/ui/HeroSection.vue';
import ContentContainer from '@/components/ui/ContentContainer.vue';
import PropertyCardContainer from '@/components/ui/PropertyCardContainer.vue';
import PropertyCard from '@/components/ui/PropertyCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppSlider from '@/components/ui/AppSlider.vue';

const propertyStore = usePropertyStore();

onMounted(async () => {
	await propertyStore.fetchProperties();
});

const properties = computed(() => propertyStore.properties);

function setTitleImage(images) {
	const reversedImages = [...images].reverse();
	return reversedImages[0];
}
</script>

<style scoped>
.home__intro-section {
	margin-top: 300px;
}

.home__intro-section .content-container {
	gap: 150px;
}

.home__intro-section >>> .content-image {
	width: 420px;
	height: 530px;
}

.property-list {
	text-align: center;
	margin-top: 50px;
}

.property-list h1 {
	font-size: 48px;
	font-weight: 500;
}

.property-list a {
	margin-top: 50px;
}

.home__design-section {
	margin-top: 150px;
}

.home__design-section .content-container {
	gap: 150px;
}

.home__design-section >>> .content-image {
	width: 420px;
	height: 530px;
}
</style>
