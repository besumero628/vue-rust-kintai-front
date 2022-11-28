<template>
  <div class="card mt-5 me-2">
    <div class="card-body">
      <div>
        <h5>{{ now.year }}/{{ now.month }}/{{ now.date }}</h5>
      </div>
      <div class="currentTime text-center mt-2">
        <span class="fs-1 fw-bold"
          >{{ now.hours }}:{{ now.minutes }}:{{ now.seconds }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function toDoubleDigits(num: Number) {
  let target = num.toString();
  if (target.length === 1) {
    target = "0" + target;
  }
  return target;
}

const now = ref({
  target: new Date(),
  year: "",
  month: "",
  date: "",
  hours: "",
  minutes: "",
  seconds: "",
});
setInterval(() => {
  now.value.target = new Date();
  now.value.year = toDoubleDigits(now.value.target.getFullYear());
  now.value.month = toDoubleDigits(now.value.target.getMonth() + 1);
  now.value.date = toDoubleDigits(now.value.target.getDate());
  now.value.hours = toDoubleDigits(now.value.target.getHours());
  now.value.minutes = toDoubleDigits(now.value.target.getMinutes());
  now.value.seconds = toDoubleDigits(now.value.target.getSeconds());
}, 1000);
</script>

<style scoped>
.card {
  background-color: rgb(white);
  width: 300px;
}
</style>