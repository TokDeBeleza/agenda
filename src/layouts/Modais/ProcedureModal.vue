<template>
  <base-modal>
    <div id="procedure-container">
      <nav>
        <a @click="$emit('close')">
          <img src="@/assets/close-icon.svg" alt="close icon" srcset="" />
        </a>
      </nav>
      <procedure-form :procedure="procedure" :observation="observation" @submit="handleSubmit">
        <slot />
      </procedure-form>
    </div>
  </base-modal>
</template>

<script setup>
import ProcedureForm from '@/layouts/Forms/procedureForm.vue';
import { LOGIN } from '@/consts/publicRoutes.js';
import { useIsAuthenticate } from '@/composables/user';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
const emits = defineEmits(['submit', 'close']);
const router = useRouter();
const route = useRoute();
const props = defineProps({
  procedure: {
    default: 0,
    type: Number
  },
  observation: {
    default: null,
    type: [String, null]
  }
});

const handleSubmit = async (v) => {
  const { user } = await useIsAuthenticate();

  if (!user.body) {
    return router.push({
      name: LOGIN.NAME,
      query: {
        company_id: route.params.id
      }
    });
  }
  return emits('submit', v);
};
</script>

<style lang="less">
#procedure-container {
  border-radius: 1rem;
  max-width: 45rem;
  background: white;
  margin: auto;
  align-self: center;

  nav {
    border-radius: 1rem 1rem 0 0;
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

  #button {
    margin-top: 2rem;
    width: 100%;
  }
}
</style>
