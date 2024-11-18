<template>
  <VDatePicker
    v-model.range="range"
    :mode="mode"
    is24hr
    :rules="rules"
    :max-date="new Date()"
    @update:model-value="updateMessage"
    class="border border-gray-300 rounded p-2"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { type Ref, ref, watch, nextTick } from 'vue';
import { type DatePartsRules, type Emits } from './types';

const MINUTES_IN_HOUR = 60;
const MAX_HOURS = 12;
const MINUTE_INTERVAL = 15;

const MESSAGE = {
  NO_SELECTION: 'No selection..',
  LOG_HOURS: (hours: number, minutes: number) => {
    if (hours === 0 && minutes === 0) {
      return MESSAGE.NO_SELECTION;
    }
    if (hours > 0 && minutes > 0) {
      return `Log ${hours} hours and ${minutes} minutes?`;
    }
    if (hours > 0) {
      return `Log ${hours} hours?`;
    }
    return `Log ${minutes} minutes?`;
  },
};

const emit = defineEmits<Emits>();

const range = ref({
  start: dayjs().startOf('minute').toDate(),
  end: dayjs().startOf('minute').toDate(),
});

const mode = ref('dateTime');

const rules: Ref<DatePartsRules[]> = ref([
  {
    minutes: {
      max: Math.round(dayjs().minute() / MINUTE_INTERVAL) * MINUTE_INTERVAL,
      interval: MINUTE_INTERVAL,
    },
  },
  {
    minutes: {
      max: Math.round(dayjs().minute() / MINUTE_INTERVAL) * MINUTE_INTERVAL,
      interval: MINUTE_INTERVAL,
    },
  },
]);

function checkRange(newRangeStart: Date, newRangeEnd: Date): void {
  const startTime = dayjs(newRangeStart);
  const endTime = dayjs(newRangeEnd);
  if (endTime.diff(startTime, 'minute') > MAX_HOURS * MINUTES_IN_HOUR) {
    // TODO: implement ui solution for warnings
    alert('The maximum range is limited to 12 hours.');
    nextTick(() => {
      range.value = {
        start: startTime.toDate(),
        end: startTime.add(MAX_HOURS, 'hour').toDate(),
      };
    });
  }
}

function updateRules(
  rulesStart: DatePartsRules,
  rulesEnd: DatePartsRules,
  newRange: { start: Date; end: Date },
): void {
  const isToday = dayjs(newRange.end).isSame(dayjs(), 'day');
  const endHour = dayjs(newRange.end).hour();

  const maxMinutes = isToday
    ? Math.round(dayjs().minute() / MINUTE_INTERVAL) * MINUTE_INTERVAL
    : 59;

  rulesStart.hours = isToday ? { max: endHour } : {};
  rulesEnd.hours = isToday ? { max: endHour } : {};
  rulesStart.minutes = { max: maxMinutes, interval: MINUTE_INTERVAL };
  rulesEnd.minutes = { max: maxMinutes, interval: MINUTE_INTERVAL };

  if (isToday) {
    emit('show-message', MESSAGE.LOG_HOURS(endHour, maxMinutes));
  } else {
    const hours = dayjs(newRange.end).diff(dayjs(newRange.start), 'hours');
    const minutes = dayjs(newRange.end).diff(dayjs(newRange.start), 'minutes') % 60;
    emit('show-message', MESSAGE.LOG_HOURS(hours, minutes));
  }
}

function updateMessage() {
  const startTime = dayjs(range.value.start);
  const endTime = dayjs(range.value.end);
  const hours = endTime.diff(startTime, 'hours');
  const minutes = endTime.diff(startTime, 'minutes') % 60;

  emit(
    'show-message',
    hours >= 0 && minutes >= 0 ? MESSAGE.LOG_HOURS(hours, minutes) : MESSAGE.NO_SELECTION,
  );
}

watch(
  range,
  (newRange) => {
    checkRange(newRange.start, newRange.end);
    updateRules(rules.value[0], rules.value[1], newRange);
    updateMessage();
  },
  { deep: true },
);
</script>
