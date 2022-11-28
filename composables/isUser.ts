type getUserInfo = {
    id: number;
    uid: string;
    family_name: string;
    given_name: string;
    email: string;
    password: string;
    created_at: any;
    updated_at: any;
  };

export default function isUser(value: unknown): value is getUserInfo {
     if (typeof value !== "object" || value === null) {
        return false;
    }

    const get_user_info = value as Record<keyof getUserInfo, unknown>;
    if (
        typeof get_user_info.id !== "number" &&
        typeof get_user_info.uid !== "string" &&
        typeof get_user_info.family_name !== "string" &&
        typeof get_user_info.given_name !== "string" &&
        typeof get_user_info.email !== "string" &&
        typeof get_user_info.password !== "string"
    ) {
        return false;
    }
    return true;
}