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
          <span>
            <strong>Start in fullscreen</strong>
            <small>Open the game at full size</small>
          </span>
        </label>
        <label class="select-option" for="fps-limit">
          <span>
            <strong>FPS limit</strong>
            <small>Use 0 for unlimited</small>
          </span>
          <select id="fps-limit" v-model="fpsLimit" name="fps-limit">
            <option value="0">Unlimited</option>
            <option value="30">30 FPS</option>
            <option value="60">60 FPS</option>
            <option value="120">120 FPS</option>
          </select>
        </label>
        <label class="select-option" for="touch-controls">
          <span>
            <strong>Touch controls</strong>
            <small>Useful on phones and tablets</small>
          </span>
          <select id="touch-controls" v-model="touchControls" name="touch-controls">
            <option value="AUTO">Auto</option>
            <option value="ON">On</option>
            <option value="OFF">Off</option>
          </select>
        </label>
        <label for="cheats">
          <input
            id="cheats"
            v-model="enableCheats"
            name="cheats"
            type="checkbox"
          />
          <span>
            <strong>Developer cheats</strong>
            <small>Optional testing tools</small>
          </span>
        </label>
        <label for="console">
          <input
            id="console"
            v-model="enableConsole"
            name="console"
            type="checkbox"
          />
          <span>
            <strong>Open developer console</strong>
            <small>Useful for server commands</small>
          </span>
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
  const { launchOptions, fullScreen, enableConsole, enableCheats, fpsLimit, touchControls } = storeToRefs(store);
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
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      cursor: pointer;
    }

    label > span {
      display: grid;
      gap: 3px;
    }

    strong {
      color: var(--fog-300);
      font-size: 12px;
      font-weight: 600;
    }

    small {
      color: var(--fog-500);
      font-size: 10px;
      line-height: 1.35;
    }

    input {
      margin-top: 2px;
      accent-color: var(--amber-400);
    }

    .select-option {
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      border-top: 1px solid var(--line);
    }

    select {
      min-width: 108px;
      padding: 7px 8px;
      color: var(--fog-100);
      background: var(--ink-850);
      border: 1px solid var(--line);
      border-radius: 5px;
      font-size: 11px;
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
