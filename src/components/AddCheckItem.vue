<template>
  <div class="add-item">
    <div class="field of-item">
      <div class="control">
        <textarea ref="newItem" class="textarea has-fixed-size is-small" rows="2" placeholder="項目追加"></textarea>
      </div>
    </div>
    <div class="control">
      <button @click="addItem" class="button is-small is-info">項目を追加する</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'addCheckItem',
    ]),
    addItem() {
      const newItem = this.$refs.newItem.value;
      if (newItem) {
        this.addCheckItem(newItem);
        this.$refs.newItem.value = "";
        this.$refs.newItem.focus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-item {
  border-bottom: 1px solid #eee;
  padding: 10px;
  .field.of-item {
    margin-bottom: 0.5rem;
  }
}
</style>
