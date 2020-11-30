<template>
  <form class="autorization-form">
    <h3 class="autorization-form__title">Autorization</h3>

    <autorization-form-input
      type="text"
      id="login-input"
      label="Login"
      v-model="login"
    />
    <autorization-form-input
      type="password"
      id="password-input"
      label="Password"
      v-model="password"
    />

    <div class="autorization-form__error">{{ error }}</div>

    <div class="autorization-form-actions">
      <button class="button button-recomended" @click.prevent="autorize">
        Log In
      </button>

      <button class="button" @click.prevent="cancel">Cancel</button>
    </div>
  </form>
</template>

<script>
import AutorizationFormInput from "@/components/autorization/AutorizationFormInput";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AutorizationForm",

  data: () => ({
    password: "",
    login: "",
  }),

  computed: mapGetters(["error"]),

  methods: {
    ...mapActions(["fetchUser"]),
    autorize: function () {
      this.fetchUser({
        login: this.login,
        password: this.password,
      });

      if (!this.error) {
        this.$router.push("/");
      }
    },
    cancel() {
      this.$router.push("/");
    },
  },

  components: {
    AutorizationFormInput,
  },
};
</script>

<style scoped>
.autorization-form {
  width: 250px;
  background-color: rgb(225, 225, 225);
  padding: 20px;
  border-radius: 3px;
}

.autorization-form__title {
  text-align: center;
  margin: 0 0 20px 0;
}

.autorization-form__error {
  font-size: 12px;
  margin: 0 0 20px 0;
  text-align: center;
  color: darkred;
}

.autorization-form-actions {
  display: flex;
  justify-content: center;
  gap: 5px;
}
</style>