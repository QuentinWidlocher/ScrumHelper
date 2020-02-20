<template>
  <div id="App">
    <header>
      <h1 class="is-size-1 title-text">Scrum Helper</h1>
      <button @click="parameters = true" class="ml-auto custom-button">
        <img src="./assets/settings.svg" alt="settings" />
      </button>
      <button @click="modal = true" class="button is-large is-hidden-touch ml-2">
        Get morning scrum
      </button>
      <button @click="modal = true" class="button is-large is-hidden-desktop is-fullwidth">
        Get morning scrum
      </button>
    </header>

    <modal v-if="today" :show.sync="modal" :title="'Scrum of ' + today.date.toLocaleDateString()">
      <scrum-summary :today="today" :lastDay="lastDay" />
    </modal>

    <modal :show.sync="parameters" title="Parameters">
      <parameters />
    </modal>

    <h2 class="is-size-4 has-text-grey has-text-weight-light date" v-if="today">
      Today : {{ today.date.toLocaleDateString() }}
    </h2>
    <div class="columns is-desktop" v-if="today">
      <div class="column" v-for="(list, i) in today.lists" :key="`today-${list.name}`">
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

    <h2 class="is-size-4 has-text-grey has-text-weight-light date" v-if="lastDay && !simpleMode">
      Last time : {{ lastDay.date.toLocaleDateString() }}
    </h2>
    <div class="columns is-desktop" v-if="lastDay && !simpleMode">
      <div class="column" v-for="(list, i) in lastDay.lists" :key="`lastDay-${list.name}`">
        <card
          :title="list.title"
          :listName="list.name"
          :items="list.list"
          :displayPreviousArrow="i > 0"
          :displayNextArrow="i < lastDay.lists.length - 1"
          readonly
          @next="next"
          @previous="previous"
          @add="add"
          @remove="remove"
        />
      </div>
    </div>

    <template v-if="!simpleMode">
      <template v-for="(day, i) in days">
        <panel v-if="i > 1" :key="`day-${i}-${day.date}`" :title="day.date.toLocaleDateString()">
          <div class="columns is-desktop">
            <div class="column" v-for="(list, j) in day.lists" :key="`list-${j}-${list.name}`">
              <card
                :title="list.title"
                :listName="list.name"
                :items="list.list"
                :displayPreviousArrow="i > 0"
                :displayNextArrow="i < day.lists.length - 1"
                readonly
                @next="next"
                @previous="previous"
                @add="add"
                @remove="remove"
              />
            </div>
          </div>
        </panel>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from './components/Card.vue';
import Modal from './components/Modal.vue';
import ScrumSummary from './components/ScrumSummary.vue';
import Parameters from './components/Parameters.vue';
import Panel from './components/Panel.vue';
import 'bulma/css/bulma.min.css';
import List from './models/List';
import Day from './models/Day';
import { dayService } from './services/DayService';
import { listService } from './services/ListService';
import { settingsService } from './services/SettingsService';

@Component({
  components: {
    Card,
    Modal,
    ScrumSummary,
    Panel,
    Parameters
  }
})
export default class App extends Vue {
  days: Day[] = [];

  modal = false;
  parameters = false;

  next(listName: string, item: string) {
    const currentList = listService.getListByDay(listName, this.today);
    const nextList = listService.getListByDay(listName, this.today, 1);

    if (currentList && nextList) {
      currentList.splice(currentList.indexOf(item), 1);
      nextList.push(item);
    }
  }

  previous(listName: string, item: string) {
    const currentList = listService.getListByDay(listName, this.today);
    const previousList = listService.getListByDay(listName, this.today, -1);

    if (currentList && previousList) {
      currentList.splice(currentList.indexOf(item), 1);
      previousList.push(item);
    }
  }

  add(listName: string, item: string) {
    listService.getListByDay(listName, this.today)?.push(item);
  }

  remove(listName: string, item: string) {
    const list = listService.getListByDay(listName, this.today);
    list?.splice(list.indexOf(item), 1);
  }

  private mounted() {
    this.days = dayService.savedDays;

    // If the last day is not today
    if (!this.today || (this.today.date && !dayService.isToday(this.today.date))) {
      this.newDay();
    }
  }

  private newDay(): void {
    this.days.unshift(dayService.createNewDay());

    if (this.lastDay) {
      this.copyListFromLastDay('todo');
      this.copyListFromLastDay('inProgress');
      this.copyListFromLastDay('tomorrow', 'todo');
    }
  }

  private copyListFromLastDay(sourceName: string, targetName = sourceName) {
    if (!this.lastDay || !this.today) return;

    const source = listService.getListByDay(sourceName, this.lastDay);

    if (!source) return;

    const targetIndex = listService.getListIndexByDay(targetName, this.today);

    this.today.lists[targetIndex].list = this.today.lists[targetIndex].list.concat(source);
  }

  private updated() {
    dayService.savedDays = this.days;
  }

  get today(): Day {
    return this.days[0];
  }

  get lastDay(): Day | undefined {
    return this.days[1];
  }

  get simpleMode(): boolean {
    return settingsService.simpleMode.booleanValue;
  }
  set simpleMode(val: boolean) {
    settingsService.simpleMode.booleanValue = val;
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
  height: 100%;
  width: 100%;

  // Cool milky color
  background-color: #fefcfa;
  opacity: 0.9;
}

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

    button.no-border {
      background: none;
      border: none;
    }
  }

  .date {
    margin-bottom: 1rem;
  }
}

.custom-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;

  img {
    opacity: 0.66;
  }

  &:hover {
    background-color: #0002;
    border-radius: 100%;
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

.ml-2 {
  margin-left: 1.5rem;
}

.mr-1 {
  margin-right: 0.5rem;
}

.mr-2 {
  margin-right: 1.5rem;
}
</style>
