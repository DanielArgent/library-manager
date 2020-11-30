<template>
  <div class="book-manager" v-if="isAdminMode">
    <button class="manager-action manager-remove" @click="remove">Remove</button>
    <button class="manager-action manager-edit" @click="edit">Edit</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "BookManager",
  props: ["book"],
  computed: {
    isAdminMode() {
      return this.$store.getters.currentUser.type === "admin";
    },
  },
  methods: {
    ...mapMutations(["deleteBook"]),
    remove() {
      if (confirm("Are you sure?")) {
        this.deleteBook(this.book.isbn);
      }
    },
    edit() {
      this.$router.push("editBook/" + this.book.isbn);
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
