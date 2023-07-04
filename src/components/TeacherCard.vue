<template>
  <div id="card">
    <div class="teacher-image">
      <img :src="profileSrc" alt="" />
    </div>

    <div class="content">
      <h2>Prof.º {{ name }}</h2>
      <p>
        {{ resumeFormatted }}
      </p>

      <div class="icon">
        <a class="image-container" :href="whatsappLink" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/icon-messages.svg" />
        </a>
        <a class="image-container" @click="scheduleClass">
          <img src="@/assets/icon-teacher.svg" />
        </a>
        <a @click.prevent="openDetails" class="image-container">
          <img src="@/assets/icon-user.svg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { TEACHER_DETAILS } from '@/consts/privateRoutes.js';
import { SCHEDULE_CLASS } from '@/consts/publicRoutes.js';

const userStore = useUserStore();
const router = useRouter();
const profileSrc = computed(() => {
  return props.profile || comunistDog;
});
const comunistDog = 'https://i.pinimg.com/236x/28/c5/49/28c54966142ad9b4872a6a25564f6f75.jpg';

const props = defineProps({
  id: String,
  resume: String,
  profile: String,
  name: String,
  contact: Number
});

const resumeFormatted = computed(() => {
  if (props.resume.length > 200) {
    return ` ${props.resume.slice(0, 200)}...`;
  }
  return props.resume;
});

const whatsappLink = computed(() => {
  const wppText = `Olá Professor ${props.name}, meu nome é ${userStore?.user?.name} e gostária de saber, mais sobre suas aulas.`;
  return `https://api.whatsapp.com/send?phone=${props.contact}&text=${wppText}`;
});

const scheduleClass = () => {
  return router.push({ name: SCHEDULE_CLASS.NAME, params: { id: props.id } });
};

const openDetails = () => {
  return router.push({ name: TEACHER_DETAILS.NAME, params: { id: props.id } });
};
</script>

<style lang="less" scoped>
#card {
  border-radius: 1.6rem;
  outline: 2px solid var(--input-secondary);
  width: 22.7rem;
  background-color: var(--input-secondary);
  margin: 0 10px;

  .teacher-image {
    position: relative;
    top: 2.3rem;

    img {
      width: 14rem;
      height: 14rem;
      border-radius: 50%;
      border: 8px solid var(--text-primary);
      margin: 0 auto;
      display: block;
      object-fit: cover;
    }
  }

  .content {
    height: 50%;
    background-color: white;
    border-radius: 0 0 1.6rem 1.6rem;

    h2 {
      text-align: center;
      padding-top: 4.2rem;
      color: var(--text-dark);
      margin: 0 auto 1.6rem auto;
      min-height: 40px;
    }

    p {
      min-height: 16rem;
      text-align: center;
      max-width: 20rem;
      font-size: 1.6rem;
      margin: 0 auto 1.6rem auto;
      color: var(--text-dark);
    }

    .icon {
      position: relative;
      bottom: 0;
      display: flex;
      justify-content: center;
      padding-bottom: 1.6rem;
      .image-container {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin: 0 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;

        background-color: var(--text-primary);

        img {
          width: 90%;
          display: block;
          margin: 0 auto;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
