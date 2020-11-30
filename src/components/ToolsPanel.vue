<template>
  <aside class="tools-panel">
    <form class="tools-panel__form">
      <title-input title="Find by title" v-model="searchText" />

      <autors-input
        title="Filter by autor"
        v-model="selectedAutors"
      ></autors-input>

      <isbn-search title="Find by ISBN" />
    </form>
  </aside>
</template>

<script>
import { mapMutations } from "vuex";
import AutorsInput from "@/components/inputs/AutorsInput";
import IsbnSearch from "@/components/inputs/IsbnSearch";
import TitleInput from "./inputs/TitleInput.vue";

export default {
  name: "ToolsPanel",
  data: () => ({
    selectedAutors: [],
    searchText: "",
  }),
  props: {
    autors: Array,
  },
  components: {
    AutorsInput,
    IsbnSearch,
    TitleInput,
  },
  methods: {
    ...mapMutations(["addFilters", "clearFilters", "updateFilter"]),
    autorsFilter(item) {
      return (
        item &&
        item.autors &&
        this.selectedAutors.every((autor) => item.autors.includes(autor))
      );
    },
    titleFilter(item) {
      return (
        item &&
        item.title &&
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },

  created() {
    this.addFilters([this.autorsFilter, this.titleFilter]);
  },

  beforeDestroy() {
    this.clearFilters([this.autorsFilter, this.titleFilter]);
  },

  watch: {
    searchText() {
      this.updateFilter();
    },
    selectedAutors() {
      this.updateFilter();
    },
  },
};
</script>

<style scoped>
.tools-panel__form {
  width: 250px;
  background-color: rgb(225, 225, 225);
  padding: 20px;
  border-radius: 3px;
}

h4 {
  margin-bottom: 10px;
}
</style>