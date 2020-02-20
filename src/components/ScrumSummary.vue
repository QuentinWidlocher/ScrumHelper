<template>
  <div class="columns">
    <div class="column" v-if="done && done.length">
      <h1 class="is-size-4 has-text-weight-bold">What I did last time</h1>
      <ul>
        <li v-for="task in done" :key="task">• {{ task }}</li>
      </ul>
    </div>

    <div class="column" v-if="(todo && todo.length) || (inProgress && inProgress.length)">
      <h1 class="is-size-4 has-text-weight-bold">What I will do today</h1>

      <div class="columns">
        <div class="column">
          <h2 class="is-size-5">I will first finish :</h2>
          <ul>
            <li v-for="task in inProgress" :key="task">• {{ task }}</li>
          </ul>
        </div>
        <div class="column">
          <h2 class="is-size-5">Then I will do :</h2>
          <ul>
            <li v-for="task in todo" :key="task">• {{ task }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Day from '@/models/Day';
import List from '@/models/List';
import { listService } from '../services/ListService';

@Component({})
export default class ScrumSummary extends Vue {
  @Prop({ default: {} }) today!: Day;
  @Prop() lastDay?: Day;

  todo: string[] = [];
  done: string[] = [];
  inProgress: string[] = [];

  private mounted() {
    this.loadSummary();
  }

  @Watch('today', { deep: true })
  @Watch('lastDay', { deep: true })
  private loadSummary() {
    this.todo = this.loadTodo();
    this.done = this.loadDone();
    this.inProgress = this.loadInProgress();
  }

  private loadDone(): string[] {
    if (!this.lastDay) return [];
    return listService.getListByDay('done', this.lastDay) || [];
  }

  private loadTodo(): string[] {
    return listService.getListByDay('todo', this.today) || [];
  }

  private loadInProgress(): string[] {
    return listService.getListByDay('inProgress', this.today) || [];
  }
}
</script>
<style lang="scss" scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
