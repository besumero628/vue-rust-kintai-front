<template>
  <form>
    <div class="row">
      <div class="mb-3 col-6">
        <AtomsFormLabel for="family_name" name="Family Name" />
        <AtomsFormInput type="text" placeholder="性" v-model="signup_user.family_name"/>
      </div>
      <div class="mb-3 col-6">
        <AtomsFormLabel for="given_name" name="Given Name" />
        <AtomsFormInput type="text" placeholder="名" v-model="signup_user.given_name"/>
      </div>
    </div>
    <div class="mb-3">
      <AtomsFormLabel for="email" name="Email" />
      <AtomsFormInput type="email" placeholder="test@exapmle.com" v-model="signup_user.email"/>
    </div>
    <div class="mb-3">
      <AtomsFormLabel for="password" name="Password" />
      <AtomsFormInput type="password" placeholder="********" v-model="signup_user.password"/>
    </div>
    <div class="mb-3">
      <AtomsFormLabel for="password" name="Password Confirm" />
      <AtomsFormInput type="password" placeholder="********" v-model="signup_user.passwordConfirm"/>
    </div>
    <div class="mb-3 error-wrap">
      <p class="error_message">{{error}}</p>
    </div>
  </form>
  <div class="mt-5 mb-3">
    <AtomsSubmitButton @parentFunction="signup" name="SIGN UP" />
  </div>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
definePageMeta({
  middleware: ['auth-login']
})

const signup_user = ref({
  email: "",
  family_name: "",
  given_name: "",
  password: "",
  passwordConfirm: "",
});

const error = ref("");

const signup = async () => {
  if (signup_user.value.password != signup_user.value.passwordConfirm) {
    error.value = "※パスワードとパスワード確認が一致していません";
    return
  }
  const auth = getAuth();
  const res = await createUserWithEmailAndPassword(
    auth,
    signup_user.value.email,
    signup_user.value.password
  ).catch((e) => {
    error.value = ((code) => {
      switch (code) {
        case "auth/email-already-in-use":
          return "既にそのメールアドレスは使われています";
        case "auth/wrong-password":
          return "※パスワードが正しくありません";
        case "auth/weak-password":
          return "※パスワードは最低6文字以上にしてください";
        default:
          return "※メールアドレスとパスワードをご確認ください";
      }
    })(e.code)
  });

  const new_user = {
    uid: res?.user.uid,
    family_name: signup_user.value.family_name,
    given_name: signup_user.value.given_name,
    email: res?.user.email,
    password: signup_user.value.password //後で消していいかも
  }

  console.log(new_user)
  
  const url = "http://localhost:8080/user"
  const headers = new Headers({
    "Content-Type": "application/json"
  })
  const r_res = await useFetch(url, {
    method: "POST",
    headers: headers,
    body: new_user
  })
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