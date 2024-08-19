<template>
	<section class="single-property-container">
		<article class="single-property-info">
			<h2>{{ propertyStore.property.title }}</h2>
			<p>{{ propertyStore.property.description }}</p>
			<p>$ {{ propertyStore.property.price }}</p>
		</article>
	</section>
	<section class="property-map"></section>
</template>

<script setup>
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
