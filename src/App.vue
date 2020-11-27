<template>
  <div class="app">
    <Header v-bind:user="user" />
  </div>
</template>

<script>
import User from "@/data/User";
import Header from "@/components/Header.vue";

export default {
  name: "App",
  data: function () {
    return {
      user: new User("Guest", require("@/assets/guest-avatar.svg")),
    };
  },
  components: {
    Header,
  },
};
</script>

<style>
body {
  margin: 0;
}
.app {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
