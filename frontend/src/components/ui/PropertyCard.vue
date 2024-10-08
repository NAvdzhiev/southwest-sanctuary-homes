<template>
	<article class="property-card">
		<div class="property-card__imageContainer">
			<img class="property-card__image" :src="imageUrl" :alt="title" />
			<button class="property-card__whishlist" @click="toggleWishlist">
				<i
					:class="isInWishlist ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
				></i>
			</button>
		</div>
		<h3 class="property-card__title">{{ title }}</h3>
		<div class="property-card__info">
			<div class="property-card__icon">
				<i class="fa-solid fa-bed"></i>
				<h5>{{ bedrooms }} bds</h5>
			</div>
			<div class="property-card__icon">
				<i class="fa-solid fa-bath"></i>
				<h5>{{ bathrooms }} bth</h5>
			</div>
			<div class="property-card__icon">
				<i class="fa-solid fa-house"></i>
				<h5>{{ footage }} sqft</h5>
			</div>
		</div>
		<div class="property-card__tools">
			<div class="property-card__price">
				<i class="fa-solid fa-dollar-sign"></i>
				<h5>{{ formatPrice(price) }}</h5>
			</div>
			<router-link :to="`/properties/${id}`" class="property-card__navigation">
				<i class="fa-solid fa-arrow-right"></i>
			</router-link>
		</div>
	</article>
</template>

<script setup>
import { toRefs, computed } from 'vue';
import { useWishlistStore } from '@/store/wishlistStore';

const props = defineProps({
	imageUrl: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	bedrooms: {
		type: Number,
		required: true,
	},
	bathrooms: {
		type: Number,
		required: true,
	},
	footage: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
});

const wishlistStore = useWishlistStore();

const isInWishlist = computed(() => wishlistStore.isInWishlist(id));

function toggleWishlist() {
	if (isInWishlist.value) {
		wishlistStore.removeFromWishlist(id);
	} else {
		wishlistStore.addToWishlist({
			imageUrl,
			title,
			bedrooms,
			bathrooms,
			footage,
			price,
			id,
		});
	}
}

function formatPrice(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const { imageUrl, title, bedrooms, bathrooms, footage, price, id } =
	toRefs(props);
</script>

<style scoped>
.property-card {
	background-color: var(--container-color);
	border-radius: 24px;
	padding: 20px;
	width: auto;
	height: 520px;
}

.property-card__imageContainer {
	position: relative;
}

.property-card__image {
	width: 100%;
	height: 225px;
	border-radius: 12px;
}

.property-card__title {
	text-align: center;
	font-size: 24px;
	font-weight: 500;
}

.property-card__whishlist {
	background: var(--accent-color);
	text-align: center;
	border-radius: 50px;
	border: none;
	padding: 8px;
	position: absolute;
	right: 10px;
	top: 10px;
}

.property-card__whishlist i {
	font-size: 22px;
	position: relative;
	top: 1px;
	cursor: pointer;
}

.property-card__info {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	margin-top: 30px;
}

.property-card__icon {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;
}

.property-card__icon i {
	color: var(--accent-color);
	font-size: 28px;
}

.property-card__icon h5 {
	font-size: 11px;
	font-weight: 400;
}

.property-card__tools {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 30px;
}

.property-card__tools a {
	background: var(--accent-color);
	padding: 10px;
	width: 22px;
	height: 22px;
	text-align: center;
	border-radius: 50px;
}

.property-card__price {
	display: flex;
	align-items: center;
	gap: 10px;
}

.property-card__price i {
	color: var(--accent-color);
	font-size: 22px;
}

.property-card__price h5 {
	font-size: 22px;
	font-weight: 400;
}
</style>
