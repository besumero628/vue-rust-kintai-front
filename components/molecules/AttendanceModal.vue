<template>
  <div v-if="edit_modal_flag">
    <div class="modal" v-on:click.self="edit_modal_flag = false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ year }}/{{ month }}/{{ day }}</h4>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="edit_modal_flag = false"
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="row text-left">
              <i class="bi bi-info-circle col-1"></i>
              勤怠を「変更」する場合は時間を入力してください
            </div>
            <div class="row text-left">
              <i class="bi bi-info-circle col-1"></i>
              勤怠を「削除」する場合は時間の入力は不要です
            </div>
            <table class="table mt-3">
              <tr>
                <template v-for="title in th" :key="title">
                  <th>{{ title }}</th>
                </template>
              </tr>
              <tr>
                <template v-for="i in 4" :key="i">
                  <th>
                    <template v-if="attendanceList[day][i - 1]">
                      {{
                        toDoubleDigit(attendanceList[day][i - 1].getHours())
                      }}
                      :
                      {{ toDoubleDigit(attendanceList[day][i - 1].getDate()) }}
                    </template>
                    <template v-else> - </template>
                  </th>
                </template>
              </tr>
            </table>
            <form>
              <div class="row">
                <div class="col-4">
                  <AtomsFormLabel name="種別" />
                  <select class="form-select" v-model="post_data.stamp_type">
                    <template v-for="title in th" :key="title">
                      <option>{{ title }}</option>
                    </template>
                  </select>
                </div>
                <div class="col-4">
                  <AtomsFormLabel name="Hour." />
                  <select class="form-select" v-model="post_data.hour">
                    <template v-for="h in 24" :key="h">
                      <option>{{ h - 1 }}</option>
                    </template>
                  </select>
                </div>
                <div class="col-4">
                  <AtomsFormLabel name="Min." />
                  <select class="form-select" v-model="post_data.min">
                    <template v-for="m in 60" :key="m">
                      <option>{{ m - 1 }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-6">
                  <button @click="changeAttendance" class="btn btn-primary">
                    Change
                  </button>
                </div>
                <div class="col-6">
                  <button @click="deleteAttendance" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-link btn-sm p-0" @click="modalOn()">
    詳細
  </button>
</template>

<script setup lang="ts">
import { getAuth } from "@firebase/auth";

interface AttendanceProps {
  year: string;
  month: string;
  day: string;
}

const attendanceProps = withDefaults(defineProps<AttendanceProps>(), {
  year: "",
  month: "",
  day: "",
});

const post_data = ref({
  stamp_type: "",
  hour: "",
  min: "",
});

const th = ["出勤", "休憩開始", "休憩終了", "退勤"];

const { attendanceList, updateAttendanceList } = getAttendanceList();

const edit_modal_flag = ref(false);
const edit_date_attendance = ref(new Date());
const modalOn = () => {
  edit_modal_flag.value = !edit_modal_flag.value;
};
const url = "http://localhost:8080";
const auth = getAuth();
const current_user_id = await getUserID(auth);

const changeAttendance = async () => {
  if (
    post_data.value.stamp_type == "" ||
    post_data.value.hour == "" ||
    post_data.value.min == ""
  ) {
    return;
  }
  let stamp_id = 1;
  if (post_data.value.stamp_type == "出勤") {
    stamp_id = 1;
  } else if (post_data.value.stamp_type == "休憩開始") {
    stamp_id = 2;
  } else if (post_data.value.stamp_type == "休憩終了") {
    stamp_id = 3;
  } else if (post_data.value.stamp_type == "退勤") {
    stamp_id = 4;
  }
  const res = await useAsyncData('change', () =>
      $fetch(
          url + "/work", {
          method: "PUT",
          cache: 'no-cache',
          params: {
            year: attendanceProps.year,
            month: attendanceProps.month,
            day: attendanceProps.day,
            hour: post_data.value.hour,
            min: post_data.value.min
          },
          body: {
              user_id: current_user_id,
              stamp_type_id: stamp_id,
          }
      }
      ),
      {
          initialCache: false,
      }
  )
};

const deleteAttendance = async () => {
  if (post_data.value.stamp_type == "") {
    return;
  }
  let stamp_id = 1;
  if (post_data.value.stamp_type == "出勤") {
    stamp_id = 1;
  } else if (post_data.value.stamp_type == "休憩開始") {
    stamp_id = 2;
  } else if (post_data.value.stamp_type == "休憩終了") {
    stamp_id = 3;
  } else if (post_data.value.stamp_type == "退勤") {
    stamp_id = 4;
  }
  const res = await useAsyncData(
    "change",
    () =>
      $fetch(url + "/work", {
        method: "DELETE",
        cache: "no-cache",
        body: {
          user_id: current_user_id,
          stamp_type_id: stamp_id,
        },
      }),
    {
      initialCache: false,
    }
  );
};

function toDoubleDigit(num: Number) {
  let target = num.toString();
  if (target.length === 1) {
    target = "0" + target;
  }
  return target;
}
</script>


<style scoped>
.modal {
  display: block;
}
.com {
  width: 50px;
}
.cr_td {
  margin-left: 12px;
}
.cl_td {
  margin-right: 12px;
}
.table {
  border-top: 2px solid rgb(0, 192, 171);
  border-bottom: 2px solid rgb(0, 192, 171);
  color: gray;
}
th {
  border-bottom: 1px solid gray;
}
</style>