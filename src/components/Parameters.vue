<template>
  <div>
    <label class="checkbox">
      <input type="checkbox" v-model="simpleMode" />
      Simple display
    </label>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { settingsService } from '../services/SettingsService';

@Component({})
export default class Parameters extends Vue {
  get simpleMode(): boolean {
    return settingsService.simpleMode.booleanValue;
  }
  set simpleMode(val: boolean) {
    settingsService.simpleMode.booleanValue = val;
  }
}
</script>
<style lang="scss" scoped></style>
