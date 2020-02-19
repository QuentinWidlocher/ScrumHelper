<template>
  <div id="App">
    <header>
      <h1 class="is-size-1 title-text">Scrum Helper</h1>
      <button @click="modal = true" class="button is-large is-hidden-touch ml-auto">
        Get morning scrum
      </button>
      <button @click="modal = true" class="button is-large is-hidden-desktop is-fullwidth ml-auto">
        Get morning scrum
      </button>
    </header>

    <modal v-if="today" :show.sync="modal" :title="'Scrum of ' + today.date.toLocaleDateString()">
      <scrum-summary
        :today="today"
        :lastDay="lastDay"
      />
    </modal>


    <h2 class="is-size-4 has-text-grey has-text-weight-light date" v-if="today">
      Today : {{ today.date.toLocaleDateString() }}
    </h2>
    <div class="columns is-desktop" v-if="today">
      <div class="column" v-for="(list, i) in today.lists" :key="list.name">
        <card
          :title="list.title"
          :listName="list.name"
          :items="list.list"
          :displayPreviousArrow="i > 0"
          :displayNextArrow="i < today.lists.length - 1"
          @next="next"
          @previous="previous"
          @add="add"
          @remove="remove"
        />
      </div>
    </div>

    <h2 class="is-size-4 has-text-grey has-text-weight-light date" v-if="lastDay">
      Last time : {{ lastDay.date.toLocaleDateString() }}
    </h2>
    <div class="columns is-desktop" v-if="lastDay">
      <div class="column" v-for="(list, i) in lastDay.lists" :key="list.name">
        <card
          :title="list.title"
          :listName="list.name"
          :items="list.list"
          :displayPreviousArrow="i > 0"
          :displayNextArrow="i < lastDay.lists.length - 1"
          @next="next"
          @previous="previous"
          @add="add"
          @remove="remove"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from './components/Card.vue';
import Modal from './components/Modal.vue';
import ScrumSummary from './components/ScrumSummary.vue';
import 'bulma/css/bulma.min.css';
import List from './models/List';
import Day from './models/Day';
import { dayService } from "./services/DayService";

@Component({
  components: {
    Card,
    Modal,
    ScrumSummary
  }
})
export default class App extends Vue {
  days: Day[] = [];

  modal = false;

  next(listName: string, item: string) {
    const currentList = this.getList(listName, 0);
    const nextList = this.getList(listName, 1);

    if (currentList && nextList) {
      currentList.splice(currentList.indexOf(item), 1);
      nextList.push(item);
    }
  }

  previous(listName: string, item: string) {
    const currentList = this.getList(listName, 0);
    const previousList = this.getList(listName, -1);

    if (currentList && previousList) {
      currentList.splice(currentList.indexOf(item), 1);
      previousList.push(item);
    }
  }

  add(listName: string, item: string) {
    this.getList(listName)?.push(item);
  }

  remove(listName: string, item: string) {
    const list = this.getList(listName);
    list?.splice(list.indexOf(item), 1);
  }

  private mounted() {
    this.days = dayService.savedDays;

    console.log(this.today);
    console.log(this.lastDay);

    // If the last day is not today
    if (!this.today || (this.today.date && this.today.date.toDateString() !== new Date(localStorage.getItem('today')!).toDateString())){
      this.days.unshift(new Day(new Date(localStorage.getItem('today')!)))
    }
  }

  private updated() {
    dayService.savedDays = this.days;
  }

  private getList(name: string, index = 0): string[] | undefined {
    const listIndex = this.today.lists.findIndex((list: List) => list.name === name);
    return this.today.lists[listIndex + index].list;
  }

  get today(): Day {
    return this.days[0];
  }

  get lastDay(): Day | undefined {
    return this.days[1];
  }
}
</script>

<style lang="scss">
#App {
  margin-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    margin-bottom: 2rem;

    .title-text {
      margin-right: 1rem;
      margin-bottom: 0;
    }

    button.button.is-hidden-desktop {
      margin-top: 1rem;
    }
  }
}

.is-full-width {
  width: 100%;
}

.ml-auto {
  margin-left: auto;
}

.ml-1 {
  margin-left: 0.5rem;
}

.mr-1 {
  margin-right: 0.5rem;
}

.mr-2 {
  margin-right: 1.5rem;
}
</style>
