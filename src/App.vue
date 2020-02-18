<template>
  <div id="App">
    <div class="columns is-desktop">
      <div class="column" v-for="(list, i) in lists" :key="list.name">
        <card
          :title="list.title"
          :listName="list.name"
          :items="list.list"
          :displayPreviousArrow="i > 0"
          :displayNextArrow="i < lists.length - 1"
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
import 'bulma/css/bulma.min.css';

@Component({
  components: {
    Card
  }
})
export default class App extends Vue {
  lists = [
    { name: 'todo', title: 'To do', list: [] },
    { name: 'inProgress', title: 'In progress', list: [] },
    { name: 'tomorrow', title: 'Tomorrow', list: [] },
    { name: 'done', title: 'Done', list: [] }
  ];

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
    const listIndex = this.lists.findIndex(list => list.name === name);
    return this.lists[listIndex + index].list;
  }
}
</script>

<style lang="scss">
#App {
  margin-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
