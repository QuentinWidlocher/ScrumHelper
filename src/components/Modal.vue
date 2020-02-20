<template>
  <div class="modal" :class="{ 'is-active': showing }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message">
        <div class="message-header">
          <p>{{ title }}</p>
          <button @click="showing = false" class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <slot></slot>
        </div>
      </article>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';
import Day from '../models/Day';

@Component({})
export default class Modal extends Vue {
  @PropSync('show') showing!: boolean;
  @Prop({ default: '' }) title!: string;
}
</script>
<style lang="scss" scoped>
.modal-content {
  min-width: 75%;
}
</style>
