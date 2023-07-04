<template>
  <form id="procedure-form" ref="refForm" @submit.prevent="handleSubmit">
    <select-input
      v-model="userData.procedure"
      id="select-input"
      class="select-input"
      label="Procedimento:"
      :options="options"
    />

    <base-input
      v-model="userData.observation"
      class="textarea"
      id="resume"
      type="textarea"
      label="Observação:"
      placeholder="Alguma observação ou algo que você acha interessante que a gente saiba"
    />

    <slot />
  </form>
</template>

<script setup>
import { reactive, toRaw, ref } from 'vue';

const props = defineProps({
  procedure: {
    default: 1,
    type: Number
  },
  observation: {
    default: null,
    type: [String, null]
  }
});

const options = ref([]); //não pegar da usar store e sim fazer uma request pra isso
const refForm = ref(null);
const userData = reactive({
  procedure: props.procedure,
  observation: props.observation
});

const handleSubmit = () => {
  const payload = {
    name: toRaw(options.value[userData.procedure]).label,
    observation: userData.observation
  };
  emit('submit', payload);
};

const emit = defineEmits(['submit']);
</script>

<style lang="less">
#procedure-form {
  padding: 3rem;

  #select-input,
  .textarea {
    margin-bottom: 1rem;

    label,
    textarea {
      font-size: 1.6rem;
    }
  }
}
</style>
