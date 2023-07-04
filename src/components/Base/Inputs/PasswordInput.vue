<template>
  <base-input
    ref="refPassword"
    v-bind="$props"
    :type="type"
    required
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #icon>
      <img
        src="@/assets/open-eye.svg"
        alt="mostrar senha"
        @click="changePasswordStatus(hidePassword)"
      />
    </template>
  </base-input>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const refPassword = ref(null);

const props = defineProps({
  modelValue: {
    type: [null, String],
    required: true
  },
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  autocomplete: {
    type: String,
    default: 'on'
  }
});

const hidePassword = ref(true);

const type = computed(() => (hidePassword.value ? 'password' : 'text'));

const changePasswordStatus = (hide) => {
  return (hidePassword.value = !hide);
};

const setCustomValidity = (message) => refPassword.value.setCustomValidity(message);

defineExpose({
  setCustomValidity
});
</script>

<style lang="less" scoped></style>
