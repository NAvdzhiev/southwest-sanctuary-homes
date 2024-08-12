import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
	state: () => ({
		wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
	}),

	actions: {
		addToWishlist(property) {
			if (!this.isInWishlist(property.id)) {
				this.wishlist.push(property);
				localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
			}
		},

		removeFromWishlist(propertyId) {
			this.wishlist = this.wishlist.filter(
				(item) => item.id !== propertyId.value,
			);
			localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
		},

		isInWishlist(propertyId) {
			return this.wishlist.some((i) => i.id === propertyId.value);
		},
		getWishlistCount() {
			return this.wishlist.length;
		},
		// clearWishlist() {
		// 	this.wishlist = [];
		// 	localStorage.removeItem('wishlist');
		// },
	},
});
