<template>
  <div class="list-item is-flex">
    <button v-if="displayLeftArrow" @click="previous" class="custom-button mr-1">
      <img :src="previousArrow" alt="arrow previous" />
    </button>
    <span>{{ title }}</span>
    <button @click="remove" class="custom-button ml-auto mr-2">
      <img src="@/assets/trash.svg" alt="delete" />
    </button>
    <button v-if="displayRightArrow" @click="next" class="custom-button">
      <img :src="nextArrow" alt="arrow next" />
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ListItem extends Vue {
  @Prop({ default: '' }) title!: string;
  @Prop({ default: true }) displayLeftArrow!: boolean;
  @Prop({ default: true }) displayRightArrow!: boolean;

  next() {
    this.$emit('next');
  }

  previous() {
    this.$emit('previous');
  }

  remove() {
    this.$emit('remove');
  }

  get nextArrow(): string {
    return require(`../assets/arrow-${window.innerWidth < 1024 ? 'down' : 'right'}.svg`);
  }

  get previousArrow(): string {
    return require(`../assets/arrow-${window.innerWidth < 1024 ? 'up' : 'left'}.svg`);
  }
}
</script>
<style lang="scss" scoped>
.list-item {
  padding-left: 0;
  padding-right: 0;
}

.custom-button {
  background: none;
  border: none;
  cursor: pointer;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  padding-top: 3px;

  margin-bottom: auto;
  margin-top: auto;

  img {
    width: 1rem;
    opacity: 0.66;
  }

  &:hover {
    background-color: #0002;
    border-radius: 100%;
  }
}
</style>
