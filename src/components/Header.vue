<template>
  <header class="header">
    <div class="header__logo">LibraryManager</div>

    <user-info />

    <router-link to="/autorization" class="header__autorize-link">
      <img src="@/assets/autorization-icon.svg" />
    </router-link>
  </header>
</template>

<script>
import UserInfo from "@/components/UserInfo";

export default {
  name: "Header",
  components: {
    UserInfo,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px 30px;
  background-color: #1b407d;
  color: #ffffff;
}

.header__logo {
  font-weight: bold;
  margin-right: auto;
}

.header__autorize-link {
  background-color: transparent;
  border: none;
}

.header__autorize-link > img {
  width: 18px;
  height: 18px;
}
</style>
