---
name: Artifact workflow ports
description: Preview routing depends on artifact services receiving the workflow-provided port.
---

Artifact web commands must let the Vite config consume the injected `PORT` instead of hardcoding a local development port.

**Why:** A hardcoded port can make Vite appear healthy on localhost while the artifact proxy points at a different port, producing a blank or failed preview.

**How to apply:** Prefer a Vite config that reads `process.env.PORT` and scripts that do not override it; restart the managed artifact workflow after changing the command.