<template>
  <li class="book-item">
    <router-link :to="'/book/' + book.isbn">
      {{ book.title }}
    </router-link>

    <book-manager :book="book" />
  </li>
</template>

<script>
import BookManager from "@/components/managers/BookManager";

export default {
  name: "BookItem",
  props: ["book"],
  components: { BookManager },
};
</script>

<style scoped>
.book-item {
  margin: 10px 0px;
}
</style>