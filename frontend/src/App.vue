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
  position: relative;
}

.header {
  flex: 1;
  position: relative;
}

main {
  max-width: 100%;
  padding: 50px 48px 40vh;
  flex: 2;
  position: relative;
  margin-bottom: 250px;
}
</style>


