<template>
    <component
      :is="tag"
      :to="to"
      :class="buttonClasses"
      @click="handleClick"
    >
      <slot>{{ text }}</slot>
    </component>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    text: {
      type: String,
      required: false,
      default: 'Button',
    },
    variant: {
      type: String,
      required: false,
      default: 'primary', 
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: [String, Object],
      required: false,
      default: null, 
    },
  });
  
  const emits = defineEmits(['click']);
  
  const tag = computed(() => {
    return props.to ? 'router-link' : 'button';
  });
  
  const buttonClasses = computed(() => {
    return [
      `btn-${props.variant}`,
      { 'btn-disabled': props.disabled },
    ];
  });
  
  const handleClick = (event) => {
    if (!props.disabled) {
      emits('click', event);
    }
  };
  </script>
  
  <style scoped>
    a, button {
    background-color: var(--accent-color);
    border-radius: 50px;
    padding: 20px 80px;
    font-size: 14px;
    font-weight: 400;
    text-decoration: none;
    color: var(--text-color-dark);
    display: inline-block;
    margin: 30px 0;
    border: 2px solid var(--accent-color);
    }
  </style>
  