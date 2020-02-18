<template>
  <div id="App">
    <header>
      <h1 class="is-size-1 title-text">Scrum Helper</h1>
      <h2 class="is-size-4 has-text-grey has-text-weight-light date">
        {{ today.date.toLocaleDateString() }}
      </h2>
      <button @click="modal = true" class="button is-large is-hidden-touch ml-auto">
        Get morning scrum
      </button>
      <button @click="modal = true" class="button is-large is-hidden-desktop is-fullwidth ml-auto">
        Get morning scrum
      </button>
    </header>

    <modal :show.sync="modal" :title="'Scrum of ' + today.date.toLocaleDateString()"> </modal>

    <div class="columns is-desktop">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from './components/Card.vue';
import Modal from './components/Modal.vue';
import 'bulma/css/bulma.min.css';
import List from './models/List';
import Day from './models/Day';

@Component({
  components: {
    Card,
    Modal
  }
})
export default class App extends Vue {
  today: Day = {
    date: new Date(),
    lists: [
      { name: 'todo', title: 'To do', list: [] },
      { name: 'inProgress', title: 'In progress', list: [] },
      { name: 'tomorrow', title: 'Tomorrow', list: [] },
      { name: 'done', title: 'Done', list: [] }
    ]
  };

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

  private getList(name: string, index = 0): string[] | undefined {
    const listIndex = this.today.lists.findIndex((list: List) => list.name === name);
    return this.today.lists[listIndex + index].list;
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
