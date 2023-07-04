<template>
  <section id="view-create-class">
    <schedule-mobile
      :attributes="attributesProp"
      :time-list="formattedClasses"
      @open="modalStatus.edit = true"
      @change="handleChangeDay"
    >
      <template #head="{ key }">
        <img
          v-if="!isScheduled(key)"
          src="@/assets/close-icon.svg"
          alt="close icon"
          @click="handleRemove(key)"
        />
        <img v-else src="@/assets/info-icon.svg" alt="close icon" @click="handleInfo(key)" />
      </template>
    </schedule-mobile>
    <edit-modal
      v-if="modalStatus.edit"
      :selected-day="selectedDay"
      @close="modalStatus.edit = false"
      @save="handleSaveHours"
    />
    <procedure-modal
      v-if="modalStatus.procedure"
      :procedure="selectedAppointment.procedure"
      :observation="selectedAppointment.observation"
      @close="modalStatus.procedure = false"
      @submit="handleCancel"
    >
      <!--       <base-button id="button">Cancelar</base-button> -->
    </procedure-modal>
  </section>
</template>

<script setup>
import ScheduleMobile from '@/layouts/ScheduleMobile.vue';
import EditModal from '@/layouts/Modais/EditModal.vue';
import ProcedureModal from '@/layouts/Modais/ProcedureModal.vue';
import { ref, reactive, computed, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { useSchedule } from '../composables/schedule.js';
import moment from 'moment/min/moment-with-locales';

moment.locale('pt');

const userStore = useUserStore();
const route = useRoute();
const openSchedule = useSchedule('openAppointments', route.params.id);
const closeSchedule = useSchedule('closeAppointments', route.params.id);

const selectedDay = ref(null);
const selectedAppointment = reactive({});

const modalStatus = reactive({
  edit: false,
  procedure: false
});

let classes = reactive([]);

const attributesProp = reactive([
  {
    dates: closeSchedule.appointmentsDay,
    highlight: {
      content: 'white',
      color: 'red',
      fillMode: 'light',
      class: 'closed-day'
    }
  },
  {
    dates: openSchedule.appointmentsDay,
    highlight: {
      class: 'highlight',
      content: 'white',
      fillMode: 'light',
      contentClass: 'italic'
    }
  }
]);

const formattedClasses = computed(() => {
  return classes?.map((item) => item).sort((a, b) => a.date - b.date);
});

const handleChangeDay = async (date) => {
  classes.length = 0;
  const openData = await openSchedule.getHourClasses(date);
  const closeData = await closeSchedule.getHourClasses(date);
  classes.push(...openData, ...closeData);
  return (selectedDay.value = date);
};

const handleSaveHours = async (date) => {
  const a = await openSchedule.saveAppointments(date);
  classes.push(...date);
  return (modalStatus.edit = false);
};

const handleRemove = (key) => {
  openSchedule.deleteAppointments(formattedClasses.value[key].id);
  classes.splice(classes.indexOf(formattedClasses.value[key]), 1);
  return;
};

const handleInfo = (key) => {
  const selected = formattedClasses.value[key];
  selectedAppointment.procedure = userStore?.user?.procedures?.findIndex(
    (item) => selected.procedure === item
  );
  selectedAppointment.observation = selected.observation;
  return (modalStatus.procedure = true);
};

const handleCancel = (key) => {
  console.log(key);
};

const isScheduled = (key) => {
  return formattedClasses.value[key]?.day;
};
</script>

<style lang="less" scoped>
#view-create-class {
  width: 100%;
  margin-top: 3rem;

  .date-container {
    display: flex;
    justify-content: flex-start;
  }

  .vc-container {
    transform: scale(0.25);
    position: absolute;
    top: -8%;
    right: 14%;

    .vc-focus {
      border: none;
    }
  }

  h2 {
    color: var(--text-primary);
    font-size: 2.8rem;
    margin-bottom: 2rem;
  }

  .next-classes {
    margin-bottom: 2rem;
  }

  .calendar {
    margin-bottom: 5rem;
  }

  .button {
    transform: scale(0.233);
    position: relative;
    top: -26.6px;
    left: 22%;
  }

  .bullets {
    padding-top: 1rem;
  }
}
</style>
