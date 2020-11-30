<template>
  <div class="isbn-input">
    <h4 v-if="title">{{ title }}</h4>

    <input
      type="text"
      class="isbn-input__input"
      v-model="value"
      placeholder="Input ISBN"
    />

    <div v-if="error" class="isbn-input__error">{{ error }}</div>
  </div>
</template>

<script>
import * as isbn from "@/IsbnChecker";

export default {
  name: "IsbnInput",
  props: {
    title: String,
    initialValue: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    value: "",
    error: null,
  }),
  created() {
    this.value = this.initialValue;
  },
  watch: {
    value(val) {
      const error = isbn.validateIsbn(val);
      this.error = val.length === 0 ? null : error;

      this.$emit("isbn-changed", { value: val, error: error });
    },
  },
};
</script>

<style scoped>
.isbn-input {
  --width: 200px;

  width: var(--width);
}

.isbn-input__input {
  width: var(--width);
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 3px;
}

.isbn-input__input:focus {
  outline: none;
  border-color: black;

  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.options__item {
  padding: 5px 10px;
  cursor: pointer;
}

.options__item:hover {
  background-color: rgb(230, 230, 230);
}

.isbn-input__error {
  font-size: 14px;
  padding: 5px 0px;
  color: darkred;
}
</style>