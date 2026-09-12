<template>
  <div class="xash-loading-overlay" role="status" aria-live="polite">
    <div class="xash-loading-card">
      <div class="loading-brand">
        <span class="loading-mark" aria-hidden="true">λ</span>
        <div><strong>LOCAL SESSION</strong><small>Starting game</small></div>
      </div>
      <div class="loading-header">
        <div class="status-indicator"><span class="pulse-dot"></span><span>Preparing engine</span></div>
        <strong class="loading-percentage">{{ loadingPercentage }}%</strong>
      </div>
      <div class="progress-track" aria-hidden="true"><div class="progress-fill" :style="{ width: `${loadingPercentage}%` }"></div></div>
      <div class="loading-footer"><span>Reading your game files locally</span><span>GoldSrc / WASM</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useXashStore } from '/@/stores/store';

const store = useXashStore();
const { loadingProgress, maxLoadingAmount } = storeToRefs(store);
const loadingPercentage = computed(() => maxLoadingAmount.value === 0 ? 0 : Math.min(100, Math.max(0, Math.round((loadingProgress.value / maxLoadingAmount.value) * 100))));
</script>

<style scoped>
.xash-loading-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px; background: rgba(5, 11, 13, .92); backdrop-filter: blur(14px); }
.xash-loading-card { width: min(100%, 480px); padding: 26px; background: #112023; border: 1px solid rgba(243, 181, 72, .35); border-radius: 10px; box-shadow: 0 24px 70px rgba(0, 0, 0, .42); }
.loading-brand { display: flex; align-items: center; gap: 11px; padding-bottom: 25px; border-bottom: 1px solid rgba(191, 211, 197, .12); }
.loading-mark { display: grid; place-items: center; width: 34px; height: 34px; color: #f3b548; border: 1px solid #e69a2e; border-radius: 9px 3px; font: 700 22px/1 Georgia, serif; }
.loading-brand div { display: grid; gap: 4px; }.loading-brand strong { color: #eef1e9; font: 600 13px/1 'Space Grotesk', sans-serif; letter-spacing: .14em; }.loading-brand small, .loading-footer, .status-indicator { color: #84938d; font: 500 10px/1 'DM Mono', monospace; letter-spacing: .08em; text-transform: uppercase; }
.loading-header { display: flex; justify-content: space-between; align-items: center; margin: 28px 0 12px; }.status-indicator { display: flex; align-items: center; gap: 9px; color: #b7d66a; }.pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: #b7d66a; animation: pulse 1.4s ease-in-out infinite; }.loading-percentage { color: #f3b548; font: 500 18px/1 'DM Mono', monospace; }
.progress-track { height: 8px; overflow: hidden; background: #091013; border: 1px solid rgba(191, 211, 197, .16); border-radius: 2px; }.progress-fill { height: 100%; background: #f3b548; transition: width .2s ease-out; }.loading-footer { display: flex; justify-content: space-between; gap: 15px; margin-top: 12px; font-size: 9px; }
@keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .45; transform: scale(.82); } }
@media (max-width: 500px) { .xash-loading-card { padding: 21px; }.loading-footer { display: grid; gap: 6px; } }
@media (prefers-reduced-motion: reduce) { .pulse-dot { animation: none; } }
</style>