<template>
  <section class="hogehoge">
    <PrintSheet v-for="yearMonth in yearMonths" :key="yearMonth"
      :yearMonth="yearMonth" :showToast="showToast"/>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import PrintSheet from '@/components/PrintSheet.vue';

export default {
  components: {
    PrintSheet,
  },
  data() {
    return {
      showToast: false,
    };
  },
  computed: {
    ...mapState([
      'yearMonths',
      'targetPrintSheet',
    ]),
  },
  mounted() {
    this.showToast = true;
  },
  watch: {
    targetPrintSheet() {
      const $article = this.$el.querySelectorAll('article')[this.targetPrintSheet];
      $article.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  background: #ddd;
  height: calc(100vh - 53px);
  margin: 0;
  padding: 50px 0;
  overflow: scroll;
  box-shadow: inset 0 0 3px #999;
}

@media print {
  section {
    background: none;
    box-shadow: none;
    height: auto;
    padding: 0;
  }
}
</style>
