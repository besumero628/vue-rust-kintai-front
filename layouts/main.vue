<template>
    <!-- header -->
    <OrganismsHeader />
    <!-- pagesの呼び出し -->
    <div class="container">
      <OrganismsAttendanceCheckGroup />
      <OrganismsAttendanceTableCard />
    </div>
    <slot />
</template>
