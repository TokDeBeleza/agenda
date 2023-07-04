<template>
  <button type="submit" class="base-button">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  theme: {
    type: Boolean,
    default: true
  },
  error: Boolean
});

const themeStyle = computed(() => {
  if (props.error) {
    return {
      color: 'var(--error-background)',
      bgColor: 'var(--error-background)',
      hoverColor: 'var(--error-background)',
      hoverBgColor: 'var(--error-background))'
    };
  }

  return props.theme
    ? {
        color: 'var(--white)',
        bgColor: 'var(--text-primary)',
        hoverColor: 'var(--text-primary)',
        hoverBgColor: 'var(--input-secondary)'
      }
    : {
        color: 'var(--text-primary)',
        bgColor: 'var(--input-secondary)',
        hoverColor: 'var(--white)',
        hoverBgColor: 'var(--text-primary)'
      };
});
</script>

<style lang="less" scoped>
.base-button {
  width: 24rem;
  font-size: 2rem;
  padding: 2.5rem;
  border: none;
  color: v-bind('themeStyle.color');
  cursor: pointer;
  border-radius: 0.8rem;
  background: v-bind('themeStyle.bgColor');
}

.base-button:hover {
  transition: 0.5s;
  color: v-bind('themeStyle.hoverColor');
  background: v-bind('themeStyle.hoverBgColor');
}
</style>
