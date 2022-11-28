<template>
  <form>
    <div class="mb-3">
      <AtomsFormLabel for="email" name="Email" />
      <AtomsFormInput type="email" placeholder="test@exapmle.com" v-model="login_user.email"/>
    </div>
    <div class="mb-3">
      <AtomsFormLabel for="password" name="Password" />
      <AtomsFormInput type="password" placeholder="********" v-model="login_user.password"/>
    </div>
    <div class="mb-3 error-wrap">
      <p class="error_message">{{error}}</p>
    </div>
  </form>
  <div class="mt-5 mb-3">
    <AtomsSubmitButton @parentFunction="login" name="LOGIN" />
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const login_user = ref({
  email: "",
  password: "",
})
const error = ref("");

const login = async () => {
  const auth = getAuth();
  const res = await signInWithEmailAndPassword(
    auth,
    login_user.value.email,
    login_user.value.password
  ).then(() => {
    error.value = ""
  }
  ).catch((e) => {
    error.value = ((code) => {
      switch (code) {
        case "auth/user-not-found":
          return "メールアドレスが間違っています";
        case "auth/wrong-password":
          return "※パスワードが正しくありません";
        default:
          return "※メールアドレスとパスワードをご確認ください";
      }
    })(e.code);
  });
  if (error.value == "") {
    const router = useRouter();
    router.push("/");
  }
};
</script>

<style scoped>
.error_wrap {
  position: relative;
}
.error_message {
  color: red;
  font-size: 0.8rem;
  position: absolute;
}
</style>