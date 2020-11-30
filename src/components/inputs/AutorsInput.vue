<template>
  <div class="autors-input">
    <h4 v-if="title">{{ title }}</h4>

    <input
      type="text"
      class="autors-input__input"
      v-model="textSearch"
      placeholder="Input autor name"
      @focus="showOptions"
      @blur="hideOptions"
    />

    <ul class="options" v-show="isOptionsShown">
      <li
        class="options__item"
        v-for="autor in filteredOptions"
        :key="autor"
        @click="addItem(autor)"
      >
        <slot :item="autor">{{ autor }}</slot>
      </li>

      <li
        class="options__item options__item-error"
        v-if="filteredOptions.length === 0 && !allowCreation"
      >
        Autor not found
      </li>

      <li
        class="options__item options__item-error"
        v-if="filteredOptions.length === 0 && allowCreation"
        @click="onCreateAutor()"
      >
        Create autor '{{ textSearch }}'
      </li>
    </ul>

    <span class="selected__title" v-show="selectedItems.length !== 0">
      Selected autors:
    </span>

    <div class="selected">
      <div class="selected-item" v-for="(autor, key) in value" :key="key">
        <slot name="selected" :item="autor">{{ autor }}</slot>
        <button
          class="selected-item__close-button"
          @click.prevent="removeItem(key)"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AutorsInput",
  props: {
    value: {
      type: Array,
      default: () => [],
    },

    title: {
      type: String,
      default: "",
    },

    allowCreation: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      textSearch: "",
      isOptionsShown: false,
    };
  },

  computed: {
    ...mapGetters(["autors"]),
    filteredOptions() {
      return this.autors.filter(
        (autor) =>
          autor.toLowerCase().includes(this.textSearch.toLowerCase()) &&
          !this.isSelected(autor)
      );
    },
    selectedItems() {
      return this.value;
    },
  },

  methods: {
    ...mapMutations(["createAutor"]),
    hideOptions() {
      setTimeout(() => (this.isOptionsShown = false), 150);
    },
    isSelected(name) {
      return this.selectedItems.includes(name);
    },
    showOptions() {
      this.isOptionsShown = true;
    },
    selectItem(item) {
      this.textSearch = "";
      this.isOptionsShown = false;
      this.$emit("input", item);
      this.$emit("onSelectItem", item);
    },
    clearItem() {
      this.textSearch = "";
      this.$emit("input", {
        id: undefined,
        title: undefined,
      });
      this.$emit("onClearItem");
    },
    addItem(item) {
      if (!this.isSelected(item)) {
        this.textSearch = "";
        this.isOptionsShown = false;
        const items = JSON.parse(JSON.stringify(this.value));
        items.push(item);
        this.$emit("input", items);
        this.$emit("onAutorSelected", items);
      }
    },
    removeItem(index) {
      this.textSearch = "";
      const items = this.value;
      items.splice(index, 1);
      this.$emit("input", items);
      this.$emit("onAutorRemoved", items);

      console.log("REMOVED", this.value)
    },
    onCreateAutor() {
      this.createAutor(this.textSearch);
      this.addItem(this.textSearch);
    },
  },
};
</script>

<style scoped>
.autors-input {
  --width: 200px;

  width: var(--width);
}

.autors-input__input {
  width: var(--width);
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 3px;
}

.autors-input__input:focus {
  outline: none;
  border-color: black;

  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.options {
  width: var(--width);
  list-style: none;
  margin: 0px;
  padding-left: 0px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  border: 1px solid black;
  border-top: none;
  position: absolute;
  max-height: 100px;
  overflow-y: auto;

  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.options__item {
  padding: 5px 10px;
  cursor: pointer;
}

.options__item:hover {
  background-color: rgb(230, 230, 230);
}

.options__item-error {
  color: darkred;
}

.selected {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  font-size: 14px;
}

.selected__title {
  display: block;
  font-size: 15px;
  color: #1b407d;
  margin-top: 10px;
}

.selected-item {
  border-radius: 3px;
  display: inline-block;
  padding: 3px 7px;
  background: #1b407d;
  color: white;
  margin: 0 5px 2px 0;
}

.selected-item__close-button {
  font-size: 16px;
  padding: 0px 2px;
  margin-left: 5px;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>