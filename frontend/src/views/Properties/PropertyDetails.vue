<template>
	<div v-if="loading">
		<h1>Loading property...</h1>
	</div>
	<section v-else-if="property" class="single-property-container">
		<ThumbsSlider :images="formatImages(property.images)" />
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
				<AppButton text="Book a Tour" @click="() => openDialog('booking')" />
				<AppButton text="Send an Offer" @click="() => openDialog('offer')" />
			</div>
		</article>

		<DialogWindow ref="dialogRef" :open="isDialogOpen" @close="closeDialog">
			<template v-if="activeForm === 'booking'">
				<BookingForm />
			</template>
			<template v-else-if="activeForm === 'offer'">
				<OfferForm />
			</template>
		</DialogWindow>
	</section>

	<div v-else>
		<p>Property not found or error fetching details.</p>
	</div>
</template>

<script setup>
import { onMounted, computed, ref, nextTick } from 'vue';
import { usePropertyStore } from '@/store/propertyStore';
import ThumbsSlider from '@/components/ui/ThumbsSlider.vue';
import AppButton from '@/components/ui/AppButton.vue';
import DialogWindow from '@/components/layouts/DialogWindow.vue';
import BookingForm from '@/components/property/BookingForm.vue';
import OfferForm from '@/components/property/OfferForm.vue';
import { useRoute } from 'vue-router';

const isDialogOpen = ref(false);
const activeForm = ref(null);

const propertyStore = usePropertyStore();
const route = useRoute();

onMounted(async () => {
	const propertyId = route.params.id;
	await propertyStore.fetchProperty(propertyId);
});

const property = computed(() => propertyStore.property);
const loading = computed(() => propertyStore.loading);

const openDialog = async (formType) => {
	console.log(`Opening ${formType} Dialog`);
	activeForm.value = formType; // Set the form to be displayed ('booking' or 'offer')
	await nextTick(); // Ensure the state is updated before showing the dialog
	isDialogOpen.value = true; // Open the dialog
};

const closeDialog = () => {
	isDialogOpen.value = false;
	activeForm.value = null; // Reset the form after closing the dialog
};

function formatPrice(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatImages(images) {
	const reversedImages = [...images].reverse();
	return reversedImages;
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
