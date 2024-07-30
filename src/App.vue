<script lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<style>
body, html {
  height: 100vh;
}

#app {
  height: 100vh;
  
  /* grid container settings */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    'header'
    'main'
    'footer';
}

#app > header {
  grid-area: header;
}

#app > main {
  grid-area: main;
  padding: 15px 5px 10px 5px;
}

#app > footer {
  grid-area: footer;
}
</style>