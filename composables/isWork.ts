type getUserAttendance = {
    id: number,
    user_id: number,
    stamp_type_id: number,
    stamp: any,
    created_at: any,
    updated_at: any
}

export function isWorks(value: unknown): value is Array<getUserAttendance> {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const get_user_attendance = value as Array<Record<keyof getUserAttendance, unknown>>
    if (
        get_user_attendance[0] == null ||
        (
            typeof get_user_attendance[0].id !== "number" &&
            typeof get_user_attendance[0].user_id !== "number" &&
            typeof get_user_attendance[0].stamp_type_id !== "number"
        )
    ) {
        return false
    }
    return true
}