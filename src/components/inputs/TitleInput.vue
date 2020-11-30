<template>
  <div class="title-input">
    <h4 v-if="title">{{ title }}</h4>

    <input
      type="text"
      class="title-input__input"
      v-bind:value="value"
      placeholder="Input title"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "TitleInput",
  props: {
    value: String,
    title: String
  },
};
</script>

<style scoped>
.title-input {
  --width: 200px;

  width: var(--width);
}

.title-input__input {
  width: var(--width);
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 3px;
}

.title-input__input:focus {
  outline: none;
  border-color: black;
}
</style>