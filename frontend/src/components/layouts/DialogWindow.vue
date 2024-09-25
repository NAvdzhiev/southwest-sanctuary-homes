<template>
	<dialog v-show="open" @click.self="close">
		<button class="close-btn" @click="close">X</button>
		<slot></slot>
	</dialog>
</template>
<script setup>
import { watch } from 'vue';

const props = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['close']);

const close = () => {
	emit('close');
};

watch(
	() => props.open,
	(newValue) => {
		if (newValue) {
			document.querySelector('dialog').showModal();
		} else {
			document.querySelector('dialog').close();
		}
	},
);
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

dialog >>> .form-container {
	max-width: 100%;
}
</style>
