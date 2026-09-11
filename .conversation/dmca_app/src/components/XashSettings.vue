<template>
  <div id="home" class="page-container">
    <!-- Ambient ambient glow grid & particles -->
    <div class="ambient-glow"></div>
    <canvas ref="particleCanvas" class="particles-canvas"></canvas>

    <!-- Top Sticky Navigation Bar -->
    <header class="top-nav">
      <div class="nav-inner">
        <!-- Brand Logo -->
        <a href="#home" class="nav-brand" @click.prevent="scrollToTop">
          <div class="nav-lambda-glyph">λ</div>
          <div class="nav-brand-text">
            <span class="nav-title">WEBXASH</span>
            <span class="nav-tag">GOLDSRC WASM</span>
          </div>
        </a>

        <!-- Main Navigation Links -->
        <nav class="nav-links" aria-label="Main Navigation">
          <a href="#home" class="nav-link" @click.prevent="scrollToTop">Home</a>
          <a href="#game-launcher" class="nav-link">Play</a>
          <a href="#article-guide" class="nav-link">Guide</a>
          <a href="#weapons-guide" class="nav-link">Weapons</a>
          <a href="#faq-section" class="nav-link">FAQ</a>
          <a href="#community-comments" class="nav-link">Community</a>
        </nav>

        <!-- Header Action Buttons -->
        <div class="nav-actions">
          <button
            class="nav-icon-btn"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
            @click="toggleFullscreen"
          >
            <svg class="nav-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
            <span class="btn-text-desktop">Fullscreen</span>
          </button>

          <button class="nav-launch-btn" @click="startUplink">
            <svg class="nav-play-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>START GAME</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main v-if="!loading" class="content-wrapper">
      
      <!-- HERO / GAME LAUNCHER SECTION -->
      <section id="game-launcher" class="hero-section">
        <div class="launch-card">
          <!-- Card Header & Status -->
          <div class="card-header">
            <div class="lambda-badge">
              <span class="lambda-char">λ</span>
            </div>
            <div class="header-text">
              <div class="status-indicator">
                <span class="status-dot"></span>
                <span class="status-text">WEBASSEMBLY 64-BIT EMULATOR READY</span>
              </div>
              <h1 class="game-title">Play Half-Life in Browser – No Download Needed</h1>
              <p class="game-subtitle">Play the original Half-Life instantly in your browser. No install, no Steam required — just click and play free online right now.</p>
            </div>
          </div>

          <!-- Feature Highlights Row -->
          <div class="tags-row">
            <span class="tag-pill">Play Free Online</span>
            <span class="tag-pill">No Download Required</span>
            <span class="tag-pill">WebGL 2.0 60+ FPS</span>
            <span class="tag-pill">Multiplayer Ready</span>
            <span class="tag-pill">Android & Desktop Browser</span>
          </div>

          <!-- Primary Launch CTA -->
          <button class="primary-launch-btn" @click="startUplink">
            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>LAUNCH HALF-LIFE NOW — FREE</span>
          </button>

          <!-- Keybindings & Controls Box -->
          <div class="controls-box">
            <div class="controls-header">
              <span class="controls-title">DEFAULT CONTROLS</span>
              <span class="controls-hint">POINTER LOCK SUPPORTED</span>
            </div>
            <div class="controls-grid">
              <div class="control-item">
                <div class="kbd-cluster"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div>
                <span class="control-label">Move</span>
              </div>
              <div class="control-item">
                <div class="kbd-cluster"><kbd>Mouse</kbd></div>
                <span class="control-label">Aim / Look</span>
              </div>
              <div class="control-item">
                <div class="kbd-cluster"><kbd>L-Click</kbd></div>
                <span class="control-label">Primary Fire</span>
              </div>
              <div class="control-item">
                <div class="kbd-cluster"><kbd>R-Click</kbd></div>
                <span class="control-label">Secondary Fire</span>
              </div>
              <div class="control-item">
                <div class="kbd-cluster"><kbd>E</kbd></div>
                <span class="control-label">Interact / Use</span>
              </div>
              <div class="control-item">
                <div class="kbd-cluster"><kbd>Space</kbd></div>
                <span class="control-label">Jump</span>
              </div>
              <div class="control-item">
                <div class="kbd-cluster"><kbd>Ctrl</kbd></div>
                <span class="control-label">Crouch</span>
              </div>
              <div class="control-item">
                <div class="kbd-cluster"><kbd>R</kbd></div>
                <span class="control-label">Reload Weapon</span>
              </div>
            </div>
          </div>

          <!-- Utility Actions (Fullscreen & Share) -->
          <div class="actions-row">
            <button class="ghost-btn" title="Toggle Fullscreen Mode" @click="toggleFullscreen">
              <svg class="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
              <span>Fullscreen</span>
            </button>
            <button class="ghost-btn" title="Copy Share Link" @click="handleShare">
              <svg class="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-4-6l-4-4-4 4m4-4v13"/>
              </svg>
              <span>Share Game</span>
            </button>
          </div>
        </div>
      </section>

      <!-- SEO ARTICLE & GAME GUIDE -->
      <article id="article-guide" class="seo-article">
        <header class="article-header">
          <div class="article-meta-badge">OFFICIAL BROWSER PORT & GAMEPLAY GUIDE</div>
          <h2 class="article-main-title">
            How to Play Half-Life in Browser — Free Online WebAssembly Emulator & Complete Guide
          </h2>
          <p class="article-lead">
            Experience the original Half-Life 1 and Uplink campaign directly inside your web browser. No download, no Steam installation, and no complex setup required — powered by WebAssembly (WASM), WebGL 2, and the open-source Xash3D GoldSource engine.
          </p>
        </header>

        <!-- Chapter 1: How to Play Half-Life in Browser -->
        <section class="article-section">
          <h3 class="section-title">1. How to Play Half-Life in Browser (Instant No-Download Play)</h3>
          <p>
            Wondering <strong>how to play Half-Life in browser</strong> without downloading gigabytes of game files or configuring third-party emulators? <strong>WebXash</strong> compiles the full 3D GoldSource engine into WebAssembly bytecode, executing natively inside any modern browser.
          </p>
          <p>
            To begin playing:
          </p>
          <ol class="steps-list">
            <li><strong>Click Launch:</strong> Hit the <em>"START GAME"</em> or <em>"LAUNCH HALF-LIFE NOW"</em> button at the top of the page.</li>
            <li><strong>Instant WASM Compilation:</strong> The browser downloads the game assets directly into memory with zero disk installation.</li>
            <li><strong>Capture Pointer & Play:</strong> Click the game window to lock your mouse cursor for authentic 360-degree free-look controls.</li>
          </ol>
          <div class="callout-box">
            <div class="callout-icon">⚡</div>
            <div class="callout-text">
              <strong>Zero Download & Free Online:</strong> Unlike traditional PC gaming that demands client installs and Steam authentication, you can enjoy <strong>Half-Life online free</strong> straight from Chrome, Firefox, Safari, Edge, or Android mobile browsers.
            </div>
          </div>
        </section>

        <!-- Chapter 2: The Black Mesa Story & Uplink Chapter -->
        <section class="article-section">
          <h3 class="section-title">2. The Black Mesa Incident & The Story of Uplink</h3>
          <p>
            Set within the subterranean depths of the <strong>Black Mesa Research Facility</strong> in New Mexico, players step into the hazardous environment suit of Dr. Gordon Freeman. In <em>Half-Life: Uplink</em>, you are tasked with navigating hostile containment sectors, dispatching alien incursions, and aligning a communication transmitter to broadcast a vital distress message to surface scientists.
          </p>
          <p>
            Featuring distinct combat encounters and original puzzle layouts, Uplink pits you against the Hazardous Environment Combat Unit (HECU), Headcrabs, Houndeyes, and Vortigaunts in pulse-pounding retro FPS action.
          </p>
        </section>

        <!-- Chapter 3: Half-Life Multiplayer & Playing with Friends -->
        <section class="article-section">
          <h3 class="section-title">3. Half-Life Multiplayer: Playing Online with Friends</h3>
          <p>
            Interested in <strong>Half-Life multiplayer</strong> in a browser game environment? The WebXash engine includes integrated network protocols compatible with WebSocket proxies. Players can open the in-game developer console by pressing <kbd>~</kbd> (Tilde) and connect to dedicated GoldSource deathmatch and team-play servers.
          </p>
          <div class="tech-grid">
            <div class="tech-card">
              <div class="tech-icon">🌐</div>
              <h4>WebSocket Multiplayer</h4>
              <p>Connect to multiplayer deathmatch servers with low-latency browser socket networking.</p>
            </div>
            <div class="tech-card">
              <div class="tech-icon">📱</div>
              <h4>Half-Life 1 Online Android & APK</h4>
              <p>Supports mobile touch controls and Android browser execution without needing a separate APK file.</p>
            </div>
            <div class="tech-card">
              <div class="tech-icon">⚡</div>
              <h4>Half-Life Online Emulator</h4>
              <p>Pure C/C++ GoldSource code compiled to 64-bit WASM with full 60+ FPS hardware acceleration.</p>
            </div>
            <div class="tech-card">
              <div class="tech-icon">💾</div>
              <h4>IndexedDB Save Persistence</h4>
              <p>Save games and custom binds are safely retained in browser storage between play sessions.</p>
            </div>
          </div>
        </section>

        <!-- Chapter 4: Weapons Guide -->
        <section id="weapons-guide" class="article-section">
          <h3 class="section-title">4. Weapons Arsenal & Combat Strategy</h3>
          <p>
            Surviving the Black Mesa outbreak requires tactical weapon mastery:
          </p>

          <div class="table-container">
            <table class="weapons-table">
              <thead>
                <tr>
                  <th>Weapon</th>
                  <th>Ammunition</th>
                  <th>Primary Action</th>
                  <th>Secondary Action</th>
                  <th>Tactical Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="weapon-name"><strong>Crowbar</strong></td>
                  <td>Melee</td>
                  <td>Fast blunt strike</td>
                  <td>—</td>
                  <td>Conserving ammo, breaking crates, Headcrabs</td>
                </tr>
                <tr>
                  <td class="weapon-name"><strong>Glock 17 (9mm)</strong></td>
                  <td>9x19mm Parabellum</td>
                  <td>Accurate semi-auto fire</td>
                  <td>High-speed burst fire</td>
                  <td>Distant targets, underwater engagement</td>
                </tr>
                <tr>
                  <td class="weapon-name"><strong>SPAS-12 Shotgun</strong></td>
                  <td>12 Gauge Buckshot</td>
                  <td>Single-barrel spread</td>
                  <td>Double-barrel heavy blast</td>
                  <td>Close-quarters clearing, Bullsquids, HECU</td>
                </tr>
                <tr>
                  <td class="weapon-name"><strong>MP5 Submachine Gun</strong></td>
                  <td>9mm / 40mm Grenades</td>
                  <td>Full-automatic sustained fire</td>
                  <td>M203 impact grenade launcher</td>
                  <td>Crowd control, fortified soldier squads</td>
                </tr>
                <tr>
                  <td class="weapon-name"><strong>Hand Grenade</strong></td>
                  <td>High Explosive</td>
                  <td>Timed fragmentation throw</td>
                  <td>Short roll / lob</td>
                  <td>Bunkers, blind corners, turret suppression</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Chapter 5: Half-Life 1 vs Half-Life 2 in Browser -->
        <section class="article-section">
          <h3 class="section-title">5. Half-Life 1 Online Browser vs Half-Life 2 in Browser</h3>
          <p>
            Players frequently ask about playing both <strong>Half-Life 1 online browser</strong> and <strong>Half-Life 2 in browser</strong>:
          </p>
          <ul class="specs-list">
            <li><strong>Half-Life 1 (GoldSource Engine):</strong> Runs 100% natively in WebAssembly through WebXash with zero downloads or plugins on all desktop and mobile browsers.</li>
            <li><strong>Half-Life 2 (Source Engine):</strong> Because Half-Life 2 uses the more resource-heavy Source Engine with complex Havok physics, it typically requires local client execution or specialized cloud streaming, while Half-Life 1 runs instantly in standard browser RAM.</li>
          </ul>
        </section>
      </article>

      <!-- INTERACTIVE FAQ SECTION -->
      <section id="faq-section" class="faq-container">
        <div class="faq-header">
          <div class="section-badge">FREQUENTLY ASKED QUESTIONS</div>
          <h2 class="section-main-heading">Common Questions & Troubleshooting</h2>
          <p class="section-sub-heading">Immediate answers regarding controls, save games, performance, and browser support.</p>
          
          <!-- Category Tabs & Controls -->
          <div class="faq-toolbar">
            <div class="faq-categories">
              <button
                v-for="cat in faqCategories"
                :key="cat"
                class="faq-cat-btn"
                :class="{ 'faq-cat-btn--active': selectedFaqCategory === cat }"
                @click="selectedFaqCategory = cat"
              >
                {{ cat }}
              </button>
            </div>
            <button class="faq-expand-all-btn" @click="toggleExpandAll">
              {{ areAllFaqsOpen ? 'Collapse All' : 'Expand All' }}
            </button>
          </div>

          <!-- Search / Filter Input -->
          <div class="faq-search-wrapper">
            <input
              v-model="faqSearchQuery"
              type="text"
              class="faq-search-input"
              placeholder="Search FAQ questions (e.g., saves, controls, fps, audio)..."
            />
          </div>
        </div>

        <div class="faq-list">
          <div
            v-for="(item, index) in filteredFaqs"
            :key="index"
            class="faq-card"
            :class="{ 'faq-card--open': openFaqMap[item.id] }"
            @click="toggleFaq(item.id)"
          >
            <div class="faq-question-row">
              <div class="faq-q-title-group">
                <span class="faq-cat-tag">{{ item.category }}</span>
                <h3 class="faq-question">{{ item.q }}</h3>
              </div>
              <div class="faq-toggle-icon">{{ openFaqMap[item.id] ? '−' : '+' }}</div>
            </div>
            <div v-show="openFaqMap[item.id]" class="faq-answer-row">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- DISQUS COMMENTS & COMMUNITY SECTION -->
      <section id="community-comments" class="comments-section">
        <div class="comments-header">
          <div class="section-badge">COMMUNITY DISCUSSION</div>
          <h2 class="section-main-heading">Player Comments & Discussions</h2>
          <p class="section-sub-heading">
            Join the conversation, share speedrun secrets, tactical tips, and Half-Life feedback with fellow researchers.
          </p>
        </div>

        <!-- Disqus Integration Box -->
        <div class="disqus-wrapper">
          <div class="disqus-top-bar">
            <div class="disqus-meta-info">
              <span class="disqus-channel-dot"></span>
              <span class="disqus-channel-title">Discussion Board (halflifebrowser)</span>
            </div>
            <button class="disqus-reload-btn" title="Reload Disqus Comments" @click="loadDisqus">
              <svg class="reload-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 4v6h-6M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              <span>Refresh Comments</span>
            </button>
          </div>

          <!-- Official Disqus Thread Mount Point -->
          <div id="disqus_thread" class="disqus-thread-container"></div>
          <noscript>
            Please enable JavaScript to view the
            <a href="https://disqus.com/?ref_noscript" target="_blank" rel="noopener noreferrer">comments powered by Disqus.</a>
          </noscript>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="page-footer">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="footer-lambda">λ</span>
            <span>WEBXASH // GOLDSRC WASM ENGINE</span>
          </div>
          <p class="footer-disclaimer">
            Half-Life is a registered trademark of Valve Corporation. This project is an educational and community-driven WebAssembly port powered by the open-source Xash3D FWGS engine.
          </p>
          <div class="footer-links">
            <a href="#home" @click.prevent="scrollToTop">Home</a>
            <span>•</span>
            <a href="#game-launcher">Play Game</a>
            <span>•</span>
            <a href="#article-guide">Game Lore</a>
            <span>•</span>
            <a href="#faq-section">FAQ</a>
            <span>•</span>
            <a href="#community-comments">Community</a>
          </div>
        </div>
      </footer>
    </main>

    <!-- Active Loading Overlay (Game Engine Initializing) -->
    <XashLoading v-if="loading" />

    <!-- Toast Notification -->
    <transition name="simple-toast">
      <div v-if="toastMessage" class="simple-toast">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useXashStore } from '/@/stores/store';
  import { XashLoader } from '/@/services';
  import XashLoading from '/@/components/XashLoading.vue';
  import setCanvasLoading from '/@/utils/setCanvasLoading';

  const store = useXashStore();
  const {
    loading,
    loadingProgress,
    maxLoadingAmount,
    selectedGame,
    selectedZip,
    selectedLocalFolder,
    xashCanvas,
    launchOptions,
    fullScreen,
    enableConsole,
    enableCheats,
    fpsLimit,
    touchControls,
    toastMessage,
    customGameArg,
  } = storeToRefs(store);

  const { onStartLoading, onEndLoading, refreshSavesList } = store;

  // Background Particle System
  const particleCanvas = ref<HTMLCanvasElement | null>(null);
  let animationFrameId: number | null = null;
  let resizeHandler: (() => void) | null = null;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseAlpha: number;
    alpha: number;
    pulseSpeed: number;
    pulseOffset: number;
    color: string;
  }

  // FAQ State
  const faqCategories = ['All', 'How to Play', 'Multiplayer', 'Emulation & Tech', 'Android & Devices'];
  const selectedFaqCategory = ref('All');
  const faqSearchQuery = ref('');
  const openFaqMap = ref<Record<string, boolean>>({
    'how-1': true,
    'can-1': true,
    'multi-1': true,
    'hl2-1': true,
    'emu-1': true,
    'droid-1': true,
  });

  const faqData = [
    {
      id: 'how-1',
      category: 'How to Play',
      q: 'How to play Half-Life in browser without downloading anything?',
      a: 'To play Half-Life online in your web browser, click the "START GAME" or "LAUNCH HALF-LIFE NOW" button. The WebAssembly engine compiles and unpacks the game files directly into your browser’s virtual memory in seconds. No Steam client, no installer, and no external plugins are required.',
    },
    {
      id: 'can-1',
      category: 'How to Play',
      q: 'Can you play Half-Life in browser with full keyboard and mouse controls?',
      a: 'Yes! WebXash includes native HTML5 Pointer Lock support. Once launched, clicking the canvas locks your mouse cursor for authentic 360-degree free-look. You can use standard WASD for movement, Left Click to fire, Right Click for alternate fire, Space to jump, Ctrl to crouch, E to use items, and R to reload.',
    },
    {
      id: 'multi-1',
      category: 'Multiplayer',
      q: 'How to play Half-Life online with friends / Half-Life multiplayer?',
      a: 'Half-Life multiplayer works through WebSocket proxy networking. You can open the developer console with ~ (Tilde) and connect to custom deathmatch servers using the "connect <server_address>" command or host a LAN game with peers.',
    },
    {
      id: 'hl2-1',
      category: 'How to Play',
      q: 'How to play Half-Life 2 in browser vs Half-Life 1?',
      a: 'Half-Life 1 (GoldSource) is fully optimized for direct in-browser WebAssembly execution at 60+ FPS on WebXash. Half-Life 2 is built on the modern Source Engine with Havok physics, which is typically played via Steam or local installations, while Half-Life 1 and Uplink run instantly right here in your browser.',
    },
    {
      id: 'emu-1',
      category: 'Emulation & Tech',
      q: 'What is the Half-Life online emulator and how does it work?',
      a: 'The Half-Life browser emulator is powered by Xash3D FWGS compiled to WebAssembly (WASM) with WebGL 2.0 graphics pipeline and Web Audio API. It executes authentic C/C++ engine routines at near-native CPU speeds directly on your graphics card.',
    },
    {
      id: 'droid-1',
      category: 'Android & Devices',
      q: 'Can you play Half-Life 1 online on Android or is an APK required?',
      a: 'You can play directly in Chrome or Firefox on Android without downloading an APK file. WebXash automatically supports mobile touch controls and on-screen virtual joypads, while desktop users enjoy hardware mouse and keyboard controls.',
    },
    {
      id: 'free-1',
      category: 'How to Play',
      q: 'Is Half-Life browser free to play?',
      a: 'Yes! Playing Half-Life: Uplink online through WebXash is 100% free with no registration, no subscription, and no hidden fees.',
    },
    {
      id: 'save-1',
      category: 'Emulation & Tech',
      q: 'Are my save games and custom keybinds saved in the browser?',
      a: 'Yes. In-game saves, quicksaves (F6), and custom binds configured in config.cfg are securely preserved in your browser’s IndexedDB local database so you can resume your campaign anytime.',
    },
  ];

  const filteredFaqs = computed(() => {
    let list = faqData;
    if (selectedFaqCategory.value !== 'All') {
      list = list.filter((item) => item.category === selectedFaqCategory.value);
    }
    if (faqSearchQuery.value.trim()) {
      const query = faqSearchQuery.value.toLowerCase();
      list = list.filter(
        (item) => item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)
      );
    }
    return list;
  });

  const areAllFaqsOpen = computed(() => {
    return filteredFaqs.value.every((item) => openFaqMap.value[item.id]);
  });

  const toggleFaq = (id: string) => {
    openFaqMap.value[id] = !openFaqMap.value[id];
  };

  const toggleExpandAll = () => {
    const shouldOpen = !areAllFaqsOpen.value;
    filteredFaqs.value.forEach((item) => {
      openFaqMap.value[item.id] = shouldOpen;
    });
  };

  // Disqus Integration (halflifebrowser)
  const disqusLoaded = ref(false);

  const loadDisqus = () => {
    const thread = document.getElementById('disqus_thread');
    if (!thread) return;

    try {
      (window as any).disqus_config = function (this: any) {
        this.page.url = 'https://halflifebrowser.vercel.app/';
        this.page.identifier = 'halflife-browser-main-discussion';
        this.page.title = 'Play Half-Life in Browser – No Download Needed';
      };

      if ((window as any).DISQUS) {
        (window as any).DISQUS.reset({
          reload: true,
          config: function (this: any) {
            this.page.url = 'https://halflifebrowser.vercel.app/';
            this.page.identifier = 'halflife-browser-main-discussion';
            this.page.title = 'Play Half-Life in Browser – No Download Needed';
          },
        });
        disqusLoaded.value = true;
        showToast('DISQUS DISCUSSION REFRESHED');
        return;
      }

      const existingScript = document.getElementById('disqus-embed-script');
      if (existingScript) {
        existingScript.remove();
      }

      const d = document;
      const s = d.createElement('script');
      s.id = 'disqus-embed-script';
      s.src = 'https://halflifebrowser.disqus.com/embed.js';
      s.async = true;
      s.setAttribute('data-timestamp', String(+new Date()));
      s.onload = () => {
        disqusLoaded.value = true;
      };
      s.onerror = (e) => {
        console.warn('Disqus embed could not be loaded in this context:', e);
        disqusLoaded.value = false;
      };
      (d.head || d.body).appendChild(s);
    } catch (e) {
      console.warn('Disqus initialization skipped:', e);
    }
  };

  let toastTimer: number | null = null;
  const showToast = (message: string) => {
    toastMessage.value = message;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastMessage.value = '';
    }, 2800);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('SHARE URL COPIED TO CLIPBOARD');
    }).catch(() => {
      showToast('FAILED TO COPY LINK');
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        showToast('FULLSCREEN NOT SUPPORTED');
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const startUplink = async () => {
    const canvas = xashCanvas.value || (document.getElementById('canvas') as HTMLCanvasElement);
    if (!canvas) {
      showToast('ERROR: ENGINE CANVAS NOT FOUND');
      return;
    }
    xashCanvas.value = canvas;

    setCanvasLoading();
    selectedZip.value = 'uplink.zip';
    onStartLoading();
    maxLoadingAmount.value = 100;
    loadingProgress.value = 5;

    try {
      const zip = await XashLoader.downloadZip(
        'uplink.zip',
        selectedGame.value.publicDir,
        (progress: number) => {
          loadingProgress.value = Math.max(5, Math.min(95, progress));
        },
      );

      if (!zip) {
        loading.value = false;
        showToast('FAILED TO RETRIEVE ASSETS');
        return;
      }

      loadingProgress.value = 96;

      const xash = await XashLoader.startGameZip(zip, {
        canvas,
        selectedGame: selectedGame.value,
        selectedZip: 'uplink.zip',
        selectedLocalFolder: selectedLocalFolder.value,
        launchOptions: launchOptions.value,
        fullScreen: fullScreen.value,
        enableConsole: enableConsole.value,
        enableCheats: enableCheats.value,
        fpsLimit: fpsLimit.value,
        touchControls: touchControls.value,
        onStartLoading,
        onEndLoading,
        onProgress: (progress) => {
          if (typeof progress === 'number') {
            loadingProgress.value = progress;
          } else if (progress && typeof progress.current === 'number') {
            loadingProgress.value = progress.current;
          }
        },
      });

      loadingProgress.value = 100;

      await XashLoader.onAfterLoad({
        xash,
        selectedGame: selectedGame.value,
        customGameArg: customGameArg.value,
        enableCheats: enableCheats.value,
      });

      XashLoader.initConsoleCallbacks(
        xash,
        selectedGame.value.consoleCallbacks,
      ).catch((err) => console.warn('Console callback listener error:', err));

      await refreshSavesList();

      setTimeout(() => {
        canvas.focus();
      }, 100);
    } catch (error: any) {
      console.error('Failed to start Half-Life Uplink:', error);
      loading.value = false;
      showToast(`ERROR: ${error?.message || 'FAILED TO LAUNCH ENGINE'}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  onMounted(() => {
    // Prevent browser auto-scroll restoration on refresh/load so the site always opens at the top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    // Lazy load Disqus forum when scrolled into view
    const commentsEl = document.getElementById('community-comments');
    if (commentsEl && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            loadDisqus();
            observer.disconnect();
          }
        },
        { rootMargin: '300px' },
      );
      observer.observe(commentsEl);
    } else {
      setTimeout(() => {
        loadDisqus();
      }, 1000);
    }

    const canvas = particleCanvas.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      'rgba(245, 158, 11,',
      'rgba(251, 191, 36,',
      'rgba(217, 119, 6,',
      'rgba(56, 189, 248,',
    ];

    const particleCount = Math.min(Math.floor((width * height) / 20000), 36);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.05,
        size: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.25 + 0.1,
        alpha: 0.15,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);

    let time = 0;
    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * 1.5 + p.pulseOffset);
        p.alpha = Math.max(0.04, p.baseAlpha + pulse * 0.08);

        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  });

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    if (toastTimer) clearTimeout(toastTimer);
  });
</script>

<style scoped>
  /* Base Typography & Color Palette */
  .page-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: #0b0f19;
    background-image: 
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 158, 11, 0.07), transparent),
      radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.03), transparent);
    color: #e2e8f0;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* Ambient Canvas Background */
  .particles-canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.4;
  }

  /* TOP STICKY NAVIGATION BAR */
  .top-nav {
    position: sticky;
    top: 0;
    z-index: 40;
    background: rgba(11, 15, 25, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }

  .nav-inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: inherit;
    flex-shrink: 0;
  }

  .nav-lambda-glyph {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111827;
    border: 1.5px solid #f59e0b;
    border-radius: 8px;
    color: #f59e0b;
    font-family: Georgia, serif;
    font-weight: 900;
    font-size: 20px;
    line-height: 1;
    box-shadow: 0 0 12px rgba(245, 158, 11, 0.15);
  }

  .nav-brand-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .nav-title {
    font-size: 13.5px;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #ffffff;
    line-height: 1.1;
  }

  .nav-tag {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #f59e0b;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 4px 6px;
    border-radius: 8px;
  }

  .nav-link {
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    text-decoration: none;
    padding: 6px 14px;
    border-radius: 6px;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-link:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.07);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-icon-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    color: #cbd5e1;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-icon-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  .nav-svg-icon {
    width: 15px;
    height: 15px;
  }

  .nav-launch-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: #f59e0b;
    color: #0f172a;
    border: none;
    border-radius: 6px;
    font-size: 12.5px;
    font-weight: 800;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 10px rgba(245, 158, 11, 0.25);
  }

  .nav-launch-btn:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
  }

  .nav-play-icon {
    width: 14px;
    height: 14px;
  }

  /* Content Wrapper */
  .content-wrapper {
    position: relative;
    z-index: 2;
    max-width: 1020px;
    margin: 0 auto;
    padding: 48px 24px 88px;
    display: flex;
    flex-direction: column;
    gap: 64px;
  }

  /* HERO / LAUNCHER SECTION */
  .hero-section {
    display: flex;
    justify-content: center;
  }

  .launch-card {
    width: 100%;
    max-width: 600px;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 34px 30px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    box-shadow: 
      0 20px 50px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(245, 158, 11, 0.08);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .lambda-badge {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111827;
    border: 1.5px solid #f59e0b;
    border-radius: 12px;
    box-shadow: 0 0 16px rgba(245, 158, 11, 0.2);
  }

  .lambda-char {
    font-size: 34px;
    font-weight: 900;
    color: #f59e0b;
    font-family: Georgia, serif;
    line-height: 1;
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
  }

  .status-text {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.09em;
    color: #10b981;
  }

  .game-title {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: #ffffff;
    line-height: 1.2;
  }

  .game-subtitle {
    margin: 0;
    font-size: 13.5px;
    color: #94a3b8;
    line-height: 1.4;
  }

  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag-pill {
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 11px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    letter-spacing: 0.01em;
  }

  .primary-launch-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 16px 24px;
    background: #f59e0b;
    color: #0f172a;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 18px rgba(245, 158, 11, 0.3);
  }

  .primary-launch-btn:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(245, 158, 11, 0.4);
  }

  .primary-launch-btn-small {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    background: #f59e0b;
    color: #0f172a;
    border: none;
    border-radius: 6px;
    font-size: 12.5px;
    font-weight: 800;
    cursor: pointer;
    margin-top: 14px;
    transition: all 0.15s ease;
  }

  .primary-launch-btn-small:hover {
    background: #fbbf24;
  }

  .play-icon {
    width: 18px;
    height: 18px;
  }

  .controls-box {
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 18px;
  }

  .controls-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .controls-title {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #94a3b8;
  }

  .controls-hint {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #64748b;
  }

  .controls-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 18px;
  }

  .control-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .kbd-cluster {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  kbd {
    display: inline-block;
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 4px;
    padding: 2px 7px;
    font-size: 11px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-weight: 700;
    color: #fbbf24;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    line-height: 1.4;
  }

  .control-label {
    font-size: 12.5px;
    color: #cbd5e1;
    font-weight: 500;
  }

  .actions-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .ghost-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    color: #94a3b8;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .ghost-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }

  .btn-icon-svg {
    width: 15px;
    height: 15px;
  }

  /* Section Scroll Offsets */
  #home,
  #game-launcher,
  #article-guide,
  #weapons-guide,
  #faq-section,
  #community-comments {
    scroll-margin-top: 76px;
  }

  /* SEO ARTICLE SECTION */
  .seo-article {
    background: rgba(17, 24, 39, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 42px 36px;
    line-height: 1.7;
    color: #cbd5e1;
  }

  .article-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 26px;
    margin-bottom: 32px;
  }

  .article-meta-badge {
    display: inline-block;
    font-size: 10.5px;
    font-weight: 800;
    color: #f59e0b;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
  }

  .article-main-title {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.3;
    margin: 0 0 16px 0;
    letter-spacing: -0.01em;
  }

  .article-lead {
    font-size: 15.5px;
    color: #94a3b8;
    margin: 0;
    line-height: 1.6;
  }

  .article-section {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 16px 0;
    letter-spacing: -0.01em;
  }

  .callout-box {
    display: flex;
    gap: 14px;
    background: rgba(245, 158, 11, 0.05);
    border: 1px solid rgba(245, 158, 11, 0.2);
    border-left: 3px solid #f59e0b;
    border-radius: 8px;
    padding: 18px;
    margin: 20px 0;
  }

  .callout-icon {
    font-size: 20px;
    flex-shrink: 0;
  }

  .callout-text {
    font-size: 14px;
    color: #e2e8f0;
    line-height: 1.6;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  .tech-card {
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 20px 18px;
  }

  .tech-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .tech-card h4 {
    margin: 0 0 6px 0;
    font-size: 14.5px;
    color: #ffffff;
    font-weight: 700;
  }

  .tech-card p {
    margin: 0;
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.5;
  }

  /* Weapons Table */
  .table-container {
    overflow-x: auto;
    margin: 20px 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
  }

  .weapons-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13.5px;
    text-align: left;
  }

  .weapons-table th {
    background: #1a2234;
    color: #f59e0b;
    padding: 13px 16px;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    letter-spacing: 0.02em;
  }

  .weapons-table td {
    padding: 13px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .weapons-table tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .weapon-name {
    color: #ffffff;
  }

  /* Specs Grid */
  .specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-top: 16px;
  }

  .specs-col {
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 20px;
  }

  .specs-heading {
    margin: 0 0 14px 0;
    font-size: 14.5px;
    color: #f59e0b;
    font-weight: 700;
  }

  .specs-list {
    margin: 0;
    padding-left: 18px;
    font-size: 13.5px;
    color: #cbd5e1;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .steps-list {
    margin: 16px 0;
    padding-left: 20px;
    font-size: 14.5px;
    color: #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    line-height: 1.6;
  }

  .steps-list li strong {
    color: #f59e0b;
  }

  /* FAQ SECTION */
  .faq-container {
    background: rgba(17, 24, 39, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 40px 36px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .faq-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .faq-categories {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .faq-cat-btn {
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    color: #94a3b8;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .faq-cat-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  .faq-cat-btn--active {
    background: #f59e0b;
    border-color: #f59e0b;
    color: #0f172a;
    font-weight: 700;
  }

  .faq-expand-all-btn {
    padding: 6px 14px;
    background: transparent;
    border: 1px solid rgba(245, 158, 11, 0.35);
    border-radius: 6px;
    color: #f59e0b;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .faq-expand-all-btn:hover {
    background: rgba(245, 158, 11, 0.08);
  }

  .faq-q-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .faq-cat-tag {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 7px;
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.25);
    color: #f59e0b;
    border-radius: 4px;
    letter-spacing: 0.04em;
  }

  .section-badge {
    font-size: 10.5px;
    font-weight: 800;
    color: #f59e0b;
    letter-spacing: 0.1em;
    margin-bottom: 6px;
  }

  .section-main-heading {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 6px 0;
    letter-spacing: -0.01em;
  }

  .section-sub-heading {
    font-size: 14px;
    color: #94a3b8;
    margin: 0 0 18px 0;
  }

  .faq-search-input {
    width: 100%;
    padding: 12px 18px;
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .faq-search-input:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .faq-card {
    background: rgba(17, 24, 39, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 18px 20px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .faq-card:hover {
    border-color: rgba(245, 158, 11, 0.3);
  }

  .faq-card--open {
    border-color: #f59e0b;
    background: rgba(17, 24, 39, 0.95);
  }

  .faq-question-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }

  .faq-question {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
  }

  .faq-toggle-icon {
    font-size: 18px;
    font-weight: 700;
    color: #f59e0b;
  }

  .faq-answer-row {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.6;
  }

  .faq-answer-row p {
    margin: 0;
  }

  /* COMMENTS / DISQUS SECTION */
  .comments-section {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .disqus-wrapper {
    background: rgba(17, 24, 39, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 28px 26px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  }

  .disqus-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;
    gap: 12px;
  }

  .disqus-meta-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .disqus-channel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
  }

  .disqus-channel-title {
    font-size: 13px;
    font-weight: 700;
    color: #e2e8f0;
    letter-spacing: 0.03em;
  }

  .disqus-reload-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    color: #cbd5e1;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .disqus-reload-btn:hover {
    background: rgba(245, 158, 11, 0.15);
    border-color: rgba(245, 158, 11, 0.4);
    color: #f59e0b;
  }

  .reload-icon {
    transition: transform 0.3s ease;
  }

  .disqus-reload-btn:hover .reload-icon {
    transform: rotate(180deg);
  }

  .disqus-thread-container {
    min-height: 240px;
    width: 100%;
    color: #e2e8f0;
  }

  /* FOOTER */
  .page-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 32px;
    text-align: center;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    color: #f59e0b;
    margin-bottom: 12px;
  }

  .footer-lambda {
    font-size: 17px;
    font-family: Georgia, serif;
  }

  .footer-disclaimer {
    font-size: 12px;
    color: #64748b;
    max-width: 660px;
    margin: 0 auto 16px;
    line-height: 1.6;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 12px;
    font-size: 12.5px;
    color: #94a3b8;
  }

  .footer-links a {
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .footer-links a:hover {
    color: #f59e0b;
  }

  /* TOAST NOTIFICATION */
  .simple-toast {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    border: 1px solid #f59e0b;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
    z-index: 999;
  }

  .simple-toast-enter-active,
  .simple-toast-leave-active {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .simple-toast-enter-from,
  .simple-toast-leave-to {
    opacity: 0;
    transform: translate(-50%, 12px);
  }

  /* RESPONSIVE DESIGN */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .btn-text-desktop {
      display: none;
    }

    .seo-article {
      padding: 28px 20px;
    }

    .specs-grid {
      grid-template-columns: 1fr;
    }

    .controls-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
