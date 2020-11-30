<template>
  <div class="description-input">
    <h4 v-if="title">{{ title }}</h4>

    <textarea
      class="description-input__input"
      v-bind:value="value"
      placeholder="Input book description"
      v-on:input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "DescriptionInput",
  props: {
    value: String,
    title: String
  },
};
</script>

<style scoped>
.description-input {
  --width: 200px;

  width: var(--width);
}

.description-input__input {
  width: var(--width);
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 3px;
}

.description-input__input:focus {
  outline: none;
  border-color: black;
}
</style>