<template>
    <h1>Whish List</h1>
    <PropertyCardContainer>
        <PropertyCard v-for="property in wishlist" 
            :key="property.id" 
            :id="property.id" 
            :title="property.title"
            :imageSrc="property.imageSrc"
            :bedrooms="property.bedrooms"
            :bathrooms="property.bathrooms"
            :footage="property.footage"
            :price="property.price"/>
    </PropertyCardContainer>
</template>

<script setup>
import { computed } from 'vue';
import { useWishlistStore } from '@/store/wishlistStore';
import PropertyCardContainer from '@/components/ui/PropertyCardContainer.vue';
import PropertyCard from '@/components/ui/PropertyCard.vue';

const wishlistStore = useWishlistStore();
const wishlist = computed(() => wishlistStore.wishlist);
</script>
