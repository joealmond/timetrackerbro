<script setup lang="ts">
import InputDateTime from './InputDateTime.vue';
import DisplayBlock from './DisplayMessageBlock.vue';
import { ref } from 'vue';

const message = ref('');

function showMessage(msg: string) {
  message.value = msg;
}

</script>

<template>
  <div class="bg-white/20 p-4 rounded-md shadow-sm">
    <InputDateTime @show-message="showMessage"/>
    <DisplayBlock :msg="message" />
  </div>
</template>
