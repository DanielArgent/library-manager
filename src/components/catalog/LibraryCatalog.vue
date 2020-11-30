<template>
  <main class="library-catalog">
    <h1 class="library-catalog__title">Catalog</h1>

    <catalog-manager :catalog="catalog" />

    <catalog-tree v-if="filteredCatalog" :items="(filteredCatalog || { items: [] }).items" />
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CatalogTree from "@/components/catalog/CatalogTree";
import CatalogManager from "@/components/managers/CatalogManager";

export default {
  name: "LibraryCatalog",
  methods: mapActions(["fetchCatalog"]),
  computed: {
    ...mapGetters(["catalog", "filteredCatalog"]),
  },
  components: {
    CatalogTree,
    CatalogManager,
  },
  created() {
    this.fetchCatalog();
  },
};
</script>

<style scoped>
.library-catalog {
  flex: 0 1 auto;
  margin-right: auto;
  padding: 0px 30px;
}
</style>
