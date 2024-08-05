<template>
  <AppNavigation/>
  <main class="container">
    <router-view/>
  </main>
  <AppFooter/>
</template>

<style scoped>
main.container {
  max-width: 100%;
  padding: 0 48px;
}
</style>


