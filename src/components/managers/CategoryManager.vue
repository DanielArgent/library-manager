<template>
  <div class="category-manager" v-if="isAdminMode">
    <button class="manager-action manager-add-book" @click="addBook">Add Book</button>
    <button class="manager-action manager-add-category" @click="addCategory">Add Category</button>
    <button class="manager-action manager-remove" @click="remove">Remove</button>
    <button class="manager-action manager-edit" @click="edit">Edit</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CategoryManager",
  props: ["category"],
  computed: {
    isAdminMode() {
      return this.$store.getters.currentUser.type === "admin";
    },
  },
  methods: {
    ...mapMutations(["deleteCategory"]),
    addBook() {
      this.$router.push("addBookTo/" + this.category.id);
    },
    addCategory() {
      this.$router.push("addCategoryTo/" + this.category.id);
    },
    edit() {
      this.$router.push("editCategory/" + this.category.id);
    },
    remove() {
      if(confirm("Are you sure?")) {
        this.deleteCategory(this.category.id);
      }
    },
  },
};
</script>

<style scoped>
.manager-action {
  font-size: 12px;
  color: grey;
  background: transparent;
  border: none;
}

.manager-action:hover {
  cursor: pointer;
}
</style>
