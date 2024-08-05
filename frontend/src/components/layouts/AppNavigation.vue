<template>
    <header class="header">
        <div class="header__logo">
            <h1>Logo Here</h1>
        </div>
        <nav class="header__links">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/properties">Real Estate</router-link>
            </li>
            <li>
                <router-link to="/design-and-renovation">Design &amp; Renovation</router-link>
            </li>
            <li>
                <router-link to="/">Our Mission</router-link>
            </li>
            <li>
                <router-link to="/">Our Team</router-link>
            </li>
        </nav>
        <div class="header__icons">
            <button class="icon-button">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <button class="icon-button">
                <i class="fa-regular fa-heart"></i>
            </button>
            <button class="icon-button">
                <i class="fa-regular fa-user"></i>
            </button>
        </div>
    </header>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  padding: 0 48px;
}

.header__logo img {
  height: 40px; /* Adjust as needed */
}

.header__links {
  display: flex;
  justify-content: flex-end;
  gap: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header__links li {
  margin: 0;
}

.header__links a {
  text-decoration: none;
  color: var(--text-color-dark);
  font-size: 20px;
  font-weight: 500;
}

.header__icons {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
}

.icon-button i {
  font-size: 24px; /* Adjust as needed */
}
</style>
