<script setup lang="ts">

interface Props {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
});

defineEmits<{
  (e: 'click'): void
}>()

</script>

<template>
  <button
    :type="type"
    :class="[
      'font-medium',
      'rounded-md',
      'transition',
      'px-4 py-3 text-base',
      'border-4',
      'text-white',
      'forn-bold',
      variant === 'primary' ? 'bg-green-custom hover:bg-green-custom-dark' : '',
      variant === 'secondary' ? 'bg-green-800 hover:bg-green-900' : '',
      variant === 'danger' ? 'bg-red-500 hover:bg-red-700' : '',
    ]"
    @click="$emit('click')"
  >
  {{ label }}
  </button>
</template>

<style scoped>
.bg-green-custom {
  background-color: hsla(160, 100%, 37%, 1);
}

.hover\:bg-green-custom-dark:hover {
  background-color: hsla(160, 100%, 25%, 1);
}
</style>
