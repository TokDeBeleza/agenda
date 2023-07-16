<template>
  <user-login-form ref="formRef" @submit="handleSubmit">
    <template #head>
      <h1>Bem-vindo de volta!</h1>
      <p>Ainda não é cadastrado? <a @click.prevent="createAccount">Crie sua conta</a></p>
    </template>

    <template #button>
      <div class="user-term">
        <base-button>Entrar</base-button>
      </div>
    </template>
  </user-login-form>
</template>

<script setup>
import { REGISTER, SCHEDULE_CLASS } from '@/consts/publicRoutes.js';
import { TEACHER_LIST, USER_COMPLEMENT_DATA, CREATE_CLASS } from '@/consts/privateRoutes.js';

import userLoginForm from '@/layouts/Forms/userLogin.vue';
import { useUserStore } from '@/stores/UserStore';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const formRef = ref(null);

const createAccount = () => {
  return router.push({ name: REGISTER.NAME });
};

const handleSubmit = async (data) => {
  if (!data.valid) return;
  const response = await userStore.signIn(data);

  if (!response.success)
    return formRef.value.setEmailCustomValidity(`CODE: ${response.code}
    MESSAGE: ${response.message}`);

  const { body } = response;

  if (!body.complemented_data)
    return router.push({ name: USER_COMPLEMENT_DATA.NAME, params: { id: body.id } });

  return body.type
    ? router.push({ name: CREATE_CLASS.NAME, params: { id: body.id } })
    : router.push({ name: SCHEDULE_CLASS.NAME, params: { id: route.query.company_id } });
};

onBeforeRouteLeave((to, from) => {
  const { name: destinyName } = to;
  const { query: fromQuery } = from;

  if ((destinyName === REGISTER.NAME || destinyName === USER_COMPLEMENT_DATA.NAME ) && fromQuery.company_id) {
    to.query = from.query;
    return true;
  }
});
</script>

<style lang="less" scoped>
.user-term {
  display: flex;
  justify-content: end;
  margin-top: 1.3rem;
}

h1 {
  margin-bottom: 1.6rem;
}

p {
  color: var(--text-dark);
  font-size: 2rem;
  margin-bottom: 5rem;
}

@media @smartphone {
  h1 {
    text-align: center;
  }

  p {
    text-align: center;
    width: 25rem;
    margin: 0 auto;
    margin-bottom: 2rem;
  }

  .user-term {
    button {
      width: 100%;
    }
  }
}
</style>
