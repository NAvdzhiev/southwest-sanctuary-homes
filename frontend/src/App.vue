<template>
 <div class="page-wrapper">
  <AppNavigation/>
  <main class="container">
    <router-view/>
  </main>
  <AppFooter/>
 </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.header {
  flex: 1;
}

main {
  max-width: 100%;
  padding: 50px 48px 40vh;
  flex: 2;
}
</style>


