<template>
  <div class="user-info">
      <img class="user-info__avatar" v-bind:src="user.avatar" />
      <span class="user-info__name">{{ user.name }}</span>
  </div>
</template>

<script>
import User from '@/data/User';

export default {
  name: 'UserInfo',
  props: {
      user: User
  }
}
</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;

    padding: 0px 20px;
}

.user-info__avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
}
</style>