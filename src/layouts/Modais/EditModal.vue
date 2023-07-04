<template>
  <base-modal>
    <div id="modal-container" class="container">
      <nav>
        <a @click="$emit('close')">
          <img src="@/assets/close-icon.svg" alt="close icon" srcset="" />
        </a>
      </nav>
      <div class="content">
        <h2>Editar horários disponíveis</h2>

        <label>Adicionar horários</label>
        <div class="actions">
          <base-button @click="addDay" class="button" :theme="false">+</base-button>
          <VDatePicker v-model="date" mode="time" locale="pt" :rules="rules" is24hr />
        </div>
        <div class="available-time">
          <availableTimesList :style="{ flexDirection: 'column' }" :list="newDays" />
        </div>
        <base-button @click="save" class="save-button">salvar</base-button>
      </div>
    </div>
  </base-modal>
</template>

<script setup>
import availableTimesList from '../../components/availableTimesList.vue';
import { ref, shallowReactive } from 'vue';

const props = defineProps({
  selectedDay: Date
});

const rules = ref({
  minutes: { interval: 5 }
});

const date = ref(props.selectedDay);
const newDays = shallowReactive([]);

const addDay = () => {
  const hasDate = newDays.some((item) => item.date.toISOString() == date.value.toISOString());
  if (hasDate) return;
  newDays.push({ date: date.value });
  return newDays.sort((a, b) => a.date - b.date);
};

const save = () => {
  emit('save', newDays);
};

const emit = defineEmits(['close', 'save', 'remove']);
</script>

<style lang="less">
#modal-container {
  min-width: 35.6rem;
  max-width: 45rem;
  min-height: 60rem;
  background: white;
  margin: auto;
  align-self: center;

  nav {
    background-color: var(--text-primary);
    padding: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      width: 16px;
      height: 16px;
    }
  }

  .content {
    padding: 0 4rem;

    h2 {
      color: var(--text-primary);
      text-align: center;
      margin-top: 4rem;
      margin-bottom: 2.4rem;
    }

    label {
      color: var(--text-dark);
      display: block;
      font-size: 1.6rem;
      margin-bottom: 1.6rem;
    }

    span {
      margin-bottom: 0.8rem;
    }

    .actions {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 2.8rem;
    }

    .button {
      width: 24px;
      height: 24px;
      padding: unset;
      padding-bottom: 5px;
      margin-right: 1.6rem;
    }

    .available-time {
      display: flex;
      flex-direction: column;
      overflow: auto;
      height: 20rem;
      i {
        font-size: 1.4rem;
      }
    }

    .save-button {
      margin: 3rem 0;
      width: 9.8rem;
      padding: 1rem;
      float: right;
    }
  }
}
</style>
