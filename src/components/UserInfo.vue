<template>
  <div class="user-info">
      <img class="user-info__avatar" :src="currentUser.avatar" />
      <span class="user-info__name">{{ currentUser.name }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'UserInfo',
  computed: mapGetters(["currentUser"])
}
</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
    padding: 0px 30px;
}

.user-info__avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
}
</style>