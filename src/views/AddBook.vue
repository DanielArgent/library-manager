<template>
  <div class="page">
    <h1 class="page__title">Add book</h1>

    <form class="page-form">
      <div class="page-form__row">
        <title-input title="Title" v-model="title" />
        <isbn-input title="ISBN" @isbn-changed="isbnChanged" />
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
        <button class="button button-recomended" @click.prevent="addItem">
          Add
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
  name: "AddBook",

  data: () => ({
    title: "",
    isbn: { value: "", error: null },
    selectedAutors: [],
    description: "",
  }),

  methods: {
    ...mapMutations(["addTo"]),
    isbnChanged(isbn) {
      this.isbn = isbn;
    },
    addItem() {
      this.addTo({
        id: this.$route.params.id,
        value: {
          type: "book",
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