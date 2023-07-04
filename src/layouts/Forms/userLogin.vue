<template>
  <form id="login-user-form" ref="refForm" @submit.prevent="handleSubmit">
    <div class="img">
      <img src="@/assets/login-image.svg" alt="jovem fazendo sinal de foto" />
    </div>

    <div class="content">
      <slot name="head" />

      <base-input
        ref="refEmail"
        class="text-input"
        v-model="userData.email"
        id="email"
        type="email"
        autocomplete="off"
        label="Email"
        placeholder="example@email.com"
        required
        @onBlur="handleBlur"
      />

      <password-input
        ref="refPassword"
        class="text-input"
        id="password"
        v-model="userData.password"
        autocomplete="off"
        label="Senha"
        placeholder="Senha"
        @onBlur="handleBlur"
      />

      <slot name="button" />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const refForm = ref(null);
const refPassword = ref(null);
const refEmail = ref(null);
const userData = reactive({
  email: null,
  password: null
});

const handleBlur = () => {
  refPassword.value.setCustomValidity('');
  refEmail.value.setCustomValidity('');
};

const handleSubmit = () => {
  const { email, password } = userData;

  if (!email && !password) return;

  emit('submit', {
    valid: refForm.value.reportValidity(),
    email: email,
    password: password
  });
};

const setEmailCustomValidity = (message) => refEmail.value.setCustomValidity(message);
const emit = defineEmits(['submit']);

defineExpose({ setEmailCustomValidity });
</script>

<style lang="less" scoped>
#login-user-form {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  .img {
    width: 50%;
    max-width: 62.5rem;

    img {
      width: 100%;
    }
  }
  .content {
    width: 50%;
    max-width: 51.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .text-input {
      margin-bottom: 2.4rem;
    }
  }

  @media @smartphone {
    .img {
      display: none;
    }

    .content {
      width: 90%;

      p {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
