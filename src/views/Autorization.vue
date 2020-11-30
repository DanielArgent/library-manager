<template>
  <div class="autorization">
    <autorization-form @user-changed="userChanged" />
  </div>
</template>

<script>
import AutorizationForm from "@/components/autorization/AutorizationForm";

export default {
  name: "Autorization",
  methods: {
    userChanged: function (user) {
      this.$emit("user-changed", user);
    },
  },
  components: {
    AutorizationForm,
  }
};
</script>

<style scoped>
.autorization {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>