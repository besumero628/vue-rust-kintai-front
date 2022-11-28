<template>
  <label v-bind:for="for" class="form-label">{{ name }}</label>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  for: string;
}

const Props = withDefaults(defineProps<Props>(), {
  name: "",
  for: ""
});
</script>
