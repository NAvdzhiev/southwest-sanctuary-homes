<template>
    <section class="property-card-container">
        <slot></slot>
    </section>
</template>

<style scoped>
    .property-card-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
    }
</style>