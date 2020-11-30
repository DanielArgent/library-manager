<template>
  <div class="page">
    <h1 class="page__title">Edit category</h1>

    <form class="page-form">
      <div class="page-form__row">
        <title-input title="Title" v-model="title" />
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

export default {
  name: "EditCategory",
  data: () => ({ title: "" }),
  created() {
    const requiredId = this.$route.params.id;
    const category = this.$store.getters.findCategoryById(requiredId);

    this.title = category.title;
  },
  methods: {
    ...mapMutations(["updateCategory"]),
    save() {
      this.updateCategory({
        id: this.$route.params.id,
        data: {
          title: this.title,
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