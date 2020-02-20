<template>
  <div class="card" @click="toggleExpand">
    <div class="card-header">
      <h2 class="card-header-title is-size-4 has-text-grey has-text-weight-light">
        {{ title }}
      </h2>
    </div>
    <div class="card-content" v-if="expanded">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VNode } from 'vue';

@Component({})
export default class Panel extends Vue {
  @Prop({ default: '' }) title!: string;

  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;

    window.setTimeout(() => {
      window.scrollTo(0, window.scrollY + this.$el.getBoundingClientRect().bottom);
    });
  }
}
</script>
<style lang="scss" scoped>
.card-header {
  cursor: pointer;
}
</style>
