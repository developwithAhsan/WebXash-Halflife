<template>
  <div id="home" class="app-shell">
    <div class="ambient ambient--one" aria-hidden="true"></div>
    <div class="ambient ambient--two" aria-hidden="true"></div>
    <div class="scanlines" aria-hidden="true"></div>

    <header class="site-header">
      <a class="brand" href="#home" aria-label="Home" @click.prevent="scrollToTop">
        <span class="brand-mark" aria-hidden="true">λ</span>
        <span class="brand-copy">
          <strong>BROWSER LAUNCHER</strong>
          <small>GOLDSRC / WASM</small>
        </span>
      </a>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="#setup">Launcher</a>
        <a href="#how-it-works">How it works</a>
        <a href="#faq-section">Help</a>
      </nav>
      <div class="header-actions">
        <span class="engine-state"><i></i> Engine ready</span>
        <button class="header-icon-button" type="button" aria-label="Toggle fullscreen" title="Toggle fullscreen" @click="toggleFullscreen">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        </button>
         <button class="header-launch" type="button" @click="startUplink">
          <span class="button-play" aria-hidden="true"></span>
           Play Uplink
        </button>
      </div>
    </header>

    <main v-if="!loading" class="app-content">
      <div class="launcher-menu launcher-menu--top" aria-label="Launcher menu">
        <div class="launcher-menu__background" aria-hidden="true">
          <div
            v-for="(image, index) in actionPanelImages"
            :key="image"
            class="launcher-menu__background-image"
            :class="{ 'launcher-menu__background-image--active': activeActionPanelImage === index }"
            :style="{ backgroundImage: `url('${image}')` }"
          ></div>
        </div>
        <div class="launcher-menu__title">
          <span>Choose an action</span>
          <small>Browser game launcher</small>
        </div>
        <div class="launcher-menu__buttons">
          <button class="menu-button menu-button--primary" type="button" @click="openPanel('play')">
            <span>Play game</span>
            <small>Start the included Uplink demo or add your own game files</small>
          </button>
          <button class="menu-button" type="button" @click="openPanel('saves')">
            <span>Save manager</span>
            <small>Manage local saves and download a backup</small>
          </button>
          <button class="menu-button" type="button" @click="openPanel('multiplayer')">
            <span>Multiplayer</span>
            <small>Enter a compatible GoldSrc server address</small>
          </button>
          <button class="menu-button" type="button" @click="openPanel('options')">
            <span>Options</span>
            <small>FPS limit, fullscreen, touch controls and more</small>
          </button>
        </div>
      </div>

      <transition name="menu-panel">
        <div v-if="activePanel !== 'none'" class="menu-panel-backdrop" @click.self="closePanel">
          <section class="menu-panel menu-panel--top" :aria-labelledby="`${activePanel}-panel-title`" role="dialog" aria-modal="true">
            <div class="menu-panel__header">
              <div>
                <span class="menu-panel__kicker">Launcher / {{ activePanelIndex }}</span>
                <h3 :id="`${activePanel}-panel-title`">{{ activePanelTitle }}</h3>
              </div>
              <button class="menu-panel__close" type="button" aria-label="Close panel" title="Close panel" @click="closePanel">
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div v-if="activePanel === 'play'" class="menu-panel__content menu-panel__content--play">
              <p>Start the included Uplink demo immediately, or use your own licensed Half-Life or Counter-Strike files. Everything stays in this browser.</p>
              <div class="menu-panel__actions">
                <button class="button button--primary" type="button" @click="startUplink"><span class="button-play" aria-hidden="true"></span> Play Uplink now</button>
                <button class="button button--quiet" type="button" @click="scrollToSection('game-files'); closePanel()">Add your own game files ↘</button>
              </div>
            </div>
            <div v-else-if="activePanel === 'saves'" class="menu-panel__content menu-panel__content--component">
              <XashSaves />
            </div>
            <div v-else-if="activePanel === 'multiplayer'" class="menu-panel__content menu-panel__content--component">
              <p class="menu-panel__help">Enter a compatible server address, then use the launch button below when you are ready.</p>
              <XashMultiplayerIP />
            </div>
            <div v-else class="menu-panel__content menu-panel__content--component">
              <XashLaunchOptions />
              <button class="button button--quiet menu-panel__fullscreen" type="button" @click="toggleFullscreen">Toggle browser fullscreen</button>
            </div>
          </section>
        </div>
      </transition>

      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <h1 id="hero-title">The signal is live.<br /><em>Press play.</em></h1>
          <p class="hero-lead">
            A tiny doorway back to the worlds that started it all. Play the included Uplink
            demo instantly, or bring the game files you already own and keep the whole session
            on your device.
          </p>
          <div class="hero-actions">
            <button class="button button--primary button--hero-play" type="button" @click="startUplink">
              <span class="button-play" aria-hidden="true"></span>
              Play Uplink now
            </button>
            <button class="button button--quiet" type="button" @click="scrollToSetup">
              Bring your own files <span aria-hidden="true">↘</span>
            </button>
          </div>
          <div class="ownership-note">
            <span class="note-icon" aria-hidden="true">✓</span>
            <span><strong>Local by design.</strong> Uplink is included; your licensed files never leave this browser.</span>
          </div>
        </div>
        <div class="hero-visual" aria-label="Engine status and game atmosphere">
          <div class="hero-image" aria-hidden="true"></div>
          <div class="hero-image-shade" aria-hidden="true"></div>
          <div class="visual-topline"><span>LOCAL SESSION</span><span>WX / 64</span></div>
          <div class="lambda-visual" aria-hidden="true">
            <img :src="hlGlyph" alt="" />
            <span>λ</span>
          </div>
          <div class="visual-caption">
            <span class="visual-caption-kicker">Included / uplink</span>
            <strong>A signal from Black Mesa.</strong>
            <small>No installer. No account. Just press play.</small>
          </div>
          <div class="visual-readout">
            <div><span>RENDERER</span><strong>WebGL 2</strong></div>
            <div><span>ENGINE</span><strong>GoldSrc</strong></div>
            <div><span>STORAGE</span><strong>On device</strong></div>
          </div>
          <div class="visual-corner visual-corner--tl"></div>
          <div class="visual-corner visual-corner--br"></div>
        </div>
      </section>

      <section id="setup" class="launcher-section" aria-labelledby="setup-title">
        <div class="section-heading">
          <div>
            <div class="eyebrow"><span class="eyebrow-rule"></span> Launcher / 02</div>
            <h2 id="setup-title">Ready when you are.</h2>
          </div>
          <p>Choose a game, point us to its files, then launch. Your last choices are remembered on this device.</p>
        </div>

        <div class="launcher-layout">
          <aside class="launcher-sidebar">
            <div class="panel panel--game">
              <div class="panel-label"><span>01</span> Choose a game</div>
              <XashGames />
            </div>
            <div id="game-files" class="panel panel--source">
              <div class="panel-label"><span>02</span> Add game files</div>
              <p class="panel-help">Use your own licensed game folder or ZIP archive. Files stay in this browser and are never uploaded.</p>
              <div class="source-card"><XashLoadDirectory /></div>
              <div class="source-divider"><span>or</span></div>
              <div class="source-card"><XashLoadZip /></div>
            </div>
            <div class="panel panel--demos">
              <div class="panel-label"><span>Quick start</span> Included Uplink demo</div>
              <p class="demo-note">The fastest way in. This playable demo is ready before you choose a file.</p>
              <div class="source-card"><XashZips /></div>
            </div>
          </aside>

          <div class="launcher-main">
            <div class="session-banner">
              <div class="session-marker"><i></i></div>
              <div>
                <span class="session-kicker">Current selection</span>
                <strong>{{ selectedGame.name }}</strong>
              </div>
              <span class="session-path">{{ selectedGame.publicDir }}</span>
            </div>

            <div class="launch-strip">
              <div>
                <span class="launch-strip-kicker">Session check</span>
                <strong>Files stay local. Nothing to sign in to.</strong>
              </div>
              <button class="button button--primary button--launch" type="button" @click="startUplink">
                <span class="button-play" aria-hidden="true"></span>
                Start the Uplink demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" class="how-section" aria-labelledby="how-title">
        <div class="section-heading section-heading--compact">
          <div>
            <div class="eyebrow"><span class="eyebrow-rule"></span> No mystery / 03</div>
            <h2 id="how-title">Three steps to Black Mesa.</h2>
          </div>
          <p>This is a browser front-end for the engine. It does not include commercial game data.</p>
        </div>
        <div class="steps">
          <article class="step-card step-card--copy"><span class="step-number">01</span><h3>Bring your copy</h3><p>Use an installed Half-Life or Counter-Strike folder, or select a compatible ZIP from your device.</p></article>
          <article class="step-card step-card--engine"><span class="step-number">02</span><h3>We prepare the engine</h3><p>Files are unpacked into browser storage and the open-source Xash3D engine initializes locally.</p></article>
          <article class="step-card step-card--return"><span class="step-number">03</span><h3>Play and come back</h3><p>Your settings and browser saves are ready the next time you open this launcher on your device.</p></article>
        </div>
      </section>

      <section id="faq-section" class="faq-section" aria-labelledby="faq-title">
        <div class="section-heading section-heading--compact">
          <div>
            <div class="eyebrow"><span class="eyebrow-rule"></span> Field notes / 04</div>
            <h2 id="faq-title">Questions, answered.</h2>
          </div>
          <button class="text-button" type="button" @click="toggleExpandAll">{{ areAllFaqsOpen ? 'Collapse all' : 'Expand all' }}</button>
        </div>
        <div class="faq-tools">
          <div class="faq-tabs" role="tablist" aria-label="FAQ categories">
            <button v-for="cat in faqCategories" :key="cat" type="button" :class="{ active: selectedFaqCategory === cat }" @click="selectedFaqCategory = cat">{{ cat }}</button>
          </div>
          <label class="faq-search"><span class="sr-only">Search questions</span><input v-model="faqSearchQuery" type="search" placeholder="Search controls, saves, performance..." /></label>
        </div>
        <div class="faq-list">
          <article v-for="item in filteredFaqs" :key="item.id" class="faq-item" :class="{ 'faq-item--open': openFaqMap[item.id] }">
            <button type="button" class="faq-question" :aria-expanded="!!openFaqMap[item.id]" @click="toggleFaq(item.id)">
              <span><small>{{ item.category }}</small>{{ item.q }}</span><b aria-hidden="true">{{ openFaqMap[item.id] ? '−' : '+' }}</b>
            </button>
            <div v-show="openFaqMap[item.id]" class="faq-answer"><p>{{ item.a }}</p></div>
          </article>
        </div>
      </section>

      <section id="community-comments" class="community-section" aria-labelledby="community-title">
        <div class="section-heading section-heading--compact">
          <div>
            <div class="eyebrow"><span class="eyebrow-rule"></span> Open channel / 05</div>
            <h2 id="community-title">Made with the community.</h2>
          </div>
          <button class="button button--quiet" type="button" @click="loadDisqus">Refresh discussion</button>
        </div>
        <div class="community-card">
          <div class="community-card-top"><span><i></i> Community discussion</span><span>{{ disqusLoaded ? 'Connected' : 'Ready to load' }}</span></div>
          <div id="disqus_thread" class="disqus-thread-container"></div>
          <p v-if="!disqusLoaded" class="community-empty">The discussion board loads when you ask for it. Share fixes, server addresses, and stories from the lab.</p>
          <noscript>Enable JavaScript to view the community discussion.</noscript>
        </div>
      </section>
    </main>

    <XashLoading v-if="loading" />
    <transition name="toast">
      <div v-if="toastMessage" class="toast" role="status">{{ toastMessage }}</div>
    </transition>

    <footer class="site-footer">
      <div class="footer-brand"><span class="brand-mark" aria-hidden="true">λ</span><span>LOCAL GOLD SOURCE</span></div>
      <p>This is an independent, open-source browser port powered by Xash3D FWGS. Half-Life and Counter-Strike are trademarks of Valve Corporation. Bring and use game files you are licensed to use.</p>
      <div class="footer-links"><a href="https://github.com/x8BitRain/webXash/" target="_blank" rel="noopener noreferrer">Source</a><a href="https://github.com/x8BitRain/webXash/?tab=readme-ov-file#how-to-use" target="_blank" rel="noopener noreferrer">Documentation</a><a href="#home" @click.prevent="scrollToTop">Back to top ↑</a></div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useXashStore } from '/@/stores/store';
