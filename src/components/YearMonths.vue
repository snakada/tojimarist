<template>
  <div class="year-month">
    <div class="icons">
      <span @click="yearMonthsUnshift" class="icon has-text-grey-light">
        <i class="fas fa-caret-square-left"></i>
      </span>
      <span @click="yearMonthsPush" class="icon has-text-grey-light">
        <i class="fas fa-caret-square-right"></i>
      </span>
    </div>
    <div class="tags">
      <span v-for="(item, key) in yearMonths" :key="key" @click="setTargetPrintSheet(key)" class="tag is-info is-rounded">
        {{ item }}
        <button v-if="yearMonths.length > 1 || key!=0" @click.stop="yearMonthsSplice(key)" class="delete is-small"></button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'yearMonths',
    ]),
  },
  methods: {
    ...mapState([
      'targetPrintSheet',
    ]),
    ...mapMutations([
      'yearMonthsUnshift',
      'yearMonthsPush',
      'yearMonthsSplice',
      'setTargetPrintSheet',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.year-month {
  .icons {
    border-top: 1px solid #eee;
    padding: 0 5px;
    .icon {
      width: 1.2rem;
      opacity: .75;
      cursor: pointer;
      user-select: none;
      &:hover {
        opacity: 1;
      }
    }
  }
  .tags {
    border-bottom: 1px solid #eee;
    margin: 0 !important;
    padding: 2px 5px 3px;
    .tag {
      width: 93px;
      background: #209cee;
      margin-right: .25rem !important;
      margin-bottom: .3rem !important;
      cursor: pointer;
      &:hover {
        background: #1496ed;
      }
      &:nth-child(3n) {
        margin-right: 0 !important;
      }
      .delete {
        margin-left: .5rem;
        margin-right: -.75rem;
      }
    }
  }
}
</style>
