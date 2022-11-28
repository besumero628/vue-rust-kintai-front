import { Auth } from "firebase/auth";
import type { Ref } from "vue";

// stamp_type
// 1 | check in
// 2 | break start
// 3 | break finish
// 4 | check out

const url = "http://localhost:8080";

export function work() {

    async function checkIn(user_id: number) {
        const now = new Date()
        const res = await useAsyncData('punchIn', () =>
            $fetch(
                url + "/work", {
                method: "POST",
                params: {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate(),
                    hour: now.getHours(),
                    min: now.getMinutes()
                },
                body: {
                    user_id: user_id,
                    stamp_type_id: 1
                }
            }
            ),
            {
                initialCache: false
            }
        )
        return res.data.value
    }

    async function breakIn(user_id: number) {
        const now = new Date()
        const res = await useAsyncData('breakIn', () =>
            $fetch(
                url + "/work", {
                method: "POST",
                params: {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate(),
                    hour: now.getHours(),
                    min: now.getMinutes()
                },
                body: {
                    user_id: user_id,
                    stamp_type_id: 2
                }
            }
            ),
            {
                initialCache: false
            }
        )
        return res.data.value
    }

    async function breakOut(user_id: number) {
        const now = new Date()
        const res = await useAsyncData('breakOut', () =>
            $fetch(
                url + "/work", {
                method: "POST",
                params: {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate(),
                    hour: now.getHours(),
                    min: now.getMinutes()
                },
                body: {
                    user_id: user_id,
                    stamp_type_id: 3
                }
            }
            ),
            {
                initialCache: false
            }
        )
        return res.data.value
    }


    async function checkOut(user_id: number) {
        const now = new Date()
        const res = await useAsyncData('punchOut', () =>
            $fetch(
                url + "/work", {
                method: "POST",
                params: {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate(),
                    hour: now.getHours(),
                    min: now.getMinutes()
                },
                body: {
                    user_id: user_id,
                    stamp_type_id: 4
                }
            }
            ),
            {
                initialCache: false
            }
        )
        return res.data.value
    }

    return { checkIn, checkOut, breakIn, breakOut }
}

export async function getUserID(auth: Auth) {
    const { data: res } = await useFetch(url + "/user", {
        method: "GET",
        params: {
            uid: auth.currentUser?.uid
        }
    })

    if (isUser(res.value)) {
        return res.value.id
    }
    return 0
}

export const getAttendanceList = () => {
    const attendanceList: Ref<Object> = useState('attendanceList', () => {
        return { "error": "データの取得に失敗しました" }
    })

    const updateAttendanceList = (attendanceList: Ref<Object>) => async (user_id: number, year: number, month: number) => {
        const dateList = new Array(31).fill([]).map((stampList) => {
            stampList = new Array(4).fill(false)
            return stampList
        })

        const res = await useAsyncData('res', () =>
            $fetch(
                url + "/work", {
                method: "GET",
                params: {
                    user_id: user_id,
                    year: year,
                    month: month
                }
            }
            ),
            {
                initialCache: false
            }
        )


        if (isWorks(res.data.value)) {
            res.data.value.map((attendance) => {
                const gmt_stamp = new Date(attendance["stamp"])
                const local_stamp = gmt_stamp.setHours(gmt_stamp.getHours() + 9);
                const attendance_stamp = new Date(local_stamp);
                const a_day = attendance_stamp.getDate();
                dateList[a_day][attendance["stamp_type_id"] - 1] = attendance_stamp
            })
            attendanceList.value = dateList
            console.log(attendanceList)
        } else {
            attendanceList.value = dateList
            console.log(attendanceList)
        }
    }
    return {
        attendanceList: readonly(attendanceList),
        updateAttendanceList: updateAttendanceList(attendanceList),
    }
}