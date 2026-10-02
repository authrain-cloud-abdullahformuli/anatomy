# Anatomy 3D — AI Coding Agent Guide

This repository contains **Anatomy 3D**, an interactive real-time 3D Human Anatomy Explorer built with Next.js, Three.js WebGL/TSL materials, and GSAP.

Maintained by **[Abdullah Formuli](https://github.com/authrain-cloud-abdullahformuli)** ([@abdullahformuli](https://x.com/abdullahformuli)).

## Architecture Overview

- `app/[locale]/`: Next.js App Router root with 12 supported locales (`en`, `es`, `de`, `fr`, `zh`, `ja`, `ru`, `pt`, `ko`, `id`, `hi`, `ar`).
- `app/components/`:
  - `AnatomyApp.tsx`: Top-level application orchestrator with organ switching, navigation, and audio/UI toggles.
  - `OrganViewer.tsx`: Three.js Canvas container managing scene lifecycle, orbit controls, camera transitions, and hotspot rendering.
- `app/lib/three/`:
  - `viewer.ts`: WebGLRenderer setup, animation loop, lighting rig, post-processing.
  - `tsl-materials.ts`: Custom Three.js Shading Language (TSL) node materials for tissue and biological translucency.
  - `loaders.ts`: DRACO + KTX2 / Basis compressed GLTF model loader pipeline.
  - `hotspots.ts`: 3D-to-screen coordinate projection and interactive anatomical annotation points.
- `public/models/`: Compressed `.glb` organ models (heart, lungs, brain, kidneys, liver, pancreas, intestine, eyeball, skin).
- `public/anatomy/`: High-resolution anatomical cross-section WebP illustrations and comparative schematics.

## Local Development & Verification

```bash
# Run Next.js Turbopack development server
npm run dev

# Build production bundle
npm run build:next

# Run verification suite
node test.mjs
```
