<template>
  <button
    @click="$emit('parentFunction')"
    type="button"
    class="btn btn-light m-2 mt-0"
    v-bind:class="{'color-on': color == true, 'color-off': color == false }"
  >
    {{ name }}
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  name: string;
  color: Boolean | true;
}

const buttonProps = withDefaults(defineProps<ButtonProps>(), {
  name: "",
  color: true,
});
</script>

<style scoped>
.btn:hover {
  background-color:  rgb(0, 192, 171);
  color: white;
}
.btn-light {
  width: 120px;
}
.color-on {
  color: rgb(0, 192, 171);
}
.color-off {
  color: gray;
}
</style>