<template>
  <div>
    <h1 class="is-size-3">What I did yesterday</h1>
    <ul>
      <li v-for="task in done" :key="task">{{ task }}</li>
    </ul>

    <h1 class="is-size-3">What I will do today</h1>
    <ul>
      <li v-for="task in yesterdayDone" :key="task">{{ task }}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';
import Day from '@/models/Day';
import List from '@/models/List';

@Component({})
export default class ScrumSummary extends Vue {
  @Prop({ default: {} }) today!: Day;
  @Prop({ default: {} }) yesterday!: Day;

  get done() {
    return this.yesterday.lists.find((list: List) => {
      return list.name === 'done';
    })?.list;
  }

  get todo() {
    return this.yesterday.lists.find((list: List) => {
      return list.name === 'todo';
    })?.list;
  }
}
</script>
<style lang="scss" scoped></style>