import { XashLoader } from '/@/services';
import XashGames from '/@/components/XashGames.vue';
import XashLaunchOptions from '/@/components/XashLaunchOptions.vue';
import XashLoadDirectory from '/@/components/XashLoadDirectory.vue';
import XashLoadZip from '/@/components/XashLoadZip.vue';
import XashLoading from '/@/components/XashLoading.vue';
import XashMultiplayerIP from '/@/components/XashMultiplayerIP.vue';
import XashSaves from '/@/components/XashSaves.vue';
import XashZips from '/@/components/XashZips.vue';
import setCanvasLoading from '/@/utils/setCanvasLoading';
// @ts-ignore -- Vite asset URL import
import hlGlyph from '/@/assets/hl.svg?url';

const store = useXashStore();
const { loading, loadingProgress, maxLoadingAmount, selectedGame, selectedZip, selectedLocalFolder, xashCanvas, launchOptions, fullScreen, enableConsole, enableCheats, fpsLimit, touchControls, toastMessage, customGameArg } = storeToRefs(store);
const { onStartLoading, refreshSavesList } = store;
type PanelName = 'none' | 'play' | 'saves' | 'multiplayer' | 'options';
const activePanel = ref<PanelName>('none');
const activePanelTitle = computed(() => ({
  none: '',
  play: 'Play game',
  saves: 'Save manager',
  multiplayer: 'Multiplayer',
  options: 'Options',
}[activePanel.value]));
const activePanelIndex = computed(() => ({
  none: '00',
  play: '01',
  saves: '02',
  multiplayer: '03',
  options: '04',
}[activePanel.value]));
const openPanel = (panel: Exclude<PanelName, 'none'>) => { activePanel.value = panel; };
const closePanel = () => { activePanel.value = 'none'; };
const handlePanelKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && activePanel.value !== 'none') closePanel();
};
const actionPanelImages = ['/scene-01.jpeg', '/scene-02.jpeg', '/scene-03.jpeg'];
const activeActionPanelImage = ref(0);
let actionPanelImageTimer: number | null = null;

