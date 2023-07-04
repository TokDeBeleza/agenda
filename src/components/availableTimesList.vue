<template>
  <div class="time-content">
    <!-- https://dribbble.com/shots/11316990-Task-sheduler-app-ui design para os itens -->
    <div :class="['time', !day?.name ? 'light' : 'dark']" v-for="(day, key) in list" :key="key">
      <div>
        <i class="date">{{ formatDates(day.date) }} </i>
        <div class="close-icon">
          <slot name="head" :key="key" />
        </div>
      </div>
      <p class="student-name">{{ day.name || 'Horário aberto' }}</p>
      <p class="procedure">{{ day?.procedure }}</p>
      <slot name="bottom" :key="key" :item="day" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: Array
});
const emit = defineEmits(['remove']);

const formatDates = (day) => {
  return `${day?.getHours()}:${String(day?.getMinutes())?.padStart(2, '0')}`;
};
</script>

<style lang="less" scoped>
.time-content {
  margin-top: 3rem;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media @smartphone {
    justify-content: center;
  }

  .time.light {
    background-color: var(--input-primary);
    color: var(--text-dark);
  }
  .time.dark {
    background-color: var(--text-primary);
    color: white;
  }
}

& > div {
  max-height: 62vh;
  overflow: auto;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
}

.time {
  border-radius: 1rem;
  display: block;
  font-size: 1.6rem;
  margin: 1.6rem 0.8rem;
  width: 22rem;
  padding: 2rem;
  padding-left: 2rem;

  p,
  button {
    margin-top: 1.5rem;
  }

  .date {
    font-size: 1.2rem;
  }
  .student-name {
    font-size: 1.6rem;
  }
  .procedure {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close-icon {
      img {
        width: 15px;
        height: 15px;
      }
      cursor: pointer;
    }
  }
}
</style>
