<template>
  <div>
    <base-modal>
      <div id="side-modal">
        <a @click="$emit('close')">
          <img src="@/assets/close-icon-black.svg" alt="close icon" srcset="" />
        </a>

        <h2>Selecionar Horários</h2>

        <div class="options-container">
          <radio-input
            v-if="options.length"
            class="radio-input"
            direction="column"
            v-model="option"
            :options="options"
          />
          <h2 v-else>Não existe horarios disponiveis...</h2>
        </div>

        <base-button @click="$emit('save', option)">Agendar</base-button>
      </div>
    </base-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  }
});

const option = ref(0);

const emit = defineEmits(['close', 'save']);
</script>

<style lang="less" scoped>
#side-modal {
  height: 100svh;
  background: white;
  margin-left: auto;
  width: 55rem;
  padding: 3rem;

  img {
    width: 24px;
    height: 24px;
  }

  h2 {
    margin-top: 4.8rem;
    color: var(--text-primary);
    font-size: 2.8rem;
    margin-bottom: 5.2rem;
  }

  .options-container {
    height: 70%;
    overflow: auto;
    padding-left: 2px;

    h2{
      font-size: 1.6rem;
    }
  }

  button {
    width: 12rem;
    font-size: 1.6rem;
    padding: 1.5rem;
    float: right;
  }
}
</style>
