<template>
  <div class="window no-resize" name="Launch Options">
    <div class="box">
      <div class="options">
        <label for="fullscreen">
          <input
            id="fullscreen"
            v-model="fullScreen"
            name="fullscreen"
            type="checkbox"
          />
          Start in fullscreen
        </label>
        <label for="cheats">
          <input
            id="cheats"
            v-model="enableCheats"
            name="cheats"
            type="checkbox"
          />
          Enable developer cheats
        </label>
        <label for="console">
          <input
            id="console"
            v-model="enableConsole"
            name="console"
            type="checkbox"
          />
          Open developer console
        </label>
      </div>
      <label class="launch-options-input">
        <span>Additional launch arguments</span>
        <input v-model="launchOptions" class="xash-launch-options" type="text" placeholder="-console -novid" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useXashStore } from '/@/stores/store';
  import { storeToRefs } from 'pinia';

  const store = useXashStore();
  const { launchOptions, fullScreen, enableConsole, enableCheats } = storeToRefs(store);
</script>

<style scoped lang="scss">
  .xash-launch-options {
    width: 100%;
  }

  .options {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    label {
      cursor: pointer;
    }
  }

  .launch-options-input {
    display: grid;
    gap: 8px;
    color: var(--fog-500);
    font: 500 10px/1 'DM Mono', monospace;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
</style>
