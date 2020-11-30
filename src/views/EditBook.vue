<template>
  <div class="page">
    <h1 class="page__title">Edit book</h1>

    <form class="page-form">
      <div class="page-form__row">
        <title-input title="Title" v-model="title" />
        <isbn-input
          title="ISBN"
          @isbn-changed="isbnChanged"
          :initialValue="isbnInitialValue"
        />
      </div>

      <div class="page-form__row">
        <autors-input
          title="Autors"
          v-model="selectedAutors"
          :allow-creation="true"
        />
        <description-input title="Description" v-model="description" />
      </div>
      
      <div class="page-form__row">
        <button class="button button-recomended" @click.prevent="save">
          Save
        </button>

        <button class="button" @click.prevent="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import TitleInput from "@/components/inputs/TitleInput";
import IsbnInput from "@/components/inputs/IsbnInput";
import AutorsInput from "@/components/inputs/AutorsInput";
import DescriptionInput from "@/components/inputs/DescriptionInput";

export default {
  name: "EditBook",

  data: () => ({
    title: "",
    isbn: { value: "", error: null },
    selectedAutors: [],
    description: "",
    isbnInitialValue: "",
  }),
  created() {
    const requiredIsbn = this.$route.params.isbn;
    const bookData = this.$store.getters.findBookWithPathByIsbn(requiredIsbn);
    const book = bookData.book;

    this.title = book.title;
    this.selectedAutors.push(...book.autors);
    this.isbnInitialValue = book.isbn;
    this.description = book.description;
  },
  methods: {
    ...mapMutations(["updateBook"]),
    isbnChanged(isbn) {
      this.isbn = isbn;
    },
    save() {
      this.updateBook({
        isbn: this.$route.params.isbn,
        data: {
          title: this.title,
          isbn: this.isbn.value,
          autors: this.selectedAutors,
          description: this.description,
        },
      });

      this.$router.push("/");
    },
    cancel() {
      this.$router.push("/");
    },
  },

  components: {
    TitleInput,
    IsbnInput,
    AutorsInput,
    DescriptionInput,
  },
};
</script>