const faqCategories = ['All', 'How to Play', 'Multiplayer', 'Emulation & Tech', 'Android & Devices'];
const selectedFaqCategory = ref('All');
const faqSearchQuery = ref('');
const openFaqMap = ref<Record<string, boolean>>({ 'how-1': true, 'can-1': false, 'multi-1': false, 'emu-1': false, 'save-1': false });
const faqData = [
  { id: 'how-1', category: 'How to Play', q: 'What files do I need to bring?', a: 'Use game files from a copy you own. Select the folder that contains the game data, or choose a compatible ZIP. This launcher does not provide commercial game files and never uploads the files you select.' },
  { id: 'can-1', category: 'How to Play', q: 'Will my keyboard and mouse work?', a: 'Yes. The launcher uses Pointer Lock for mouse look and supports the familiar WASD, mouse, Space, Ctrl, E, and R controls. Click the game canvas once it launches to capture the pointer.' },
  { id: 'multi-1', category: 'Multiplayer', q: 'How do I connect to a server?', a: 'Open the developer console with the tilde key and use the standard GoldSrc connect command. The Multiplayer server field is available for launch setups that use a compatible WebSocket proxy.' },
  { id: 'emu-1', category: 'Emulation & Tech', q: 'Where do the files go?', a: 'The engine runs in WebAssembly and uses browser storage on this device. Your selected files are read locally; browser saves and settings can be managed from the launcher.' },
  { id: 'save-1', category: 'Emulation & Tech', q: 'Can I back up my save games?', a: 'Yes. Use the Saves panel to add save files, select one, and download a copy. Saves live in your browser storage and are tied to this device and browser profile.' },
];
const filteredFaqs = computed(() => faqData.filter((item) => (selectedFaqCategory.value === 'All' || item.category === selectedFaqCategory.value) && (!faqSearchQuery.value.trim() || `${item.q} ${item.a}`.toLowerCase().includes(faqSearchQuery.value.toLowerCase()))));
const areAllFaqsOpen = computed(() => filteredFaqs.value.length > 0 && filteredFaqs.value.every((item) => openFaqMap.value[item.id]));
const toggleFaq = (id: string) => { openFaqMap.value[id] = !openFaqMap.value[id]; };
const toggleExpandAll = () => { const open = !areAllFaqsOpen.value; filteredFaqs.value.forEach((item) => { openFaqMap.value[item.id] = open; }); };
const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const disqusLoaded = ref(false);
const loadDisqus = () => {
  const thread = document.getElementById('disqus_thread');
  if (!thread) return;
  try {
    (window as any).disqus_config = function (this: any) {
      this.page.url = window.location.href;
      this.page.identifier = 'webxash-main-discussion';
      this.page.title = 'Browser game community discussion';
    };
    if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({ reload: true, config: (window as any).disqus_config });
      disqusLoaded.value = true;
      showToast('Discussion refreshed');
      return;
    }
    const existing = document.getElementById('disqus-embed-script');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'disqus-embed-script';
    script.src = 'https://halflifebrowser.disqus.com/embed.js';
    script.async = true;
    script.onload = () => { disqusLoaded.value = true; };
    script.onerror = () => { disqusLoaded.value = false; };
    (document.head || document.body).appendChild(script);
  } catch { disqusLoaded.value = false; }
};

