<template class>
  <div class="layout">
    <NuxtLayout>
      <div class="container">
        <div class="row">
          <OrganismsSignupCard />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-login']
})
</script>
