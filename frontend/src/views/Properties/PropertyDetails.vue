<template>
	<div v-if="loading">
		<h1>Loading property...</h1>
	</div>
	<section v-else-if="property" class="single-property-container">
		<ThumbsSlider :images="property.images" />
		<article class="single-property-info">
			<h1>{{ property.title }}</h1>
			<div class="property-details">
				<div class="property-bedrooms">
					<i class="fa-solid fa-bed"></i>
					{{ property.bedrooms }} bds
				</div>
				<div>
					<i class="fa-solid fa-bath"></i>
					{{ property.bathrooms }} bth
				</div>
				<div>
					<i class="fa-solid fa-house"></i>
					{{ property.footage }} sqft
				</div>
			</div>
			<p>{{ property.description }}</p>
			<h2>
				<i class="fa-solid fa-dollar-sign"></i>
				{{ formatPrice(property.price) }}
			</h2>
			<div class="property-actions">
				<AppButton text="Book a Tour" />
				<AppButton text="Send an Offer" />
			</div>
		</article>
	</section>
	<div v-else>
		<p>Property not found or error fetching details.</p>
	</div>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';
import ThumbsSlider from '@/components/ui/ThumbsSlider.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useRoute } from 'vue-router';

const propertyStore = usePropertyStore();
const route = useRoute();

onBeforeMount(async () => {
	const propertyId = route.params.id;
	await propertyStore.fetchProperty(propertyId);
});

const property = computed(() => propertyStore.property);
const loading = computed(() => propertyStore.loading);

function formatPrice(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
</script>

mapbox://styles/mapbox/light-v11

<style scoped>
.single-property-container {
	background-color: var(--container-color);
	border-radius: 24px;
	padding: 30px;
	max-width: 65%;
	margin: auto;
}

.single-property-info {
	max-width: 80%;
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
