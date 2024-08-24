<template>
	<section class="single-property-container">
		<ThumbsSlider :images="propertyStore.property.images" />
		<article class="single-property-info">
			<h1>{{ propertyStore.property.title }}</h1>
			<div class="property-details">
				<div class="property-bedrooms">
					<i class="fa-solid fa-bed"></i>
					{{ propertyStore.property.bedrooms }} bds
				</div>
				<div>
					<i class="fa-solid fa-bath"></i>
					{{ propertyStore.property.bathrooms }} bth
				</div>
				<div>
					<i class="fa-solid fa-house"></i>
					{{ propertyStore.property.footage }} sqft
				</div>
			</div>
			<p>{{ propertyStore.property.description }}</p>
			<h2>
				<i class="fa-solid fa-dollar-sign"></i>
				{{ propertyStore.property.price }}
			</h2>
			<div class="property-actions">
				<AppButton text="Book a Tour" />
				<AppButton text="Send an Offer" />
			</div>
		</article>
	</section>
</template>

<script setup>
import ThumbsSlider from '@/components/ui/ThumbsSlider.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePropertyStore } from '@/store/propertyStore';

const route = useRoute();
const propertyStore = usePropertyStore();

onMounted(() => {
	const propertyId = route.params.id;
	propertyStore.fetchProperty(propertyId);
});
</script>

mapbox://styles/mapbox/light-v11

<style scoped>
.single-property-container {
	background-color: var(--container-color);
	border-radius: 24px;
	padding: 30px;
}

.single-property-info {
	max-width: 65%;
	margin: 100px auto 20px;
	text-align: center;
}

.single-property-info h1 {
	font-size: 32px;
	font-weight: 500;
}

.single-property-info h2 {
	font-size: 32px;
	font-weight: 400;
}

.single-property-info p {
	white-space: break-spaces;
	font-size: 14px;
	font-weight: 400;
}

.single-property-info i {
	color: var(--accent-color);
}

.property-details {
	display: inline-flex;
	gap: 30px;
	margin-bottom: 50px;
	font-size: 14px;
}

.property-details i {
	font-size: 28px;
}

.property-actions button {
	text-transform: uppercase;
	font-weight: 500;
	margin: 20px 30px;
}
</style>
