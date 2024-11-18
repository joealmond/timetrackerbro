<template>
  <div class="mb-4">
    <div class="flex items-center bg-white/100 p-4 rounded-md shadow-sm">
      <h1 class="block text-black/80 font-bold mr-2 w-full" >{{ msg }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
