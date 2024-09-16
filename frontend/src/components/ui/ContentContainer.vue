<template>
	<div :class="containerClasses">
		<div class="content">
			<slot></slot>
		</div>
		<img :src="imageUrl" :alt="imageUrl" class="content-image" />
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	imageSrc: {
		type: String,
		required: false,
		default: null,
	},
	reverse: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const containerClasses = computed(() => {
	return {
		'content-container': true,
		'reverse-layout': props.reverse,
	};
});

const imageUrl = computed(() => {
	return require(`@/assets/images/${props.imageSrc}`);
});
</script>

<style scoped>
.content-container {
	display: flex;
	margin: 0 0 150px;
	height: auto;
	background-color: var(--container-color);
	border-radius: 24px;
	padding: 30px;
}

.content {
	flex: 1;
	width: 90%;
}

.content >>> h2:first-child {
	margin-top: 5%;
}

.content >>> p {
	margin-top: 7%;
}

.content-image {
	border-radius: 12px;
}

.reverse-layout {
	flex-direction: row-reverse;
	text-align: right;
}
</style>
