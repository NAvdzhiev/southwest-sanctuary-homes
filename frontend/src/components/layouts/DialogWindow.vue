<template>
	<dialog ref="dialog" @click.self="close">
		<button class="close-btn" @click="close" aria-label="Close">X</button>
		<slot></slot>
	</dialog>
</template>

<script setup>
import { watch, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['close']);
const dialog = ref(null);

const close = () => {
	emit('close');
};

watch(
	() => props.open,
	(newValue) => {
		if (dialog.value) {
			if (newValue) {
				dialog.value.showModal();
			} else {
				dialog.value.close();
			}
		}
	}
);

const handleEscape = (event) => {
	if (event.key === 'Escape') close();
};

onMounted(() => {
	window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
	window.removeEventListener('keydown', handleEscape);
});
</script>

<style scoped>
dialog {
	border: none;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	margin: auto;
	padding: 0;
	width: 65%;
	max-width: 100%;
}

.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	background: transparent;
	border: none;
	font-size: 24px;
	cursor: pointer;
}

dialog::backdrop {
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
