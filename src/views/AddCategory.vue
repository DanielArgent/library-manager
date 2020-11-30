<template>
  <div class="page">
    <h1 class="page__title">Add category</h1>

    <form class="page-form">
      <div class="page-form__row">
        <title-input title="Title" v-model="title" />
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

export default {
  name: "AddCategory",
  data: () => ({
    title: "",
  }),
  methods: {
    ...mapMutations(["addTo"]),
    addItem() {
      this.addTo({
        id: this.$route.params.id,
        value: {
          type: "category",
          title: this.title,
          id: this.title,
          items: [],
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
  },
};
</script>