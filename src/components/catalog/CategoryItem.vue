<template>
  <li class="category-item">
    <img class="category-item__label" :class="{ expanded: expanded }"
      src="@/assets/expand-button.svg" />
    <span class="category-item__title" @click="toggleState">{{ category.title }}</span>

    <category-manager v-show="expanded" :category="category" />

    <catalog-tree v-show="expanded" :items="category.items" />
  </li>
</template>

<script>
import CategoryManager from "@/components/managers/CategoryManager";

export default {
  name: "CategoryItem",
  props: ["category"],
  data: () => ({
    expanded: false
  }),
  methods: {
    toggleState() {
      this.expanded = !this.expanded;
    }
  },
  components: {
    CatalogTree: () => import("./CatalogTree"),
    CategoryManager,
  },
};
</script>

<style scoped>
.category-item {
  margin: 10px 0px;
}

.category-item:hover {
  cursor: pointer;
}

.category-item__label {
  height: 12px;
  width: 12px;
  margin-right: 5px;
}

.category-item__label.expanded {
  transform: rotate(180deg);
}
</style>