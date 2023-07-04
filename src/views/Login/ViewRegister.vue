<template>
  <user-register ref="formRef" @submit="register">
    <template #head>
      <div class="head-content">
        <h1>Criar conta</h1>
        <p>Já é cadastrado? <a @click.prevent="login">Entre na sua conta.</a></p>
      </div>
    </template>
    <template #button>
      <div class="user-term">
        <p>Ao prosseguir, você concorda com nossos <a>Termos de uso</a></p>
        <base-button>Cadastre-se</base-button>
      </div>
    </template>
  </user-register>
</template>

<script setup>
import { LOGIN } from '@/consts/publicRoutes.js';
import { USER_COMPLEMENT_DATA } from '@/consts/privateRoutes.js';

import userRegister from '@/layouts/Forms/userRegister.vue';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const formRef = ref(null);

const login = () => {
  return router.push({ name: LOGIN.NAME });
};

const register = async (form) => {
  if (!form.valid) return;

  const result = await userStore.create(form);

  if (!result.success)
    return formRef.value.setEmailCustomValidity(`CODE: ${result.code}
    MESSAGE: ${result.message}`);

  return router.push({
    name: USER_COMPLEMENT_DATA.NAME,
    params: { id: result.userId },
    query: {
      company_id: route.query.company_id
    }
  });
};
</script>

<style lang="less" scoped>
.head-content {
  h1 {
    margin-bottom: 1.6rem;
  }

  & > p {
    color: var(--text-dark);
    font-size: 2rem;
    margin-bottom: 3.4rem;
  }
}
.user-term {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p,
  a {
    margin-right: 2rem;
    font-size: 1.6rem;
  }
}

@media @smartphone {
  .head-content {
    h1 {
      text-align: center;
    }
  }
  .user-term {
    flex-wrap: wrap;
    justify-content: center;

    p {
      margin-bottom: 2rem;
    }

    button {
      width: 100%;
    }
  }
}
</style>
