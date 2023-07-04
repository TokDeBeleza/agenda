<template>
  <form id="complement-teacher-form" class="content" ref="refForm" @submit.prevent="handleSubmit">
    <div class="head-content">
      <h1>Concluir Cadastro</h1>
      <p>Precisamos de mais algumas informações para concluir o seu cadastro. É fácil e rápido!</p>
    </div>
    <div class="content">
      <div class="section-first">
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

        <div class="section-second">
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
    </div>
    <slot name="button" />
  </form>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import { enumClassType } from '@/consts/enums';
import LocationService from '@/service/LocationService.js';
const locationService = new LocationService();
const refForm = ref(null);
const filePhoto = ref(null);
const refPostalCode = ref(null);

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
  photo: '',
  street: null, //text
  platform: null, //text
  resume: null, //text
  contact: null, //number
  lat: null,
  lng: null,
  neighborhood: null,
  classType: 0, //select com 3 opções,
  birthDay: null // date
});

const handlePostalCode = async (input) => {
  try {
    const {
      body: { bairro, localidade, uf }
    } = await locationService.getPostalCodeData(input);

    userData.neighborhood = `${bairro} - ${localidade} ${uf}`;
  } catch (e) {
    userData.neighborhood = null;
    return refPostalCode.value.setCustomValidity(e.message);
  }
};

const handleLocation = async (input) => {
  if (userData.classType === enumClassType.remote) return;

  try {
    if (!input) throw 'Preencha o campo';

    const { body: location } = await locationService.getPostalCodeLocation(input);
    userData.lat = Number(location?.geometry.lat);
    userData.lng = Number(location?.geometry.lng);

    return userData;
  } catch (e) {
    return refPostalCode.value.setCustomValidity(e.message);
  }
};

const handlePhotoUpload = (e) => {
  const fr = new FileReader();
  fr.readAsDataURL(e.target.files[0]);
  filePhoto.value = e.target.files[0];
};

const handleSubmit = async () => {
  const data = await handleLocation(userData.neighborhood);
  const rawUserData = toRaw(data);

  if (refForm.value.reportValidity()) {
    emit('submit', {
      data: {
        ...rawUserData,
        complemented_data: true
      },
      profileImage: filePhoto.value
    });
  }
};

const emit = defineEmits(['submit']);
</script>

<style lang="less" scoped>
#complement-teacher-form {
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
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .section-first,
    .section-second {
      width: 45%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }
    .text-input,
    .date-input {
      margin-bottom: 1.5rem;
      max-width: 51.5rem;
    }

    .text-input:last-child {
      margin-bottom: 2.5rem;
    }

    .icon-wrapper {
      height: 102%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 0.8rem 0.8rem 0;

      img {
        width: 42%;
        cursor: pointer;
      }
    }
  }

  @media @smartphone {
    .head-content {
      & > h1 {
        font-size: 3.1rem;
      }
      & > p {
        text-align: center;
      }
    }

    .content {
      padding: unset;
      padding-top: 2rem;
      flex-direction: column;

      p {
        margin-bottom: 2rem;
      }

      & > .section-first,
      & > .section-second {
        width: unset;
      }
    }
  }
}
</style>
