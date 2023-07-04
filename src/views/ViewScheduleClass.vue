<template>
  <div id="view-schedule-class">
    <schedule-mobile :attributes="attributesProp" :time-list="classes" @change="handleChangeDay">
      <template #head>
        <span></span>
      </template>
      <template #bottom="{ key, item }">
        <base-button v-if="!item.name" id="button" @click="handleModal(key)">Reservar</base-button>
      </template>
    </schedule-mobile>
    <procedure-modal v-if="procedureModal" @submit="handleSave" @close="handleModal(null)">
      <base-button id="button">Confirmar</base-button>
    </procedure-modal>
  </div>
</template>

<script setup>
import ScheduleMobile from '@/layouts/ScheduleMobile.vue';
import ProcedureModal from '@/layouts/Modais/ProcedureModal.vue';
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useSchedule } from '../composables/schedule.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();
const teacherOpenSchedule = useSchedule('openAppointments', route.params.id);
const teacherCloseSchedule = useSchedule('closeAppointments', route.params.id);
const studentCloseSchedule = useSchedule('closeAppointments', 'PGHkG6ZOLLPQL3RCJzhDHMNZUVx1');

const classes = reactive([]);
const procedureModal = ref(false);
const selectedSchedule = ref(null);

const attributesProp = reactive([
  {
    dates: teacherOpenSchedule.appointmentsDay,
    content: '',
    highlight: {
      class: 'highlight',
      content: 'white',
      fillMode: 'light',
      contentClass: 'italic'
    }
  },
  {
    dates: studentCloseSchedule.appointmentsDay,
    highlight: {
      content: 'white',
      color: 'red',
      fillMode: 'light',
      class: 'closed-day'
    }
  }
]);

const handleSave = async (procedure) => {
  const key = selectedSchedule.value;
  const classDate = classes[key].date.getDate();
  const result = studentCloseSchedule.appointmentsDay.value.find(
    (item) => item.getDate() === classDate
  );

  if (result) return console.log('Voce já tem um horário reservado nesse dia');

  const payload = {
    name: 'Horário reservado',
    date: classes[key].date
  };

  try {
    await Promise.all([
      handleTeacherAppointment(key, procedure),
      handleStudentAppointment(key, procedure)
    ]);
    classes.splice(key, 1);
    classes.push(payload);
    return handleModal();
  } catch (e) {
    console.log(e);
  }
};

const handleTeacherAppointment = async (index, procedure) => {
  const payload = {
    name: userStore.user.name,
    date: classes[index].date,
    procedure: procedure.name,
    observation: procedure.observation
  };

  return await teacherCloseSchedule
    .saveAppointments([payload])
    .then(teacherOpenSchedule.deleteAppointments(classes[index].id));
};

const handleStudentAppointment = async (index, procedure) => {
  const payload = {
    name: 'Horario reservado',
    date: classes[index].date,
    procedure: procedure.name
  };
  return await studentCloseSchedule
    .saveAppointments([payload])
    .then(teacherOpenSchedule.deleteAppointments(classes[index].id));
};

const handleChangeDay = async (date) => {
  classes.length = 0;
  const teacherDate = await teacherOpenSchedule.getHourClasses(date);
  const studentData = await studentCloseSchedule.getHourClasses(date);

  let list = studentData.length ? studentData : teacherDate;

  return classes.push(...list);
};

const handleModal = async (key) => {
  procedureModal.value = !procedureModal.value;
  selectedSchedule.value = key;
};
</script>

<style lang="less" scoped>
#view-schedule-class {
  width: 100%;
  padding-top: 3rem;

  #button {
    position: relative;
    left: 55%;
    width: 10rem;
    font-size: 1.6rem;
    padding: 1.5rem;
  }
  .head {
    h2 {
      color: var(--text-primary);
      font-size: 2.8rem;
      margin-bottom: 2rem;
    }

    p {
      font-size: 2rem;
    }

    margin-bottom: 2.4rem;
  }
}
</style>
