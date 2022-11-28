<template>
  <button @click="$emit('parentFunction')" type="submit" class="btn btn-light">
    {{ name }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}

const Props = withDefaults(defineProps<Props>(), {
  name: "",
});
</script>

<style scoped>
.btn {
  background-color: rgb(0, 192, 171);
  color: white;
  width: 100%;
}
</style>