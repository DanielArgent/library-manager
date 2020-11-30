<template>
  <div class="catalog-manager" v-if="isAdminMode">
    <button class="manager-action manager-add-book" @click="addBook">Add Book</button>
    <button class="manager-action manager-add-category" @click="addCategory">Add Category</button>
  </div>
</template>

<script>
export default {
  name: "CatalogManager",
  props: ["catalog"],
  computed: {
    isAdminMode() {
      return this.$store.getters.currentUser.type === "admin";
    },
  },
  methods: {
    addBook() {
      this.$router.push("addBookTo/" + this.catalog.id);
    },
    addCategory() {
      this.$router.push("addCategoryTo/" + this.catalog.id);
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