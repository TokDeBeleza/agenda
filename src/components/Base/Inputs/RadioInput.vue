<template>
  <div id="select-input">
    <fieldset :class="[direction]">
      <div v-for="(option, index) in optionsFormatted" :key="index">
        <input
          type="radio"
          v-model="value"
          :id="option.label"
          :name="option.label"
          :value="option.value"
          @change="$emit('update:modelValue', value), $emit('onChange', value)"
        />
        <label :for="option.label">{{ option.label }}</label>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const value = ref(props.modelValue);

const emit = defineEmits(['onChange', 'update:modelValue']);
const props = defineProps({
  options: {
    type: Array
  },
  direction: {
    type: String,
    default: 'row',
    validator(value) {
      return ['row', 'column'].includes(value);
    }
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
  .row {
    align-items: center;
  }
  .column {
    flex-direction: column;
  }

  fieldset {
    display: flex;

    div {
      display: flex;
      align-items: center;
      margin-right: 3.3rem;
      margin-bottom: 1.3rem;

      @media @smartphone {
        margin-right: 0;
      }

      input {
        margin-right: 0.8rem;
        appearance: none;

        border-radius: 50%;

        width: 2.4rem;
        height: 2.4rem;
        background: var(--input-primary);
        outline: 0.2rem solid var(--link-primary);

        margin-right: 0.8rem;
        cursor: pointer;
      }

      input:checked {
        outline: 0.3rem solid var(--input-primary);
      }

      input:checked::before {
        content: '';
        display: block;
        width: 1rem;
        height: 1rem;
        margin: 0.7rem auto;
        border-radius: 50%;
        background: var(--link-primary);
      }
    }
  }
}
</style>
