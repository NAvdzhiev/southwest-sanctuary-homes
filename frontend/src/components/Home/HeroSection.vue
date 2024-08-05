<template>
    <section class="hero-section">
        <div class="hero-content">
            <h1>Southwest</h1>
            <h1>Sanctuary Homes</h1>
            <p>Your Gateway to Southwest Style and Comfort!</p>
        </div>
        <img src="../../assets/images/hero-image.png" alt="Hero Background" class="hero-image" />
        <button>
            <i class="fa-solid fa-arrow-down"></i>
        </button>
    </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the section area */
  z-index: -1; /* Place behind the text */
  border-radius: 24px;
}

.hero-content {
  position: relative; 
  text-align: center; 
  z-index: 1; 
}

.hero-content h1 {
  font-size: 72px;
  margin: 0;
  color: var(--container-color);
  text-transform: uppercase;
  text-shadow: 0 2px 2px rgba(7, 7, 7, .15);
}

.hero-content p {
  font-size: 24px;
  color: var(--container-color);
  text-shadow: 0 4px 4px rgba(7, 7, 7, .15);
}

.hero-section button {
  position: absolute;
  bottom: 0; 
  left: 50%;
  transform: translateX(-50%) translateY(50%); 
  background: var(--accent-color); 
  color: white;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
}

.hero-section button > i {
    font-size: 32px;
    color: var(--text-color-dark);
    animation: bounce 1s infinite; /* Animation for the arrow */
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px); /* Adjust the distance of bounce */
  }
  100% {
    transform: translateY(0);
  }
}
</style>