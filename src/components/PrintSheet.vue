<template>
  <article>
    <header>
      <h1>戸締まりチェックリスト</h1>
      <h2>{{ year }}年{{ month }}月</h2>
    </header>
    <table>
      <thead>
        <tr>
          <th class="of-date" rowspan="2">日付</th>
          <th class="of-unlocking" colspan="2">解錠</th>
          <th rowspan="2" class="of-check" v-for="(item, key) in checkItems" :key="key">
            <div class="check-inner" :class="{ 'is-moved': isMoved(key)}">{{ item }}</div>
          </th>
          <th class="of-locking" colspan="2">施錠</th>
        </tr>
        <tr>
          <th class="of-unlocking of-person">実施者</th>
          <th class="of-unlocking of-time">時間</th>
          <th class="of-locking of-person">実施者</th>
          <th class="of-locking of-time">時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day, key) in days" :key="key" :class="{
        'is-saturday': day.isSaturday,
        'is-sunday'  : day.isSunday,
        'is-holiday' : day.holiday,
        }">
          <th class="of-date">
            {{ day.date }} ({{ day.dayOfWeek }})
            <span v-if="day.holiday" class="holiday">{{ day.holiday }}</span>
          </th>
          <td class="of-unlocking of-person">&nbsp;</td>
          <td class="of-unlocking of-time">：</td>
          <td class="of-check" v-for="i in checkItems.length" :key="i">
            <span class="square"></span>
          </td>
          <td class="of-locking of-person">&nbsp;</td>
          <td class="of-locking of-time">：</td>
        </tr>
      </tbody>
    </table>
    <div class="stamps">
      <div class="stamp">MGR印</div>
    </div>
  </article>
</template>

<script>
import Vue from 'vue';
import Toasted from 'vue-toasted';
import { mapState } from 'vuex';
import japaneseHolidays from 'japanese-holidays';
import dayjs from 'dayjs';

Vue.use(Toasted);

const daysArr = ['日', '月', '火', '水', '木', '金', '土'];

export default {
  props: [
    'yearMonth',
    'showToast',
  ],
  data() {
    const now = dayjs(this.yearMonth);
    return {
      now,
      start  : now.startOf('month'),
      numDays: now.daysInMonth(),
      year   : now.year(),
      month  : now.month() + 1,
    };
  },
  computed: {
    ...mapState([
      'checkItems',
      'nosStr',
      'movedCheckItem',
    ]),
    days() {
      return [...Array(this.numDays).keys()]
        .map(i => {
          const current = this.now.date(i + 1);
          const dayNum  = current.day();
          return {
            isSaturday: dayNum === 6,
            isSunday  : dayNum === 0,
            date      : current.date(),
            holiday   : japaneseHolidays.isHoliday(current.toDate()),
            dayOfWeek : daysArr[dayNum],
          };
        });
    },
  },
  mounted() {
    if (this.showToast) {
      this.toasted(`${this.yearMonth} を追加しました。`);
    }
  },
  destroyed() {
    this.toasted(`${this.yearMonth} を削除しました。`);
  },
  methods: {
    isMoved(key) {
      return key === this.movedCheckItem;
    },
    toasted(message) {
      this.$toasted.show(message, {
        theme: 'toasted-primary',
        position: 'bottom-center',
        duration: 3000,
        fullWidth: true,
        containerClass: 'customized-toast',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
article {
  background: #fff;
  width: 850px;
  margin: 70px auto 0;
  padding: 40px 50px;
  box-shadow: 0 0 5px #666;
  &:first-child {
    margin-top: 0;
  }
}
header {
  position: relative;
  h1 {
    text-align: center;
    line-height: 1;
    font-size: 16px;
    font-weight: bold;
  }
  h2 {
    margin: 10px 0;
    line-height: 1;
    font-size: 15px;
    font-weight: bold;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  border: 1px solid #999;
  th,
  td {
    border: 1px #999;
    border-style: dotted solid;
    height: 27px;
    font-size: 12px;
    line-height: 1;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    &.of-date {
    }
    &.of-unlocking,
    &.of-locking {
      &.of-person,
      &.of-time {
        width: 60px;
      }
    }
    &.of-check {
      padding: 1px 3px 0;
      .square {
        display: inline-block;
        border: 1px solid #999;
        width: 13px;
        height: 13px;
        vertical-align: middle;
        transform: translateY(-1px);
      }
    }
  }
  thead {
    th {
      border-bottom: 1px solid #999;
      padding: 3px 5px;
      height: auto;
      white-space: nowrap;
      &.of-check {
        padding: 0;
        height: 100%;
        .check-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 3px 5px;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-size: 11px;
          line-height: 1.3;
          &.is-moved {
            animation: highlight-in 1s ease-in-out;
          }
        }
      }
    }
  }
  tbody {
    th {
      white-space: nowrap;
    }
  }
  tr {
    &.is-saturday,
    &.is-sunday,
    &.is-holiday {
      background: #ddd;
      td {
        opacity: .75;
      }
    }
    &.is-saturday {
      .of-date {
        color: blue;
      }
    }
    &.is-sunday,
    &.is-holiday {
      .of-date {
        color: red;
      }
    }
    &.is-holiday {
      th {
        font-size: 11px;
        line-height: 1;
        .holiday {
          display: block;
          margin-top: 3px;
          font-size: 10px;
          line-height: 1;
        }
      }
    }
  }
}

$stamp-size: 55px;
.stamps {
  padding-top: 20px;
  text-align: right;
  .stamp {
    display: inline-block;
    border: 1px solid #999;
    width: $stamp-size;
    height: $stamp-size;
    line-height: $stamp-size;
    text-align: center;
    font-size: 11px;
    color: #aaa;
  }
}

@keyframes highlight-in {
  0% {
    background: #fff;
  }
  50% {
    background: #ff7;
  }
  100% {
    background: #fff;
  }
}

@media print {
  article {
    box-shadow: none;
    width: auto;
    margin-top: 0;
    padding: 0 5px;
    page-break-before: always;
  }
}
</style>
