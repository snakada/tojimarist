<template>
  <div id="sidePanel" class="menu" :class="{ 'is-active': sidePanelIsOpened }">
    <div class="_inner">
      <h2 class="menu-label">表示年月</h2>
      <YearMonths/>

      <h2 class="menu-label">チェック項目</h2>
      <SlickList
        :class="{ 'is-sorting': isSorting }"
        :draggedSettlingDuration="50"
        :useDragHandle="true"
        @sort-start="sortStart"
        @sort-end="sortEnd"
        class="menu-list"
        lockAxis="y"
        v-model="items">
        <SlickItem class="menu-item" v-for="(item, key) in checkItems" :index="key" :key="key">
          <span v-handle class="icon is-pulled-left of-handle">
            <i class="fas fa-arrows-alt"></i>
          </span>
          {{ item }}
          <span class="icon has-text-grey-light is-pulled-right of-remove"
            v-if="checkItems.length > 1" @click="removeCheckItem(key)">
            <i class="fas fa-times-circle"></i>
          </span>
        </SlickItem>
      </SlickList>
      <AddCheckItem/>

      <div id="resetCheckItems">
        <h2 class="menu-label">リセット</h2>
        <div class="menu-item">
          <button @click="doResetCheckItems" class="button is-small is-danger">チェック項目を初期化する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';

import YearMonths from '@/components/YearMonths.vue';
import AddCheckItem from '@/components/AddCheckItem.vue';

export default {
  components: {
    AddCheckItem,
    SlickList,
    SlickItem,
    YearMonths,
  },
  directives: {
    handle: HandleDirective,
  },
  data() {
    return {
      items: [],
      isSorting: false,
    };
  },
  computed: {
    ...mapState([
      'checkItems',
      'sidePanelIsOpened',
    ]),
  },
  methods: {
    ...mapMutations([
      'moveCheckItem',
      'removeCheckItem',
    ]),
    ...mapActions([
      'doHighlightCheckItem',
      'doResetCheckItems',
    ]),
    sortStart() {
      this.isSorting = true;
    },
    sortEnd({ oldIndex, newIndex }) {
      this.isSorting = false;
      this.doHighlightCheckItem(newIndex);
      this.moveCheckItem({ oldIndex, newIndex });
    },
  },
};
</script>

<style lang="scss" scoped>
#sidePanel {
  position: relative;
  overflow: scroll;
  border-right: 1px solid #ccc;
  width: 0;
  height: calc(100vh - 53px);
  transition: width .2s;
  &.is-active {
    width: 300px;
  }
  ._inner {
    width: 299px;
    overflow: hidden;
  }
  h2 {
    margin: 5px 10px;
    white-space: nowrap;
    font-weight: bold;
  }
}
.menu-list {
  background: #ddd;
  margin: 0;
  &.is-sorting {
    cursor: grabbing;
    .menu-item {
      cursor: grabbing;
    }
  }
}
.menu-label {
  user-select: none;
}
.menu-item {
  background: #fff;
  color: #4a4a4a;
  display: block;
  padding: 0.5em 0.75em;
  white-space: nowrap;
  border-top: 1px solid #eee;
  user-select: none;
  &:last-child {
    border-bottom: 1px solid #eee;
  }
  &:hover {
    background: #f2f2f2;
    color: #363636;
  }
  .icon {
    transform: translateY(-2px);
    opacity: .75;
    &.of-handle {
      color: #ccc;
      cursor: grab;
    }
    &.of-remove {
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
}

#resetCheckItems {
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #eee;
  width: 100%;
}

@media print {
  #sidePanel {
    display: none;
  }
}
</style>
