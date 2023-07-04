<template>
  <nav id="nav-bar">
    <div class="container">
      <RouterLink to="/" @click="signOut">
        <div class="img">
          <img src="@/assets/helpers-logo.svg" alt="helpers logo" />
        </div>
      </RouterLink>

      <RouterLink to="/" @click="signOut" class="sign-out" v-if="route.meta.requireAuth">
        <label>Sair</label>
        <img src="@/assets/back-icon.svg" />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';
import { REGISTER } from '@/consts/publicRoutes.js';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const signOut = async () => {
  return await userStore.signOut();
};
</script>

<style lang="less" scoped>
#nav-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 9rem;
  background-color: var(--text-primary);

  @media @smartphone {
    .call-action {
      justify-content: space-between;
      align-items: end;
      a {
        display: none;
      }
    }
  }

  .container {
    margin: 0 auto;
    padding: 2rem;
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .call-action {
      display: flex;
      align-items: center;

      .nav-btn {
        width: 17rem;
        height: 5rem;
        line-height: 0;
        border-radius: 1.6rem;
      }
      .nav-btn:hover {
        background-color: var(--link-primary);
      }

      a {
        margin-right: 3.2rem;
        font-size: 2.4rem;
        color: white;
        text-decoration: none;
        font-weight: 300;
      }

      a:hover {
        color: var(--link-primary);
      }
    }
    .img {
      max-width: 14.4rem;
    }
  }

  .sign-out {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: white;
    img {
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
