<template>
  <section class="hub-swiper">
    <div ref="refContainer" class="hub-swiper-container" @wheel.prevent @scroll="handleScroll">
      <div v-for="(item, index) in list" :key="index" @touchstart.passive="handleScrollStart">
        <slot name="list-item" :item="item" :index="index" />
      </div>
    </div>

    <div v-if="list.length > 1" class="hub-swiper-pagination">
      <button class="prev" @click.stop="handlePrev">
        <slot name="prev">
          <img ref="svgPrev" src="@/assets/arrow-left.svg" />
        </slot>
      </button>

      <slot name="pagination-informative">
        <div class="bullets">
          <span
            v-for="(_, index) in list"
            :key="index"
            :class="[index === page && 'active']"
            @click="changePageTo(index)"
          />
        </div>
      </slot>

      <button class="next" @click.stop="handleNext">
        <slot name="next">
          <img src="@/assets/arrow-right.svg" />
        </slot>
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['next', 'prev', 'selected']);

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  initialSlide: {
    type: Number,
    default: 0
  }
});

const refContainer = ref('');
let page = ref(null);
const currentPositionX = ref(null);
let scrollTimer = ref(null);
let scrollDelay = ref(150);

watch(page, (nValue) => {
  scrollTo(nValue);
});

const changePageTo = (index) => {
  page.value = index;
  return emit('selected', page.value);
};

const handleNext = () => {
  props.list.length > page.value + 1 && ++page.value;
  return emit('next', page.value);
};

const handlePrev = () => {
  page.value > 0 && --page.value;
  return emit('prev', page.value);
};

const scrollTo = (page) => {
  const maxScrollWidth = refContainer.value.scrollWidth - refContainer.value.clientWidth;
  const scrollValue = Math.ceil((refContainer.value.scrollWidth / props.list.length) * page);
  refContainer.value.scrollLeft = scrollValue;
  return (currentPositionX.value = scrollValue > maxScrollWidth ? maxScrollWidth : scrollValue);
};

const handleScrollStart = () => {
  currentPositionX.value = refContainer.value.scrollLeft;
};

const handleScrollEnd = () => {
  const scrollLeft = refContainer.value.scrollLeft;
  if (currentPositionX.value < scrollLeft) {
    return handleNext();
  }

  if (currentPositionX.value > scrollLeft) {
    return handlePrev();
  }
  return;
};

const handleScroll = (e) => {
  clearTimeout(scrollTimer.value); //TODO: CHANGE FOR SCROLLEND EVENT:  https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event
  return (scrollTimer.value = setTimeout(() => handleScrollEnd(), scrollDelay.value));
};

onMounted(() => {
  page.value = props.initialSlide;
});
</script>

<style lang="less">
.hub-swiper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    cursor: pointer;
  }

  .hub-swiper-container {
    list-style: none;
    margin: 0;
    scroll-behavior: smooth;
    padding: 15px 0;

    display: flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none;
  }
  .hub-swiper-container::-webkit-scrollbar {
    display: none;
  }

  .hub-swiper-pagination {
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
      background: transparent;
      border: none;
    }

    .bullets {
      span {
        width: 9px;
        height: 9px;
        display: inline-block;
        border-radius: 100%;
        border: 2px solid var(--text-primary);
        margin: 0 4px;
        background: var(--link-primary);
        opacity: 1;
        cursor: pointer;
      }

      span.active {
        background: var(--text-primary);
      }
    }
  }
}
</style>
