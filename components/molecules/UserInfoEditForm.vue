<template>
  <form>
    <div class="row">
      <div class="mb-1 col-6">
        <AtomsFormLabel for="family_name" name="Family Name" />
        <AtomsFormInput
          type="text"
          placeholder="性"
          v-model="current_user.family_name"
        />
      </div>
      <div class="mb-1 col-6">
        <AtomsFormLabel for="given_name" name="Given Name" />
        <AtomsFormInput
          type="text"
          placeholder="名"
          v-model="current_user.given_name"
        />
      </div>
    </div>
    <div class="mb-3 error-wrap">
      <p class="error_message">{{ error }}</p>
    </div>
  </form>
  <div class="mt-4 mb-3">
    <AtomsSubmitButton
      @parentFunction="editUserInfo"
      name="Change User Info!"
    />
  </div>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
definePageMeta({
  middleware: ["auth-login"],
});

const current_user = ref({
  family_name: "",
  given_name: "",
});

const error = ref("");

const auth = getAuth();
const current_user_id = getUserID(auth);
const url = "http://localhost:8080/user";
const { data: res } = await useFetch(url, {
  method: "GET",
  params: {
    uid: auth.currentUser?.uid,
  },
});

if (isUser(res.value)) {
  current_user.value.family_name = res.value.family_name;
  current_user.value.given_name = res.value.given_name;
}

const editUserInfo = async () => {
  if (
    current_user.value.family_name == "" ||
    current_user.value.given_name == ""
  ) {
    error.value = "※空欄は入力できません";
    return;
  }

  if (isUser(res.value)) {
    await useFetch(url + "/" + res.value.id, {
      method: "PUT",
      body: {
        family_name: current_user.value.family_name,
        given_name: current_user.value.given_name
      },
    });
  } else {
    error.value = "値が不正です";
  }

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