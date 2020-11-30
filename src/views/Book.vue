<template>
  <div class="book" :class="{ centered: !bookData }">
    <div class="book-data" v-if="bookData">
      <h1>{{ book.title }}</h1>

      <div class="book-data__catalog-path">{{ catalogPath }}</div>

      <p><strong>ISBN:</strong> {{ book.isbn }}</p>
      <p><strong>Autors:</strong> {{ book.autors.join(", ") }}</p>

      <p>
        {{ book.description }}
      </p>
    </div>
    <div class="book-not-found" v-else>
      <h3>Error</h3>
      Book with ISBN {{ this.$route.params.isbn }} not found!
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  computed: {
    bookData() {
      return this.$store.getters.findBookWithPathByIsbn(this.$route.params.isbn);
    },
    book() {
      return this.bookData.book;
    },
    path() {
      return this.bookData.path;
    },
    catalogPath() {
      return this.path
        .map(category => category.title)
        .join(" / ");
    }
  },
};
</script>

<style scoped>
.book {
  padding: 20px 30px;
}

.book.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.book.centered h3 {
  margin: 0;
  margin-bottom: 1em;
  text-align: center;
}

.book-data__catalog-path {
  font-family: monospace;
  font-size: 14px;
}

.book-not-found {
  background-color: rgb(225, 225, 225);
  padding: 2em 20px;
  border-radius: 3px;
}
</style>