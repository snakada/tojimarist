<template>
  <div id="app">
    <AppHeader/>
    <div class="columns is-gapless">
      <div class="column is-narrow">
        <SidePanel/>
      </div>
      <div class="column">
        <MainSection/>
      </div>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import "bulma/bulma.sass";

import AppHeader from './components/AppHeader.vue';
import MainSection from './components/MainSection.vue';
import SidePanel from './components/SidePanel.vue';

export default {
  name: 'app',
  components: {
    AppHeader,
    MainSection,
    SidePanel,
  },
  mounted() {
    this.$store.commit('loadCheckItemsFromStorage');
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  overflow: hidden;
}

.customized-toast {
  &.full-width {
    left: 330px;
    bottom: 30px;
    width: calc(100% - 360px);
    max-width: none;
    transform: none;
  }
}

@media print {
  html,
  body {
    height: auto;
    overflow: auto;
  }
  .customized-toast {
    display: none !important;
  }
}
</style>