let toastTimer: number | null = null;
const showToast = (message: string) => {
  toastMessage.value = message;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toastMessage.value = ''; }, 2800);
};
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const scrollToSetup = () => document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
const toggleFullscreen = () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => showToast('Fullscreen is not supported here'));
  else document.exitFullscreen().catch(() => undefined);
};
const startUplink = async () => {
  const canvas = xashCanvas.value || document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) { showToast('Engine canvas is not ready'); return; }
  xashCanvas.value = canvas;
  setCanvasLoading();
  selectedZip.value = 'uplink.zip';
  onStartLoading();
  maxLoadingAmount.value = 100;
  loadingProgress.value = 5;
  try {
    const zip = await XashLoader.downloadZip('uplink.zip', selectedGame.value.publicDir, (progress: number) => { loadingProgress.value = Math.max(5, Math.min(95, progress)); });
    if (!zip) { loading.value = false; showToast('Could not retrieve the demo assets'); return; }
    loadingProgress.value = 96;
    const xash = await XashLoader.startGameZip(zip, { canvas, selectedGame: selectedGame.value, selectedZip: 'uplink.zip', selectedLocalFolder: selectedLocalFolder.value, launchOptions: launchOptions.value, fullScreen: fullScreen.value, enableConsole: enableConsole.value, enableCheats: enableCheats.value, fpsLimit: fpsLimit.value, touchControls: touchControls.value, onStartLoading, onEndLoading: store.onEndLoading, onProgress: (progress: any) => { loadingProgress.value = typeof progress === 'number' ? progress : progress?.current ?? loadingProgress.value; } });
    loadingProgress.value = 100;
    await XashLoader.onAfterLoad({ xash, selectedGame: selectedGame.value, customGameArg: customGameArg.value, enableCheats: enableCheats.value });
    XashLoader.initConsoleCallbacks(xash, selectedGame.value.consoleCallbacks).catch((error) => console.warn('Console callback listener error:', error));
    await refreshSavesList();
    window.setTimeout(() => canvas.focus(), 100);
  } catch (error: any) {
    loading.value = false;
    showToast(error?.message || 'Could not launch the engine');
  }
};

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.addEventListener('keydown', handlePanelKeydown);
  actionPanelImageTimer = window.setInterval(() => {
    activeActionPanelImage.value = (activeActionPanelImage.value + 1) % actionPanelImages.length;
  }, 5000);
  const comments = document.getElementById('community-comments');
  if (comments && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) { loadDisqus(); observer.disconnect(); } }, { rootMargin: '300px' });
    observer.observe(comments);
  }
});
onUnmounted(() => {
  window.removeEventListener('keydown', handlePanelKeydown);
  if (actionPanelImageTimer) window.clearInterval(actionPanelImageTimer);
  if (toastTimer) clearTimeout(toastTimer);
});
</script>

