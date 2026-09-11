---
name: ZIP archive validation
description: Browser game archives need structural validation before passing bytes to the WASM loader.
---

Checking only the ZIP magic bytes is not enough; malformed or truncated archives can pass that check and fail later inside the decompressor with an opaque error.

**Why:** A previously published Vercel asset began with a valid ZIP header but had no central-directory end record, causing the Uplink launch to fail only in production.

**How to apply:** Validate the end-of-central-directory signature before decompression and keep a known-good fallback URL for public demo archives.