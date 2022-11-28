import { useAuth } from "~~/composables/useAuth"

export default defineNuxtRouteMiddleware(async () => {
    if (!process.server) {
        const {isAuthed, checkAuthState} = useAuth();
        await checkAuthState();
        if (!isAuthed.value) {
            return await navigateTo({path:'/login'}, {replace: true})
        }
    }
})