<style scoped>
.app-shell { position: relative; min-height: 100dvh; overflow: hidden; background: var(--ink-950); color: var(--fog-100); }
.app-shell::before { position: absolute; inset: 0; content: ""; pointer-events: none; opacity: .45; background-image: linear-gradient(rgba(120, 165, 153, .045) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 165, 153, .045) 1px, transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to bottom, black, transparent 75%); }
.ambient { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(1px); }
.ambient--one { top: -180px; left: -150px; width: 580px; height: 580px; background: radial-gradient(circle, rgba(207, 125, 43, .15), transparent 68%); }
.ambient--two { top: 420px; right: -220px; width: 620px; height: 620px; background: radial-gradient(circle, rgba(63, 129, 117, .12), transparent 68%); }
.scanlines { position: fixed; inset: 0; z-index: 10; pointer-events: none; opacity: .035; background: repeating-linear-gradient(0deg, transparent 0 3px, rgba(232, 240, 226, .8) 4px); }
.site-header { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 28px; max-width: 1320px; margin: 0 auto; padding: 18px 38px; border-bottom: 1px solid rgba(191, 211, 197, .11); background: rgba(9, 16, 19, .82); backdrop-filter: blur(18px); }
.brand { display: inline-flex; align-items: center; gap: 11px; color: var(--fog-100); text-decoration: none; }
.brand-mark { display: grid; place-items: center; width: 34px; height: 34px; color: var(--amber-400); border: 1px solid var(--amber-500); border-radius: 9px 3px 9px 3px; font: 700 22px/1 Georgia, serif; box-shadow: 0 0 0 4px rgba(243, 181, 72, .06); }
.brand-copy { display: grid; gap: 3px; }
.brand-copy strong { font-size: 14px; letter-spacing: .16em; }
.brand-copy small, .eyebrow, .panel-label, .session-kicker, .mini-label, .launch-strip-kicker { font: 500 10px/1 'DM Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: var(--fog-500); }
.brand-copy small { color: var(--amber-400); font-size: 9px; }
.site-nav { display: flex; align-items: center; gap: 6px; margin-left: auto; }
.site-nav a, .footer-links a { padding: 9px 12px; color: var(--fog-500); font-size: 13px; text-decoration: none; transition: color .18s ease, background-color .18s ease; }
.site-nav a:hover, .footer-links a:hover { color: var(--fog-100); background: rgba(191, 211, 197, .07); border-radius: 6px; }
.header-actions { display: flex; align-items: center; gap: 10px; }
.engine-state { display: inline-flex; align-items: center; gap: 7px; color: var(--lime-400); font: 500 10px/1 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .08em; }
.engine-state i, .session-marker i, .community-card-top i { width: 7px; height: 7px; display: inline-block; border-radius: 50%; background: var(--lime-400); box-shadow: 0 0 0 4px rgba(183, 214, 106, .1); }
.header-icon-button { display: grid; place-items: center; width: 35px; height: 35px; color: var(--fog-300); cursor: pointer; background: transparent; border: 1px solid var(--line); border-radius: 7px; }
.header-icon-button:hover { color: var(--amber-400); border-color: var(--line-strong); }
.header-icon-button svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.7; }
.header-launch, .button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; border-radius: 7px; cursor: pointer; transition: transform .18s ease, background-color .18s ease, border-color .18s ease, color .18s ease; }
.header-launch { padding: 11px 16px; color: var(--ink-950); background: var(--amber-400); border: 1px solid var(--amber-400); font-weight: 700; font-size: 12px; }
.header-launch:hover, .button--primary:hover { background: #ffd071; border-color: #ffd071; transform: translateY(-1px); }
.button-play { display: inline-block; width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 7px solid currentColor; }
.app-content { position: relative; z-index: 2; max-width: 1244px; margin: 0 auto; padding: 78px 38px 100px; }
.hero { display: grid; grid-template-columns: minmax(0, 1.06fr) minmax(360px, .94fr); align-items: center; gap: 80px; min-height: 570px; }
.eyebrow { display: flex; align-items: center; gap: 10px; color: var(--amber-400); }
.eyebrow-rule { width: 27px; height: 1px; background: var(--amber-400); }
h1, h2, h3, p { margin: 0; }
h1 { max-width: 690px; margin-top: 22px; font-size: clamp(54px, 7.2vw, 102px); font-weight: 600; line-height: .91; letter-spacing: -.065em; }
h1 em { color: var(--amber-400); font-style: normal; }
.hero-lead { max-width: 545px; margin-top: 28px; color: var(--fog-300); font-size: 17px; line-height: 1.6; }
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 34px; }
.button { padding: 14px 18px; border: 1px solid transparent; font-size: 13px; font-weight: 600; }
.button--primary { color: var(--ink-950); background: var(--amber-400); border-color: var(--amber-400); }
.button--quiet { color: var(--fog-300); background: transparent; border-color: var(--line); }
.button--quiet:hover { color: var(--amber-400); border-color: var(--line-strong); background: rgba(243, 181, 72, .06); }
.ownership-note { display: flex; align-items: center; gap: 10px; max-width: 500px; margin-top: 38px; padding-top: 17px; color: var(--fog-500); border-top: 1px solid var(--line); font-size: 12px; }
.ownership-note strong { color: var(--fog-300); font-weight: 600; }
.note-icon { display: grid; place-items: center; width: 20px; height: 20px; color: var(--ink-950); background: var(--lime-400); border-radius: 50%; font-size: 12px; }
.hero-visual { position: relative; min-height: 410px; padding: 21px; overflow: hidden; background: linear-gradient(145deg, rgba(27, 52, 54, .8), rgba(10, 20, 22, .92)); border: 1px solid var(--line-strong); border-radius: 10px; box-shadow: var(--shadow); }
.hero-visual::before { position: absolute; inset: 0; content: ""; opacity: .12; background: radial-gradient(circle at center, rgba(243, 181, 72, .3), transparent 55%); }
.visual-topline, .visual-readout { position: relative; z-index: 1; display: flex; justify-content: space-between; color: var(--fog-500); font: 500 10px/1 'DM Mono', monospace; letter-spacing: .12em; }
.visual-topline { padding-bottom: 14px; border-bottom: 1px solid var(--line); }
.lambda-visual { position: relative; z-index: 1; display: grid; place-items: center; min-height: 285px; }
.lambda-visual img { position: absolute; width: 270px; height: 270px; opacity: .22; filter: sepia(1) saturate(2) hue-rotate(345deg); }
.lambda-visual span { color: var(--amber-400); font: 400 190px/.8 Georgia, serif; transform: translateY(-7px); text-shadow: 0 0 50px rgba(243, 181, 72, .22); }
.visual-readout { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding-top: 15px; border-top: 1px solid var(--line); }
.visual-readout div { display: grid; gap: 7px; }
.visual-readout strong { color: var(--fog-100); font: 500 12px/1 'DM Mono', monospace; letter-spacing: .03em; }
.visual-corner { position: absolute; width: 24px; height: 24px; border-color: var(--amber-400); border-style: solid; opacity: .7; }
.visual-corner--tl { top: 11px; left: 11px; border-width: 1px 0 0 1px; }.visual-corner--br { right: 11px; bottom: 11px; border-width: 0 1px 1px 0; }
.launcher-section, .how-section, .faq-section, .community-section { margin-top: 125px; scroll-margin-top: 90px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 40px; margin-bottom: 30px; }
.section-heading h2 { margin-top: 15px; color: var(--fog-100); font-size: clamp(30px, 4vw, 50px); font-weight: 600; letter-spacing: -.045em; }
.section-heading > p { max-width: 360px; color: var(--fog-500); font-size: 13px; line-height: 1.6; }
.quick-actions { display: grid; grid-template-columns: 1.25fr repeat(3, 1fr); gap: 10px; margin: -4px 0 18px; }
.quick-action { display: flex; align-items: center; gap: 12px; min-height: 78px; padding: 14px; color: var(--fog-100); text-align: left; cursor: pointer; background: rgba(18, 33, 37, .68); border: 1px solid var(--line); border-radius: 9px; transition: transform .18s ease, border-color .18s ease, background-color .18s ease; }
.quick-action:hover { transform: translateY(-3px); border-color: rgba(243, 181, 72, .48); background: rgba(35, 56, 60, .86); }
.quick-action--play { color: var(--ink-950); background: var(--amber-400); border-color: var(--amber-400); }
.quick-action--play:hover { background: #ffd071; border-color: #ffd071; }
.quick-action-icon { display: grid; flex: 0 0 34px; place-items: center; width: 34px; height: 34px; color: var(--amber-400); border: 1px solid rgba(243, 181, 72, .35); border-radius: 7px; font: 700 16px/1 'DM Mono', monospace; }
.quick-action--play .quick-action-icon { color: var(--ink-950); border-color: rgba(9, 16, 19, .25); }
.quick-action span:last-child { display: grid; gap: 4px; }
.quick-action small, .quick-action em { font: 500 9px/1 'DM Mono', monospace; letter-spacing: .08em; text-transform: uppercase; opacity: .72; }
.quick-action em { font-size: 10px; font-style: normal; letter-spacing: 0; text-transform: none; opacity: .68; }
.quick-action strong { font-size: 14px; font-weight: 650; }
.quick-action--play small, .quick-action--play em { color: rgba(9, 16, 19, .7); }
.launcher-menu { position: relative; isolation: isolate; overflow: hidden; max-width: 868px; margin: -5px auto 16px; padding: 18px 20px 20px; background: rgba(17, 32, 35, .72); border: 1px solid var(--line-strong); box-shadow: 0 24px 70px rgba(0, 0, 0, .2); }
.launcher-menu__background { position: absolute; inset: 0; z-index: 0; pointer-events: none; background: rgba(9, 16, 19, .5); }
.launcher-menu__background::after { position: absolute; inset: 0; content: ""; background: linear-gradient(90deg, rgba(9, 16, 19, .96), rgba(9, 16, 19, .65) 50%, rgba(9, 16, 19, .82)), linear-gradient(180deg, rgba(9, 16, 19, .48), rgba(9, 16, 19, .88)); }
.launcher-menu__background-image { position: absolute; inset: -3%; background-position: center; background-size: cover; opacity: 0; transform: scale(1.05); transition: opacity 1.1s ease, transform 6s ease; }
.launcher-menu__background-image--active { opacity: .7; transform: scale(1.11); }
.launcher-menu__title, .launcher-menu__buttons { position: relative; z-index: 1; }
.launcher-menu__title { display: flex; align-items: baseline; justify-content: space-between; padding: 0 4px 16px; color: var(--fog-100); }
.launcher-menu__title span { font-size: clamp(28px, 4vw, 46px); font-weight: 700; letter-spacing: .12em; }
.launcher-menu__title small { color: var(--fog-500); font: 500 10px/1 'DM Mono', monospace; letter-spacing: .14em; text-transform: uppercase; }
.launcher-menu__buttons { display: grid; gap: 9px; padding-top: 16px; border-top: 1px solid var(--line); }
.menu-button { display: flex; align-items: center; justify-content: space-between; gap: 20px; width: 100%; min-height: 58px; padding: 14px 18px; color: var(--fog-300); text-align: left; cursor: pointer; background: rgba(26, 43, 52, .64); border: 1px solid var(--line); border-radius: 2px; transition: transform .18s ease, color .18s ease, border-color .18s ease, background-color .18s ease; }
.menu-button:hover, .menu-button:focus-visible { color: var(--fog-100); background: rgba(39, 61, 72, .84); border-color: var(--line-strong); transform: translateX(4px); }
.menu-button--primary { color: var(--fog-100); background: rgba(35, 56, 60, .9); border-color: rgba(243, 181, 72, .32); }
.menu-button span { font-size: 15px; font-weight: 650; letter-spacing: .1em; text-transform: uppercase; }
.menu-button small { color: var(--fog-500); font-size: 11px; }
.menu-panel-backdrop { position: fixed; inset: 0; z-index: 40; display: grid; place-items: center; overflow-y: auto; padding: 96px 22px 32px; background: rgba(4, 9, 11, .72); backdrop-filter: blur(8px); }
.menu-panel { width: min(868px, 100%); max-height: min(760px, calc(100dvh - 128px)); overflow-y: auto; margin: 0 auto; padding: 22px; background: rgba(13, 23, 26, .98); border: 1px solid var(--line-strong); box-shadow: 0 30px 90px rgba(0, 0, 0, .6), 0 0 0 1px rgba(243, 181, 72, .08); }
.menu-panel__header { display: flex; align-items: start; justify-content: space-between; gap: 18px; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
.menu-panel__kicker { display: block; margin-bottom: 8px; color: var(--amber-400); font: 500 10px/1 'DM Mono', monospace; letter-spacing: .14em; text-transform: uppercase; }
.menu-panel__header h3 { color: var(--fog-100); font-size: clamp(23px, 3vw, 34px); font-weight: 600; letter-spacing: -.04em; }
.menu-panel__close { display: grid; place-items: center; width: 38px; height: 38px; flex: 0 0 38px; padding: 0; color: var(--fog-300); cursor: pointer; background: rgba(26, 43, 52, .7); border: 1px solid var(--line); border-radius: 50%; font: 400 27px/1 'DM Mono', monospace; transition: color .18s ease, background-color .18s ease, border-color .18s ease, transform .18s ease; }
.menu-panel__close:hover, .menu-panel__close:focus-visible { color: var(--ink-950); background: var(--amber-400); border-color: var(--amber-400); transform: rotate(90deg); }
.menu-panel__content { padding-top: 20px; }
.menu-panel__content--play { display: grid; gap: 20px; }
.menu-panel__content--play > p, .menu-panel__help { max-width: 640px; color: var(--fog-300); font-size: 13px; line-height: 1.65; }
.menu-panel__actions { display: flex; flex-wrap: wrap; gap: 10px; }
.menu-panel__content--component :deep(.window) { background: transparent; border: 0; box-shadow: none; }
.menu-panel__content--component :deep(.box), .menu-panel__content--component :deep(.save-controls) { padding-left: 0; padding-right: 0; }
.menu-panel__fullscreen { margin-top: 18px; }
.menu-panel-enter-active, .menu-panel-leave-active { transition: opacity .2s ease, transform .2s ease; }
.menu-panel-enter-from, .menu-panel-leave-to { opacity: 0; transform: translateY(-8px); }
.launcher-layout { display: grid; grid-template-columns: minmax(265px, .72fr) minmax(0, 1.55fr); gap: 18px; align-items: start; }
.launcher-sidebar, .launcher-main { display: grid; gap: 14px; }
.panel { padding: 20px; background: rgba(17, 32, 35, .68); border: 1px solid var(--line); border-radius: 9px; }
.panel--game { background: rgba(27, 43, 44, .76); border-color: rgba(243, 181, 72, .25); }
.panel-label { display: flex; align-items: center; gap: 9px; margin-bottom: 14px; color: var(--fog-300); }
.panel-label span { color: var(--amber-400); }
.panel-help { margin: -5px 0 17px; color: var(--fog-500); font-size: 12px; line-height: 1.5; }
.source-divider { display: flex; align-items: center; gap: 10px; margin: 15px 0; color: var(--fog-500); font: 500 10px/1 'DM Mono', monospace; text-transform: uppercase; }
.source-divider::before, .source-divider::after { flex: 1; height: 1px; content: ""; background: var(--line); }
.panel--demos .panel-label { justify-content: space-between; }
.session-banner { display: flex; align-items: center; gap: 12px; min-height: 65px; padding: 14px 18px; background: rgba(183, 214, 106, .08); border: 1px solid rgba(183, 214, 106, .2); border-radius: 9px; }
.session-marker { display: grid; place-items: center; width: 29px; height: 29px; border-radius: 50%; background: rgba(183, 214, 106, .12); }
.session-kicker { display: block; margin-bottom: 5px; font-size: 9px; }
.session-banner strong { font-size: 16px; font-weight: 600; }
.session-path { margin-left: auto; color: var(--fog-500); font: 500 10px/1 'DM Mono', monospace; }
.options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
.option-block--network { padding-left: 25px; border-left: 1px solid var(--line); }
.mini-label { margin-bottom: 7px; color: var(--fog-300); }
.option-block--network p { margin-bottom: 13px; color: var(--fog-500); font-size: 12px; line-height: 1.5; }
.launch-strip { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 20px 22px; background: rgba(243, 181, 72, .1); border: 1px solid rgba(243, 181, 72, .3); border-radius: 9px; }
.launch-strip-kicker { display: block; margin-bottom: 7px; color: var(--amber-400); }
.launch-strip strong { color: var(--fog-100); font-size: 14px; font-weight: 500; }
.button--launch { min-width: 168px; }
#game-files, #session-options, #multiplayer, #save-manager { scroll-margin-top: 100px; }
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; overflow: hidden; border: 1px solid var(--line); border-radius: 9px; background: var(--line); }
.step-card { min-height: 210px; padding: 26px; background: rgba(17, 32, 35, .78); }
.step-number { color: var(--amber-400); font: 500 11px/1 'DM Mono', monospace; }
.step-card h3 { margin-top: 38px; font-size: 20px; font-weight: 500; }
.step-card p { margin-top: 12px; color: var(--fog-500); font-size: 13px; line-height: 1.6; }
.faq-tools { display: flex; align-items: center; gap: 16px; margin-bottom: 15px; }
.faq-tabs { display: flex; flex-wrap: wrap; gap: 5px; }
.faq-tabs button, .text-button { padding: 8px 11px; color: var(--fog-500); cursor: pointer; background: transparent; border: 1px solid var(--line); border-radius: 5px; font-size: 11px; }
.faq-tabs button:hover, .faq-tabs button.active, .text-button:hover { color: var(--amber-400); border-color: var(--line-strong); background: rgba(243, 181, 72, .07); }
.faq-search { margin-left: auto; }
.faq-search input { width: 220px; padding: 9px 11px; color: var(--fog-100); background: rgba(5, 12, 14, .6); border: 1px solid var(--line); border-radius: 5px; font-size: 12px; }
.faq-search input:focus { border-color: var(--amber-400); outline: none; }
.faq-list { border-top: 1px solid var(--line); }
.faq-item { border-bottom: 1px solid var(--line); }
.faq-question { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 19px 2px; color: var(--fog-300); text-align: left; cursor: pointer; background: transparent; border: 0; font-size: 15px; }
.faq-question:hover { color: var(--fog-100); }
.faq-question span { display: grid; gap: 8px; }
.faq-question small { color: var(--amber-400); font: 500 9px/1 'DM Mono', monospace; letter-spacing: .11em; text-transform: uppercase; }
.faq-question b { color: var(--amber-400); font: 400 22px/1 'DM Mono', monospace; }
.faq-answer { max-width: 720px; padding: 0 50px 21px 0; color: var(--fog-500); font-size: 13px; line-height: 1.65; }
.community-card { min-height: 170px; padding: 17px 20px; border: 1px solid var(--line); border-radius: 9px; background: rgba(17, 32, 35, .68); }
.community-card-top { display: flex; align-items: center; justify-content: space-between; padding-bottom: 14px; color: var(--fog-500); border-bottom: 1px solid var(--line); font: 500 10px/1 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .08em; }
.community-card-top span:first-child { display: flex; align-items: center; gap: 9px; color: var(--fog-300); }
.community-empty { padding: 32px 0; color: var(--fog-500); font-size: 13px; }
.site-footer { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1.4fr auto; gap: 30px; align-items: start; max-width: 1244px; margin: 0 auto; padding: 28px 38px 42px; border-top: 1px solid var(--line); color: var(--fog-500); font-size: 11px; line-height: 1.6; }
.footer-brand { display: flex; align-items: center; gap: 10px; color: var(--fog-300); font: 500 10px/1 'DM Mono', monospace; }
.footer-brand .brand-mark { width: 24px; height: 24px; font-size: 15px; }
.footer-links { display: flex; gap: 4px; justify-content: end; }
.footer-links a { padding: 0 6px; font-size: 11px; }
.toast { position: fixed; right: 24px; bottom: 24px; z-index: 100; padding: 13px 17px; color: var(--ink-950); background: var(--lime-400); border-radius: 6px; box-shadow: var(--shadow); font: 500 11px/1.2 'DM Mono', monospace; }
.toast-enter-active, .toast-leave-active { transition: opacity .2s ease, transform .2s ease; }.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(8px); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

/* Cinematic landing layer: atmosphere around the existing launcher controls. */
.app-shell { background: radial-gradient(circle at 50% -20%, rgba(46, 91, 91, .22), transparent 42rem), var(--ink-950); }
.app-shell::after { position: fixed; inset: 0; content: ""; z-index: 1; pointer-events: none; opacity: .18; background-image: url("/game-lab.jpg"); background-size: 900px; background-position: 90% 15%; mix-blend-mode: screen; mask-image: linear-gradient(to bottom, rgba(0,0,0,.7), transparent 38%); }
.ambient--one { animation: ambientFloat 18s ease-in-out infinite alternate; }
.ambient--two { animation: ambientFloat 24s ease-in-out -6s infinite alternate-reverse; }
.site-header { max-width: none; padding-inline: max(38px, calc((100vw - 1320px) / 2)); }
.brand-mark { border-radius: 11px 4px 11px 4px; }
.brand-copy strong { font-size: 15px; letter-spacing: .19em; }
.header-launch { box-shadow: 0 8px 24px rgba(246, 185, 79, .12); }
.hero { min-height: 630px; }
.hero-copy { position: relative; z-index: 2; }
.hero-copy::before { position: absolute; top: -105px; left: -80px; width: 320px; height: 320px; content: ""; pointer-events: none; background: radial-gradient(circle, rgba(246, 185, 79, .09), transparent 68%); }
h1 { font-size: clamp(57px, 8vw, 116px); line-height: .86; letter-spacing: -.078em; }
h1 em { text-shadow: 0 0 42px rgba(246, 185, 79, .14); }
.hero-lead { max-width: 590px; font-size: 18px; }
.hero-actions { margin-top: 38px; }
.button--hero-play { min-width: 168px; padding-block: 16px; box-shadow: 0 15px 32px rgba(246, 185, 79, .12); }
.hero-visual { min-height: 500px; isolation: isolate; border-color: rgba(112, 206, 197, .27); box-shadow: 0 30px 90px rgba(0, 0, 0, .43), inset 0 0 0 1px rgba(246, 185, 79, .07); }
.hero-image-stack { position: absolute; inset: 0; z-index: -2; overflow: hidden; pointer-events: none; }
.hero-image, .hero-image-shade { position: absolute; inset: 0; pointer-events: none; }
.hero-image { z-index: -2; background: url("/game-hero.jpg") center 46% / cover no-repeat; opacity: .73; transform: scale(1.07); animation: heroDrift 18s ease-in-out infinite alternate; }
.hero-image-shade { z-index: -1; background: linear-gradient(180deg, rgba(8, 13, 16, .4), rgba(8, 13, 16, .22) 40%, rgba(8, 13, 16, .9)), linear-gradient(90deg, rgba(8, 13, 16, .85), transparent 68%); }
.hero-visual::before { z-index: 0; opacity: .32; background: radial-gradient(circle at 54% 52%, rgba(246, 185, 79, .32), transparent 37%); }
.visual-topline { color: rgba(242, 240, 232, .58); }
.lambda-visual { min-height: 304px; }
.lambda-visual img { opacity: .3; filter: sepia(1) saturate(2.3) hue-rotate(346deg) drop-shadow(0 0 18px rgba(246, 185, 79, .32)); }
.lambda-visual span { font-size: 210px; text-shadow: 0 0 75px rgba(246, 185, 79, .36); }
.visual-caption { position: relative; z-index: 1; display: grid; gap: 8px; max-width: 290px; margin: -2px 0 22px; }
.visual-caption-kicker { color: var(--amber-400); font: 500 10px/1 'DM Mono', monospace; letter-spacing: .14em; text-transform: uppercase; }
.visual-caption strong { color: var(--fog-100); font-size: 24px; line-height: 1.04; letter-spacing: -.04em; }
.visual-caption small { color: var(--fog-300); font-size: 12px; }
.visual-readout { padding-top: 16px; background: linear-gradient(180deg, rgba(8, 13, 16, .08), rgba(8, 13, 16, .3)); }
.launcher-section, .how-section, .faq-section, .community-section { margin-top: 155px; }
.section-heading h2 { font-size: clamp(34px, 4.8vw, 58px); }
.section-heading > p { max-width: 410px; font-size: 14px; }
.panel { background: rgba(18, 35, 39, .74); box-shadow: 0 16px 42px rgba(0, 0, 0, .12); }
.panel--game { background: linear-gradient(145deg, rgba(42, 67, 65, .82), rgba(18, 35, 39, .78)); }
.panel--demos { background: linear-gradient(145deg, rgba(39, 54, 45, .72), rgba(18, 35, 39, .8)); border-color: rgba(180, 212, 124, .22); }
.demo-note { margin: -5px 0 14px; color: var(--fog-500); font-size: 12px; line-height: 1.5; }
.session-banner { box-shadow: inset 0 0 0 1px rgba(180, 212, 124, .04); }
.launch-strip { box-shadow: 0 16px 40px rgba(246, 185, 79, .05); }
.steps { border-color: rgba(195, 218, 203, .16); }
.step-card { position: relative; min-height: 270px; overflow: hidden; background-color: rgba(17, 32, 35, .82); isolation: isolate; }
.step-card::before { position: absolute; inset: 0; content: ""; z-index: -2; background-position: center; background-size: cover; opacity: .28; transition: opacity .3s ease, transform .6s ease; }
.step-card::after { position: absolute; inset: 0; content: ""; z-index: -1; background: linear-gradient(180deg, rgba(8, 13, 16, .42), rgba(8, 13, 16, .95) 74%); }
.step-card--copy::before { background-image: url("/game-frontier.jpg"); }
.step-card--engine::before { background-image: url("/game-lab.jpg"); }
.step-card--return::before { background-image: url("/game-hero.jpg"); }
.step-card:hover::before { opacity: .48; transform: scale(1.05); }
.step-card h3, .step-card p, .step-number { position: relative; z-index: 1; }
.step-card h3 { margin-top: 68px; font-size: 23px; }
.step-card p { max-width: 275px; }
.faq-section, .community-section { position: relative; }
.faq-section::before, .community-section::before { position: absolute; top: -90px; right: -13%; width: 360px; height: 360px; content: ""; pointer-events: none; border-radius: 50%; background: radial-gradient(circle, rgba(112, 206, 197, .08), transparent 68%); }
.community-card { background: linear-gradient(135deg, rgba(18, 35, 39, .86), rgba(11, 23, 26, .74)); }
.site-footer { max-width: none; padding-inline: max(38px, calc((100vw - 1244px) / 2)); }

@keyframes heroDrift { from { transform: scale(1.07) translate3d(-1%, -1%, 0); } to { transform: scale(1.13) translate3d(1%, 1%, 0); } }
@keyframes ambientFloat { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(18px, 24px, 0); } }

