<template>
  <div class="attendanceNavigation mt-5 p-0 pt-3">
    <AtomsAttendanceButton @parentFunction="check_in" name="出勤" v-bind:color="true" />
    <AtomsAttendanceButton @parentFunction="check_out" name="退勤" v-bind:color="true" />
    <AtomsAttendanceButton
      @parentFunction="break_in"
      name="休憩開始"
      v-bind:color="false"
    />
    <AtomsAttendanceButton
      @parentFunction="break_out"
      name="休憩終了"
      v-bind:color="false"
    />
  </div>
</template>
<script setup lang="ts">
import { getAuth } from "@firebase/auth";

const auth = getAuth();
const current_user_id = await getUserID(auth);
const { checkIn, checkOut, breakIn, breakOut } = work();
const { updateAttendanceList } = getAttendanceList();

const check_in = async function check_in() {
  await checkIn(current_user_id);
  const now = new Date();
  await updateAttendanceList(
    current_user_id,
    now.getFullYear(),
    now.getMonth() + 1
  );
};
const check_out = async function check_in() {
  await checkOut(current_user_id);
  const now = new Date();
  await updateAttendanceList(
    current_user_id,
    now.getFullYear(),
    now.getMonth() + 1
  );
};
const break_in = async function check_in() {
  await breakIn(current_user_id);
  const now = new Date();
  await updateAttendanceList(
    current_user_id,
    now.getFullYear(),
    now.getMonth() + 1
  );
};
const break_out = async function check_in() {
  await breakOut(current_user_id);
  const now = new Date();
  await updateAttendanceList(
    current_user_id,
    now.getFullYear(),
    now.getMonth() + 1
  );
};
</script>
<style scoped>
.attendanceNavigation {
  width: 280px;
}
</style>