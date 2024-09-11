<template>
	<HeroSection />
	<ContentContainer
		heading="Your Dreams Our Expretise"
		text="Welcome to Southwest Sanctuary Homes, 
    where your dreams of finding the perfect home come to life through our unparalleled expertise. 
    Nestled in the heart of the Southwest, our dedicated team specializes in real estate and interior design, 
    blending modern comfort with the timeless beauty of the desert. 
    We understand that a home is more than just a place to live; 
    it's a sanctuary that reflects your style and aspirations. 
    From discovering stunning properties to crafting bespoke interiors, 
    we are committed to guiding you every step of the way. 
    Trust us to transform your vision into reality and create a space where you can truly thrive."
		buttonText="Learn More!"
		buttonLink="/"
		imageSrc="welcome-section.jpg"
	/>

	<section class="property-list">
		<h1>New Listings</h1>
		<PropertyCardContainer>
			<PropertyCard
				v-for="property in newProperties"
				:key="property.id"
				:id="property.id"
				:title="property.title"
				:imageSrc="property.imageSrc"
				:bedrooms="property.bedrooms"
				:bathrooms="property.bathrooms"
				:footage="property.footage"
				:price="property.price"
			/>
		</PropertyCardContainer>
		<AppButton text="Check Out More!" to="/properties" />
	</section>

	<ContentContainer
		heading="Let your vision Inspire our design"
		text="At Southwest Sanctuary Homes, we believe your home should reflect your unique style. 
    Our expert interior design team is dedicated to transforming your vision into reality, 
    whether it's a cozy desert retreat or a modern adobe masterpiece. 
    With a deep understanding of Southwest aesthetics, we ensure every detail is tailored to your taste, 
    from selecting color palettes to curating bespoke furniture. Let your vision inspire our design, 
    and together we'll create a home that is truly your sanctuary. 
    Explore our design services to see how we can make your dream home a reality."
		buttonText="Take our style quiz"
		buttonLink="/quiz"
		imageSrc="design-intro-section-01.jpg"
		reverse
	/>
	<AppSlider />
	<AppSlider />
</template>

<script setup>
import { ref } from 'vue';
import HeroSection from '@/components/ui/HeroSection.vue';
import ContentContainer from '@/components/ui/ContentContainer.vue';
import PropertyCardContainer from '@/components/ui/PropertyCardContainer.vue';
import PropertyCard from '@/components/ui/PropertyCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppSlider from '@/components/ui/AppSlider.vue';

const newProperties = ref([
	{
		id: '66d85381ac5f13190cc8f166',
		imageSrc: 'listing-01.jpg',
		title: 'Arizona Desert Sanctuary',
		bedrooms: 4,
		bathrooms: 2,
		footage: 3246,
		price: '1,250,000',
	},
	{
		id: '2',
		imageSrc: 'listing-02.jpg',
		title: 'New Mexico Desert Sanctuary',
		bedrooms: 4,
		bathrooms: 2,
		footage: 3246,
		price: '1,250,000',
	},
	{
		id: '3',
		imageSrc: 'listing-03.jpg',
		title: 'Mojave Desert Sanctuary',
		bedrooms: 4,
		bathrooms: 2,
		footage: 3246,
		price: '1,250,000',
	},
	{
		id: '4',
		imageSrc: 'listing-04.jpg',
		title: 'Nevada Desert Sanctuary',
		bedrooms: 4,
		bathrooms: 2,
		footage: 3246,
		price: '1,250,000',
	},
]);
</script>

<style scoped>
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
</style>
