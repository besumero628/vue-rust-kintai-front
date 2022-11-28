<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    class="form-control"
    @input="updateValue"
  />
</template>

<script setup>
// interface Props {
//   type: string;
//   placeholder: string;
// }

// const Props = withDefaults(defineProps<Props>(), {
//   type: "",
//   placeholder: "",
// });

const props = defineProps({
  modelValue: {type: String},
  type: {type: String},
  placeholder: {type: String}
})

const emit = defineEmits();
const updateValue = (e) => {
  emit("update:modelValue", e.target.value)
}

</script>