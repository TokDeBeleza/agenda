<template>
  <section id="mobile-schedule">
    <VDatePicker v-model="selectedDay" locale="pt" :attributes="attributes" :popover="false">
      <template #default="{ togglePopover, inputValue, inputEvents }">
        <base-input readonly @onClick="() => togglePopover()" :value="inputValue" :on="inputEvents">
          <template #icon>
            <div class="plus-icon" @click="$emit('open')">
              <img class="plus-icon-content" src="@/assets/close-icon.svg" alt="close icon" />
            </div>
          </template>
        </base-input>
      </template>
    </VDatePicker>
    <transition name="show" mode="out-in">
      <div class="dates-container" :key="count">
        <available-times-list :list="timeList" v-if="timeList?.length">
          <template #head="{ key }">
            <slot name="head" :key="key" />
          </template>
          <template #bottom="{ key, item }">
            <slot name="bottom" :key="key" :item="item" />
          </template>
        </available-times-list>
        <p v-else>Esse dia ainda não tem horários</p>
      </div>
    </transition>
  </section>
</template>

<script setup>
import availableTimesList from '@/components/availableTimesList.vue';

import { ref, watch } from 'vue';

const props = defineProps({
  attributes: Array,
  timeList: Array
});

const selectedDay = ref(new Date());

const count = ref(0);
const emit = defineEmits(['change', 'open', 'remove']);

watch(
  selectedDay,
  (value) => {
    count.value++;
    emit('change', value);
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
#mobile-schedule {
  @media @smartphone {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #button {
    width: 24px;
    height: 24px;
    padding: unset;
    padding-bottom: 5px;
    margin-right: 1.6rem;
  }

  .plus-icon {
    z-index: 1000;
    width: 100%;
    height: 100%;
    &-content {
      rotate: 45deg;
      margin: 35% auto;
      display: block;
    }
  }

  & .dates-container {
    p {
      margin-top: 5rem;

      font-size: 1.6rem;
    }
  }
}
.show-enter-from {
  transform: translate3d(-20px, 0, 0);
}
.show-enter-active,
.show-leave-active {
  transition: all 0.5s;
}

.show-leave-to {
  transform: translate3d(90%, 0, 0);
}
</style>
