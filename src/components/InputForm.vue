<script setup lang="ts">
import dayjs from 'dayjs';
import InputDateTime from './InputDateTime.vue';
import DisplayBlock from './DisplayMessageBlock.vue';
import Button from './Button.vue';
import { ref } from 'vue';

const message = ref('');
const dateTimeInput = ref<InstanceType<typeof InputDateTime> | null>(null);

function showMessage(msg: string) {
  message.value = msg;
}

async function handleSubmit() {

  const dateTimeData = await dateTimeInput.value?.getDateTimeData();

  if (dateTimeData) {
    const startTime = dayjs(dateTimeData.startDateTime);
    const endTime = dayjs(dateTimeData.endDateTime);

    if (startTime.isSame(endTime)) {
          // TODO: warning may be?
      console.log('not submitted')
      return;
    }
    // TODO: message
    console.log('submitted')
}
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white/20 p-4 rounded-md shadow-sm">
    <InputDateTime ref="dateTimeInput" @show-message="showMessage"/>
    <DisplayBlock :msg="message" />
    <Button label="Submit" type="submit" class="w-full"/>
  </form>
</template>
