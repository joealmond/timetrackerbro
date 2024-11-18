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
import dayjs from 'dayjs'
import { type Ref, ref, watch, nextTick } from 'vue'
import { type DatePartsRules, type Emits } from './types'

const MINUTES_IN_HOUR = 60
const MAX_HOURS = 12
const MINUTE_INTERVAL = 15
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

const emit = defineEmits<Emits>()

const range = ref({
  start: new Date(),
  end: new Date(),
})

const mode = ref('dateTime')

const rules: Ref<DatePartsRules[]> = ref([
  {
    minutes: {
      max: Math.round(new Date().getMinutes() / MINUTE_INTERVAL) * MINUTE_INTERVAL,
      interval: MINUTE_INTERVAL,
    },
  },
  {
    minutes: {
      max: Math.round(new Date().getMinutes() / MINUTE_INTERVAL) * MINUTE_INTERVAL,
      interval: MINUTE_INTERVAL,
    },
  },
])

function checkRange(newRangeStart: Date, newRangeEnd: Date): void {
  const startTime = dayjs(newRangeStart)
  const endTime = dayjs(newRangeEnd)
  if (endTime.diff(startTime, 'minute') > MAX_HOURS * MINUTES_IN_HOUR) {
    alert('The maximum range is limited to 12 hours.')
    nextTick(() => {
      range.value = {
        start: startTime.toDate(),
        end: startTime.add(MAX_HOURS, 'hour').toDate(),
      }
    })
  }
}

function updateRules(
  rulesStart: DatePartsRules,
  rulesEnd: DatePartsRules,
  newRange: { start: Date; end: Date },
): void {
  const isToday = dayjs(newRange.end).isSame(dayjs(), 'day')

  const currentHour = isToday ? dayjs(newRange.end).hour() : undefined

  const maxMinutes = isToday
    ? Math.round(dayjs().minute() / MINUTE_INTERVAL) * MINUTE_INTERVAL
    : Math.round(dayjs(newRange.end).minute() / MINUTE_INTERVAL) * MINUTE_INTERVAL

  rulesStart.hours = isToday ? { max: currentHour } : {}
  rulesEnd.hours = isToday ? { max: currentHour } : {}
  rulesStart.minutes = { max: maxMinutes, interval: MINUTE_INTERVAL }
  rulesEnd.minutes = { max: maxMinutes, interval: MINUTE_INTERVAL }

  if (isToday) {
    if (currentHour !== undefined) {
      emit('show-message', MESSAGE.LOG_HOURS(currentHour, maxMinutes))
    } else {
      console.error('currentHour is undefined unexpectedly!')
    }
  }
}

function updateMessage() {
  const startTime = dayjs(range.value.start)
  const endTime = dayjs(range.value.end)
  const hours = endTime.diff(startTime, 'hours')
  const minutes = endTime.diff(startTime, 'minutes') % 60

  emit(
    'show-message',
    hours > 0 || minutes > 0 ? MESSAGE.LOG_HOURS(hours, minutes) : MESSAGE.NO_SELECTION,
  )
}

watch(
  range,
  (newRange) => {
    checkRange(newRange.start, newRange.end)
    updateRules(rules.value[0], rules.value[1], newRange)
  },
  { deep: true },
)
</script>
