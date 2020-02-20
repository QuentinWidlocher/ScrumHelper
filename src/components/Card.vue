<template>
  <div class="card">
    <div class="card-content">
      <h3 class="has-text-weight-light is-size-3">{{ title }}</h3>
      <list-item
        :title="i"
        :displayPreviousArrow="displayPreviousArrow"
        :displayNextArrow="displayNextArrow"
        :readonly="readonly"
        @next="next(i)"
        @previous="previous(i)"
        @remove="remove(i)"
        v-for="(i, idx) in items"
        :key="`${idx}-${i}`"
      />

      <div v-if="!readonly" class="list-item is-flex">
        <div class="field is-full-width has-addons">
          <input
            v-model="newItem"
            type="text"
            class="input control is-small"
            placeholder="Add an entry"
            @keyup.enter="add"
          />
          <button @click="add" class="button is-small">+ Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ListItem from './ListItem.vue';

@Component({
  components: { ListItem }
})
export default class Card extends Vue {
  @Prop({ default: [] }) items!: string[];
  @Prop({ default: '' }) title!: string;
  @Prop({ default: '' }) listName!: string;
  @Prop({ default: true }) displayPreviousArrow!: boolean;
  @Prop({ default: true }) displayNextArrow!: boolean;
  @Prop({ default: false, type: Boolean }) readonly!: boolean;

  newItem = '';

  next(item: string) {
    this.$emit('next', this.listName, item);
  }

  previous(item: string) {
    this.$emit('previous', this.listName, item);
  }

  add() {
    this.$emit('add', this.listName, this.newItem);
    this.newItem = '';
  }

  remove(item: string) {
    this.$emit('remove', this.listName, item);
  }

  private getVariableName(variable: any): string {
    return Object.keys({ variable })[0];
  }
}
</script>
<style lang="scss" scoped>
h3 {
  margin-bottom: 1rem;
}

.card-content {
  padding: 1rem;
}

.list-item {
  padding-left: 0;
  padding-right: 0;
}
</style>
