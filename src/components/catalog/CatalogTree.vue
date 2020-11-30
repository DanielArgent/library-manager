<template>
  <ul class="catalog-tree">
    <category-item v-for="cat of categories" :category="cat" :key="cat.id" />
    <book-item v-for="book of books" :book="book" :key="book.isbn" />
  </ul>
</template>

<script>
import CategoryItem from "@/components/catalog/CategoryItem";
import BookItem from "@/components/catalog/BookItem";

export default {
  name: "catalog-tree",
  props: {
    items: Array,
  },
  computed: {
    books() {
      return this.items.filter((i) => i.type === "book");
    },
    categories() {
      return this.items.filter((i) => i.type === "category");
    },
  },
  components: {
    CategoryItem,
    BookItem,
  },
};
</script>

<style>
.catalog-tree {
  list-style: none;
}
</style>