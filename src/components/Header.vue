<template>
  <header class="header">
    <div class="header__logo">LibraryManager</div>
    
    <user-info v-bind:user="user" />

    <button class="header__sign-in">
      <img src="@/assets/login.svg"/>
    </button>
  </header>
</template>

<script>
import User from '@/data/User';
import UserInfo from "@/components/UserInfo";

export default {
  name: 'Header',
  props: {
    user: User
  },
  components: {
    UserInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.header__sign-in {
  background-color: transparent;
  border: none;
}

.header__sign-in>img {
  width: 24px;
  height: 24px;
}
</style>
