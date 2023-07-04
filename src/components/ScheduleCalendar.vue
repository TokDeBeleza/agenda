<template>
  <div id="schedule-calendar">
    <div class="calendar">
      <v-calendar
        class="custom-calendar"
        :attributes="attributesProp"
        :min-date="new Date()"
        disable-page-swipe
        expanded
      >
        <template v-slot:day-content="{ day }">
          <div class="calendar-day" @click="$emit('open', day.date)">
            <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
            <div class="flex-grow overflow-y-auto overflow-x-auto"></div>
          </div>
        </template>
      </v-calendar>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  attributesProp: Array,
  idUser: String
});

defineEmits(['open']);
</script>

<style lang="less">
#schedule-calendar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .side-bar {
    background-color: white;
    border: 1px solid #cbd5e1;
    width: 30%;

    p {
      text-align: center;
      padding: 1.5rem;
      border-bottom: 1px solid #cbd5e1;
      font-size: 2rem;
    }
  }

 
}
</style>
