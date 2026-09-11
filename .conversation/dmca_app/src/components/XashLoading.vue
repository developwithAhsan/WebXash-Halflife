<template>
  <div class="xash-loading-overlay">
    <div class="xash-loading-card">
      <div class="loading-header">
        <div class="status-indicator">
          <span class="pulse-dot"></span>
          <span class="status-text">INITIALIZING ENGINE</span>
        </div>
        <span class="loading-percentage">{{ loadingPercentage }}%</span>
      </div>

      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: `${loadingPercentage}%` }"
        ></div>
      </div>

      <div class="loading-footer">
        <span class="loading-subtext">Loading Half-Life assets & WebAssembly runtime...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useXashStore } from '/@/stores/store';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  const store = useXashStore();
  const { loadingProgress, maxLoadingAmount } = storeToRefs(store);

  const loadingPercentage = computed(() => {
    if (maxLoadingAmount.value === 0) return 0;
    return Math.min(100, Math.max(0, Math.round((loadingProgress.value / maxLoadingAmount.value) * 100)));
  });
</script>

<style scoped>
  .xash-loading-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(8, 10, 15, 0.85);
    backdrop-filter: blur(8px);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .xash-loading-card {
    width: 90%;
    max-width: 440px;
    background: #111620;
    border: 1px solid rgba(245, 158, 11, 0.4);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.15);
    padding: 24px;
    border-radius: 8px;
    color: #e2e8f0;
  }

  .loading-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #f59e0b;
    box-shadow: 0 0 8px #f59e0b;
    animation: pulse 1.5s infinite;
  }

  .status-text {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #f59e0b;
  }

  .loading-percentage {
    font-size: 18px;
    font-weight: 800;
    color: #f8fafc;
  }

  .progress-track {
    width: 100%;
    height: 8px;
    background: #1e293b;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%);
    box-shadow: 0 0 12px rgba(245, 158, 11, 0.6);
    transition: width 0.2s ease-out;
  }

  .loading-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .loading-subtext {
    font-size: 11px;
    color: #94a3b8;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(0.85);
    }
  }
</style>
