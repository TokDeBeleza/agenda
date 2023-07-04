<template>
  <section id="view-complement-data">
    <renderForm ref="formRef" @submit="completeData" />
  </section>
</template>

<script setup>
import complementStudent from '@/layouts/Forms/complementStudent.vue';
import BaseButton from '@/components/Base/BaseButton.vue';

import { ref, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { SCHEDULE_CLASS } from '@/consts/publicRoutes';
import { CREATE_CLASS } from '@/consts/privateRoutes';
import { useUserStore } from '@/stores/UserStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const formRef = ref(null);

const renderForm = () => {
  return h(complementStudent, null, {
    button: () =>
      h(
        'div',
        {
          class: 'complete-button'
        },
        h(BaseButton, () => 'Concluir cadastro')
      )
  });
};

const completeData = ({ data }) => {
  try {
    const userId = route.params.id;
    userStore.update({ ...data, type: userStore.user.type }, false, userId);

    return router.push({
      name: userStore.user.type ? CREATE_CLASS.NAME : SCHEDULE_CLASS.NAME,
      params: { id: route.query.company_id }
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="less">
#view-complement-data {
  width: 80%;

  .complete-button {
    padding: 0 6.6rem;
    padding-bottom: 4rem;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  @media @smartphone {
    width: 95%;

    .complete-button {
      padding: unset;
      margin-bottom: 2rem;

      button {
        width: 100%;
      }
    }
  }
}
</style>
