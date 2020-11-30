<template>
  <div class="home">
    <library-catalog />
    <tools-panel />
  </div>
</template>

<script>
import LibraryCatalog from "@/components/catalog/LibraryCatalog";
import ToolsPanel from "@/components/ToolsPanel";

export default {
  name: "Home",
  components: {
    LibraryCatalog,
    ToolsPanel,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  padding: 30px;
}

@media (max-width: 750px) {
  .home {
    flex-direction: column;
    padding: 20px;
    align-items: center;
  }
}
</style>