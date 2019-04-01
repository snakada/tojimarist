<template>
  <nav class="navbar" :class="{ 'has-active-burger': sidePanelIsOpened }">
    <div class="navbar-brand">
      <h1 class="navbar-item">印刷用</h1>
      <a class="navbar-burger burger" :class="{ 'is-active': sidePanelIsOpened }"
        @click="toggleSidePanel">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['sidePanelIsOpened']),
  },
  methods: {
    ...mapMutations(['toggleSidePanel']),
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #ccc;
  .burger {
    display: flex;
  }
  .navbar-brand {
    width: 120px;
    transition: width .2s;
  }
  &.has-active-burger {
    .navbar-brand {
      width: 300px;
    }
  }
}

@media print {
  .navbar {
    display: none;
  }
}
</style>