@media (max-width: 920px) {
  .site-header { padding-inline: 22px; }.site-nav { display: none; }.app-content { padding-inline: 22px; }.hero { grid-template-columns: 1fr; gap: 45px; min-height: auto; }.hero-visual { max-width: 600px; width: 100%; }.launcher-menu { max-width: none; }.quick-actions { grid-template-columns: repeat(2, 1fr); }.launcher-layout { grid-template-columns: 1fr; }.launcher-sidebar { grid-template-columns: repeat(2, 1fr); align-items: start; }.panel--game, .panel--demos { grid-column: span 1; }.panel--source { grid-column: span 2; }.site-footer { grid-template-columns: 1fr 1fr; padding-inline: 22px; }.footer-links { justify-content: start; grid-column: span 2; }
}
@media (max-width: 620px) {
  .site-header { padding: 14px 17px; }.engine-state, .header-icon-button { display: none; }.header-actions { margin-left: auto; }.header-launch { padding: 10px 12px; }.app-content { padding: 52px 17px 72px; }.hero { gap: 33px; }.hero-lead { font-size: 15px; }.hero-visual { min-height: 350px; }.lambda-visual { min-height: 230px; }.lambda-visual img { width: 220px; height: 220px; }.lambda-visual span { font-size: 150px; }.section-heading { display: block; }.section-heading > p { margin-top: 16px; }.launcher-section, .how-section, .faq-section, .community-section { margin-top: 82px; }.quick-actions { grid-template-columns: 1fr; }.quick-action--play { min-height: 84px; }.launcher-menu { padding: 14px; }.launcher-menu__title { display: grid; gap: 6px; }.launcher-menu__title span { font-size: 30px; }.menu-button { display: grid; gap: 6px; min-height: 66px; }.menu-button small { line-height: 1.35; }.menu-panel-backdrop { align-items: start; padding: 80px 12px 20px; }.menu-panel { max-height: calc(100dvh - 100px); padding: 16px; }.menu-panel__header { align-items: center; }.menu-panel__close { width: 34px; height: 34px; flex-basis: 34px; font-size: 23px; }.launcher-sidebar { display: grid; grid-template-columns: 1fr; }.panel--source { grid-column: auto; }.options-grid, .steps { grid-template-columns: 1fr; }.option-block--network { padding: 20px 0 0; border-top: 1px solid var(--line); border-left: 0; }.launch-strip { display: block; }.button--launch { width: 100%; margin-top: 17px; }.faq-tools { display: block; }.faq-search { display: block; margin: 12px 0 0; }.faq-search input { width: 100%; }.section-heading--compact .text-button { margin-top: 15px; }.site-footer { grid-template-columns: 1fr; padding: 24px 17px 35px; }.footer-links { grid-column: auto; flex-wrap: wrap; }.footer-links a { padding-left: 0; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
</style>