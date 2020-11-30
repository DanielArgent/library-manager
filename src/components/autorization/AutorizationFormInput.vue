<template>
  <div class="autorization-form-input">
    <label class="autorization-form-input__label" v-bind:for="id">{{ label }}</label>
    <input
      class="autorization-form-input__input"
      v-bind:type="type"
      v-bind:id="id"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "AutorizationFormInput",
  props: {
    type: {
      validator: value => ["text", "password"].includes(value),
    },
    label: String,
    id: String,
  },
};
</script>

<style scoped>
.autorization-form-input {
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 0;
}

.autorization-form-input__label {
  font-size: 12px;
  padding: 3px 0px;
}

.autorization-form-input__input {
  height: 25px;
  border: 1px solid rgb(100, 100, 100);
  border-radius: 3px;
}
</style>