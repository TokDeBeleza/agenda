import { computed, onBeforeMount, reactive } from 'vue';
import ScheduleService from '../service/ScheduleService';

export function useSchedule(schedule, id) {
  const scheduleService = new ScheduleService(schedule, id);
  const appointments = reactive([]);

  const appointmentsDay = computed(() => {
    const dictionaryDate = appointments.value.reduce((acc, current) => {
      acc[current.date.getDate()] = current.date;
      return acc;
    }, {});

    return Object.values(dictionaryDate);
  });

  const saveAppointments = async (payload) => {
    await scheduleService.postAppointments(payload);
    appointments.value.push(...payload);
    return appointments.value;
  };
  const deleteAppointments = async (item) => {
    return await scheduleService.deleteAppointments(item);
  };
  const getAppointments = async () => {
    const resp = await scheduleService.getAppointments();
    return parseDates(resp?.body);
  };

  const getHourClasses = async (day) => {
    const resp = await scheduleService.getClasses(day);
    return parseDates(resp?.body);
  };

  const getNextClasses = async (day) => {
    const resp = await scheduleService.getNextClasses(day);
    return parseDates(resp?.body);
  };

  const parseDates = (array = []) => {
    return array.map((item) => {
      item.date = new Date(item.date.seconds * 1000);
      return item;
    });
  };

  onBeforeMount(async () => {
    appointments.value = await getAppointments();
  });

  return {
    appointments: appointments,
    appointmentsDay: appointmentsDay,
    saveAppointments,
    deleteAppointments,
    getAppointments,
    getHourClasses,
    getNextClasses
  };
}
