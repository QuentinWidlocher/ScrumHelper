<template>
  <div>
    <template v-if="done && done.length">
      <h1 class="is-size-3">What I did last time</h1>
      <ul>
        <li v-for="task in done" :key="task">{{ task }}</li>
      </ul>
    </template>

    <template v-if="todo && todo.length">
      <h1 class="is-size-3">What I will do today</h1>
      <ul>
        <li v-for="task in todo" :key="task">{{ task }}</li>
      </ul>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'vue-property-decorator';
import Day from '@/models/Day';
import List from '@/models/List';

@Component({})
export default class ScrumSummary extends Vue {
  @Prop({ default: {} }) today!: Day;
  @Prop() lastDay?: Day;

  todo: string[] = [];
  done: string[] = [];

  @Watch('today', {deep: true})
  @Watch('lastDay', {deep: true})
  private loadSummary() {
    this.todo = this.loadTodo();
    this.done = this.loadDone();
  }

  private loadDone(): string[] {
    if (!this.lastDay) return [];

    return this.lastDay.lists.find((list: List) => {
      return list.name === 'done';
    })!.list;
  }

  private loadTodo(): string[] {

    const todayTodo: string[] = this.today.lists.find((list: List) => {
          return list.name === 'todo';
    })?.list || [];    

    let yesterdayTodo: string[] = [];
    let yesterdayTomorrow: string[] = [];

    if (this.lastDay) {
      yesterdayTodo = this.lastDay.lists.find((list: List) => {
          return list.name === 'todo';
        })?.list || [];

      yesterdayTomorrow = this.lastDay.lists.find((list: List) => {
        return list.name === 'tomorrow';
      })?.list || [];
    }

    return todayTodo.concat(yesterdayTodo, yesterdayTomorrow);
  }
}
</script>
<style lang="scss" scoped></style>
