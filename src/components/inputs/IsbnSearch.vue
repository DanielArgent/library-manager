<template>
  <div class="isbn-search">
    <isbn-input @isbn-changed.capture="onIsbnChanged" :title="title" />

    <button
      class="isbn-search__button"
      v-show="!hasError"
      @click.prevent.capture="onSearch"
    >
      Search
    </button>
  </div>
</template>

<script>
import IsbnInput from "@/components/inputs/IsbnInput";

export default {
  name: "IsbnSearch",
  props: {
    title: String,
  },
  data: () => ({
    value: "",
    hasError: true,
  }),
  methods: {
    onIsbnChanged({ value, error }) {
      this.value = value;
      this.hasError = !!error;
    },
    onSearch() {
      this.$router.push("book/" + this.value);
    },
  },
  components: { IsbnInput },
};
</script>

<style scoped>
.isbn-search__button {
  width: 200px;
  margin-top: 5px;
  background-color: #1b407d;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
}

.isbn-search__button:hover {
  cursor: pointer;
  background-color: hsl(217, 64%, 20%);
}
</style>