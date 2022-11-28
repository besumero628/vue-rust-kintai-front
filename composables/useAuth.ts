import { Auth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";

export function useAuth(auth: Auth = getAuth()) {
    const user = ref<User | null>(auth.currentUser);
    const isAuthed = computed(() => !!user.value);

    auth.onIdTokenChanged((authUser) => (user.value = authUser))

    async function checkAuthState() {
        try {
            const _user = await _checkAuthState(auth);
            user.value = _user;
        } catch (error) {
            user.value = null
        }
    }

    return { isAuthed, checkAuthState }
}

export async function signout() {
    const router = useRouter();
    const auth = getAuth();
    const res = await signOut(auth).then((auth) => {
        router.push("/login")
    }).catch((e) => {
        console.log(e)
    })
}

async function _checkAuthState(auth: Auth) {
    return new Promise<User | null>((resolve, reject) => {
        if (process.server) return resolve(null);
        onAuthStateChanged(
            auth,
            (user) => resolve(user || null),
            (error) => reject(error)
        )
    })
}