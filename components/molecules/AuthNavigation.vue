<template>
  <div v-if="loginStatus">
    <AtomsDefaultButton name="Mypage" @parentFunction="my_page" />
    <AtomsDefaultButton name="Sign Out" @parentFunction="sign_out" />
  </div>
  <div v-else>
    <AtomsDefaultButton name="Sign Up" @parentFunction="sign_up" />
    <AtomsDefaultButton name="Login" @parentFunction="login" />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~~/composables/useAuth";
const { isAuthed, checkAuthState } = useAuth();
await checkAuthState();
const loginStatus = isAuthed.value;

const my_page = () => {
  useRouter().push("/mypage")
}
const sign_up = () => {
  useRouter().push("/signup");
};
const login = () => {
  useRouter().push("/login")
};
const sign_out = () => {
  signout();
};
</script>