<template>
  <form id="complement-student-form" class="content" ref="refForm" @submit.prevent="handleSubmit">
    <div class="head-content">
      <h1>Concluir Cadastro</h1>
      <p>Precisamos de mais algumas informações para concluir o seu cadastro. É fácil e rápido!</p>
    </div>

    <div class="content">
      <div class="first-section">
        <base-input
          ref="refName"
          class="text-input"
          v-model="userData.name"
          id="name"
          type="text"
          label="Nome completo: "
          required
        />

        <base-input
          ref="refContact"
          class="text-input"
          v-model="userData.contact"
          id="contact"
          type="number"
          label="Contato:"
          pattern="[0-9]"
          required
        />

        <base-input
          ref="refResume"
          class="text-input textarea"
          v-model="userData.resume"
          id="resume"
          type="textarea"
          label="Breve resumo sobre você:"
          required
        />
      </div>
    </div>

    <slot name="button" />
  </form>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import { enumClassType } from '@/consts/enums';

const refForm = ref(null);

const options = [
  {
    label: 'remoto',
    value: enumClassType.remote
  },
  {
    label: 'presencial',
    value: enumClassType.inPerson
  },
  {
    label: 'presencial e remoto',
    value: enumClassType.bothClass
  }
];

const userData = reactive({
  name: null, //text
  classType: 0, //select com 3 opções,
  contact: null,
  birthDay: null // date
});

const handleSubmit = async () => {
  const rawUserData = toRaw(userData);
  if (refForm.value.reportValidity())
    emit('submit', {
      data: {
        ...rawUserData,
        complemented_data: true
      }
    });
};

const emit = defineEmits(['submit']);
</script>

<style lang="less" scoped>
#complement-student-form {
  padding-top: 3.5rem;

  .head-content {
    h1 {
      padding-bottom: 0.8rem;
    }
    p {
      font-size: 2rem;
      color: var(--text-dark);
    }
  }

  .content {
    padding: 4.4rem 6.6rem;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .text-input,
    .date-input {
      margin: 0 auto;
      margin-bottom: 2.5rem;
      max-width: 51.5rem;
    }

    .first-section,
    .second-section {
      width: 45%;
    }

    @media @smartphone {
      padding: unset;
      padding-top: 2rem;
      flex-direction: column;

      .head-content {
        h1 {
          padding-bottom: 0.8rem;
          font-size: 3.1rem;
        }
      }

      & > .first-section,
      & > .second-section {
        width: unset;
      }
    }
  }
}
</style>
