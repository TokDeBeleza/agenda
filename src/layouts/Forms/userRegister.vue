<template>
  <form ref="refForm" id="register-user-form" @submit.prevent="handleSubmit">
    <div class="img">
      <img src="@/assets/register-image.svg" alt="jovem fazendo sinal de foto" />
    </div>

    <div class="content">
      <slot name="head" />

      <base-input
        ref="refEmail"
        class="text-input"
        required
        v-model="userData.email"
        id="email"
        type="email"
        autocomplete="off"
        label="Email"
        placeholder="example@email.com"
        @onBlur="setEmailCustomValidity('')"
      />

      <password-input
        ref="refPassword"
        class="text-input"
        id="password"
        v-model="userData.password"
        autocomplete="off"
        label="Senha"
        placeholder="Senha"
      />

      <password-input
        ref="refConfirmPassword"
        class="text-input"
        id="confirm-password"
        v-model="userData.confirmPassword"
        autocomplete="off"
        label="Confirmar Senha"
        placeholder="Confirmar senha"
      />

      <radio-input class="radio-input" v-model="userData.student" :options="radioOptions" />

      <slot name="button" />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, toRefs, watchEffect } from 'vue';
import { enumUserType } from '@/consts/enums';
const refEmail = ref(null);
const refPassword = ref(null);
const refConfirmPassword = ref(null);
const refForm = ref(null);

const radioOptions = [
  {
    value: enumUserType.student,
    label: 'Sou estudantes'
  },
  {
    value: enumUserType.teacher,
    label: 'Sou professor'
  }
];

const userData = reactive({
  email: null,
  password: null,
  confirmPassword: null,
  student: 0
});

watchEffect(() => {
  if (userData.password === userData.confirmPassword) {
    refPassword.value?.setCustomValidity('');
    refConfirmPassword.value?.setCustomValidity('');
  }
});

const handleSubmit = () => {
  const { password, confirmPassword, email, student } = userData;

  if (password !== confirmPassword) {
    refPassword.value.setCustomValidity('As senhas não coincidem');
    refConfirmPassword.value.setCustomValidity('As senhas não coincidem');
  }

  emit('submit', {
    valid: refForm.value.reportValidity(),
    email: email,
    password: password,
    type: student,
    complemented_data: false
  });
};

const setEmailCustomValidity = (message) => refEmail.value.setCustomValidity(message);

defineExpose({ setEmailCustomValidity });
const emit = defineEmits(['submit']);
</script>

<style lang="less" scoped>
#register-user-form {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  .img {
    width: 100%;
    max-width: 80rem;

    img {
      width: 100%;
    }
  }

  .content {
    width: 72%;
    max-width: 51.5rem;

    .text-input {
      margin-bottom: 2.4rem;
    }

    .radio-input {
      margin-top: 0.8rem;
      margin-bottom: 4.8rem;
    }
  }

  @media @smartphone {
    padding: 3rem 0.1rem;
    .img {
      display: none;
    }

    .content {
      width: 100%;
      padding: unset;

      .radio-input {
        margin-bottom: 2.8rem;
      }
    }
  }
}
</style>
