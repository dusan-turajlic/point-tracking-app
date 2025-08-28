<script setup lang="ts">
import NavBar from './components/NavBar.vue'


</script>

<template>
  <NavBar />
  <main class="my-10">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>