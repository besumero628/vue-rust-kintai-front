<template class>
  <div class="layout">
    <NuxtLayout name="main">
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>
