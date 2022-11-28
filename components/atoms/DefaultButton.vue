<template>
  <button @click="$emit('parentFunction')" type="button" class="btn btn-light">
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
.btn-light {
  color: rgb(0, 192, 171);
  margin-right: 8px;
}
</style>