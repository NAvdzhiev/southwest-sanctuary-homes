<template>
    <div :class="containerClasses">
        <div class="content">
            <h2>{{ heading }}</h2>
            <p>{{ text }}</p>
            <AppButton :text="buttonText" :to="buttonLink" :variant="buttonVariant" @click="handleButtonClick"/>
        </div>
        <img :src="imageUrl" :alt="heading" class="content-image" />
    </div>

</template>

<script setup>
import AppButton from './AppButton.vue';
import { computed } from 'vue';

const props = defineProps({
    heading: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    buttonText: {
        type: String,
        required: true,
        default: 'Button'
    },
    buttonLink: {
        type: [String, Object],
        required: false,
        default: null
    },
    imageSrc: {
        type: String,
        required: false,
        default: null
    },
    reverse: {
        type: Boolean,
        required: false,
        default: false
    }
});

const emits = defineEmits(['button-click']);

const containerClasses = computed(() => {
    return {
        'content-container': true,
        'reverse-layout': props.reverse
    }
});

const imageUrl = computed(() => {
    return require(`@/assets/images/${props.imageSrc}`);
})

const handleButtonClick = (event) => {
    emits('button-click', event);
}

</script>

<style scoped>
.content-container {
    display: flex;
    align-items: center;
    margin: 300px 0 150px;
    height: auto;
    background-color: var(--container-color);
    border-radius: 24px;
    padding: 30px;
    gap: 200px;
}

.content {
    flex: 1;
    width: 90%;
}

.content > h2 {
    font-size: 48px;
    font-weight: 500;
}

.content > p {
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
}

.content-image {
    width: 100%;
    max-width: 420px;
    height: 570px;
    border-radius: 12px;
}

.reverse-layout {
  flex-direction: row-reverse;
  text-align: right;
}

</style>