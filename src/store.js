import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from 'dayjs';

Vue.use(Vuex);

const DEFAULT_CHECK_ITEMS = [
  '玄関',
  'キッチン\n蛇口',
  '火元',
  '水回り',
  'リビング',
  '寝室',
  '書斎',
  '勝手口',
  '庭水道',
];

const store = new Vuex.Store({
  state: {
    sidePanelIsOpened: true,
    yearMonths: [dayjs().add(1, 'month').format('YYYY-MM')],
    movedCheckItem: null,
    targetPrintSheet: null,
    checkItems: [],
  },
  mutations: {
    toggleSidePanel(state) {
      state.sidePanelIsOpened = !state.sidePanelIsOpened;
    },
    yearMonthsUnshift(state) {
      const firstMonth = dayjs(state.yearMonths[0]);
      const prevMonth = firstMonth.subtract(1, 'month');
      state.yearMonths.unshift(prevMonth.format('YYYY-MM'));
    },
    yearMonthsPush(state) {
      const lastIndex = state.yearMonths.length - 1;
      const lastMonth = dayjs(state.yearMonths[lastIndex]);
      const nextMonth = lastMonth.add(1, 'month');
      state.yearMonths.push(nextMonth.format('YYYY-MM'));
    },
    yearMonthsSplice(state, index) {
      state.yearMonths.splice(index, 1);
    },
    highlightCheckItem(state, index) {
      state.movedCheckItem = index;
    },
    unhighlightCheckItem(state) {
      state.movedCheckItem = null;
    },
    addCheckItem(state, newItem) {
      state.checkItems.push(newItem);
    },
    moveCheckItem(state, { oldIndex, newIndex }) {
      const moved = state.checkItems.splice(oldIndex, 1)[0];
      state.checkItems.splice(newIndex, 0, moved);
    },
    removeCheckItem(state, index) {
      state.checkItems.splice(index, 1);
    },
    loadCheckItemsFromStorage(state) {
      const inStorage = localStorage.getItem('checkItems');
      const data =
        inStorage == null
          ? DEFAULT_CHECK_ITEMS
          : JSON.parse(inStorage);
      state.checkItems = [...data];
    },
    resetCheckItems(state) {
      state.checkItems = [...DEFAULT_CHECK_ITEMS];
    },
    setTargetPrintSheet(state, index) {
      state.targetPrintSheet = index;
    },
  },
  actions: {
    doHighlightCheckItem(context, newIndex) {
      context.commit('highlightCheckItem', newIndex);
      setTimeout(() => context.commit('unhighlightCheckItem'), 1500);
    },
    doResetCheckItems(context) {
      if (window.confirm('この操作は元に戻せません。続行してもよろしいですか？')) {
        context.commit('resetCheckItems');
      }
    },
  },
});

store.subscribe((mutation, state) => {
  const targetTypes = [
    'addCheckItem',
    'moveCheckItem',
    'removeCheckItem',
    'resetCheckItems',
  ];
  if (targetTypes.includes(mutation.type)) {
    localStorage.setItem('checkItems', JSON.stringify(state.checkItems));
  }
});

export default store;
