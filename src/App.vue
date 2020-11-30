<template>
  <div class="app">
    <Header />

    <keep-alive include="Home">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.app {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
