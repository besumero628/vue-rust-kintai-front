<template>
  <div class="row">
    <div class="mt-5 col-12 attendanceTable">
      <div class="mt-3 p-1">
        <div>
          <i @click="cheange_target_date(-1)" class="bi bi-caret-left-fill"></i>
          <template v-if="(target_now.getMonth() + 1) < 10">
            {{ target_now.getFullYear() }}/0{{ target_now.getMonth() + 1 }}
          </template>
          <template v-else>
            {{ target_now.getFullYear() }}/{{ target_now.getMonth() + 1 }}
          </template>
          <i @click="cheange_target_date(1)"  class="bi bi-caret-right-fill"></i>
          <i @click="reset_target_date()" class="bi bi-arrow-clockwise"></i>
        </div>
      </div>
      <table class="table mt-3">
        <thead>
          <tr>
            <template v-for="title in ths" :key="title">
              <th scope="col">
                <div class="text-center">
                  {{ title }}
                </div>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="i in last_day.getDate()" :key="i">
            <tr>
              <td scope="col">
                <div class="text-center">
                  {{ i }}
                </div>
              </td>
              <template v-for="k in 4" :key="k">
                <td>
                  <template v-if="attendanceList[i][k-1] == false">
                    <div class="text-center">
                      -
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      {{ toDoubleDigits(attendanceList[i][k-1].getHours()) }}:{{toDoubleDigits(attendanceList[i][k-1].getMinutes())}}
                    </div>
                  </template>
                </td>
              </template>
              <td scope="col">
                <div class="text-center">
                  <MoleculesAttendanceModal :year=target_now.getFullYear() :month=(target_now.getMonth()+1) :day=i />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAuth } from "@firebase/auth";

function toDoubleDigits(num: Number) {
  let target = num.toString();
  if (target.length === 1) {
    target = "0" + target;
  }
  return target;
}

const ths = [
  "日付",
  "出勤",
  "休憩開始",
  "休憩終了",
  "退勤",
  "詳細",
];
const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

const auth = getAuth();
const current_user_id = await getUserID(auth);
const now = new Date();
const target_now = ref(now);
const last_day = ref(new Date(target_now.value.getFullYear(), target_now.value.getMonth() + 1, 0))


const { attendanceList, updateAttendanceList } = getAttendanceList();
await updateAttendanceList(current_user_id, target_now.value.getFullYear(), target_now.value.getMonth() + 1);

const cheange_target_date = async (move: number) => {
  target_now.value = new Date(
    target_now.value.setMonth(target_now.value.getMonth() + move)
  )
  await updateAttendanceList(current_user_id, target_now.value.getFullYear(), target_now.value.getMonth() + 1);
}
const reset_target_date = async () => {
  target_now.value = new Date()
  await updateAttendanceList(current_user_id, target_now.value.getFullYear(), target_now.value.getMonth() + 1);
}



</script>

<style scoped>
.attendanceTable {
  background-color: white;
}
.atGroup {
  width: 150px;
}
.table {
  border-top: 2px solid rgb(0, 192, 171);
  border-bottom: 2px solid rgb(0, 192, 171);
  color: gray;
}
</style>