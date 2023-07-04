<template>
  <div id="select-input">
    <label for="cars">{{ label }}</label>
    <div class="content">
      <select id="cars" v-model="value" @change="$emit('update:modelValue', value)">
        <option v-for="(option, index) in optionsFormatted" :key="index" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <span class="icon">
        <img src="@/assets/arrow-down.svg" alt="" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const value = ref(props.modelValue);

const props = defineProps({
  label: {
    type: String
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  }
});

const optionsFormatted = computed(() => {
  return props.options.map((option) => ({
    label: option.label,
    value: option.value ?? option.label
  }));
});
</script>

<style lang="less" scoped>
#select-input {
  display: inline-block;
  position: relative;
  width: 100%;
  .content {
    background: var(--input-primary);
    border-radius: 0.8rem;
    width: 100%;
    position: relative;

    select {
      padding: 2.2rem;
      width: 100%;
      border: none;
      background: transparent;
      cursor: pointer;
      -webkit-appearance: none;
    }

    select:focus-visible {
      outline: 0.2rem solid var(--link-primary);
      border-radius: 0.8rem;
    }

    img {
      position: absolute;
      width: 20px;
      height: 10px;
      right: 4%;
      top: 45%;
    }
  }
}
</style>
