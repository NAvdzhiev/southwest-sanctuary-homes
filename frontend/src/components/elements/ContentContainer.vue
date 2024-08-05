<template>
    <div :class="['content-container', layoutClass]">
        <div v-if="image" class="image-container">
            <img :src="image" alt="Content Image" class="content-image">
        </div>
        <div class="text-content">
            <h2 class="content-heading">{{ heading }}</h2>
            <p class="content-text">{{ text }}</p>
            <button></button>
        </div>
    </div>

</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        buttonText: String,
        heading: String,
        text: String,
        image: String,
        layout: String
    },
    setup(props) {
        const layoutClass = computed(() => props.layout);

        return {layoutClass}
    },
}
</script>