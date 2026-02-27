# Motion Presets Reference

This document defines the shared control model for specimen labs and the expected behavior of each motion style.

## Shared Controls

- `State`: active component variant index.
- `Motion Style`: preset bundle (`custom`, `subtle`, `balanced`, `dramatic`).
- `Transition`: `slide-fade`, `crossfade`, or `swap`.
- `Ease`: GSAP ease string.
- `Duration`: primary transition duration in seconds.
- `Shift`: directional movement distance in pixels (name varies by component).
- `Secondary Duration`: component-specific secondary timing (`indicatorDuration`, `thumbDuration`, `tabDuration`).
- `Overlap`: start offset between outgoing and incoming timelines.
  - `< 0`: incoming starts first, outgoing follows.
  - `0`: both start together.
  - `> 0`: outgoing starts first, incoming follows.
- `Masking`: `track` (clipped) or `free-fade` (overflow visible).
- `Direction`: `auto`, `forward`, or `reverse`.
- `Stagger` (tabs only): offset between panel transition and tab transition timing.

## URL Parameter Map

All share links are normalized and alphabetized when copied.

- `state`: 1-based active state index.
- `sty`: motion style (`custom`, `subtle`, `balanced`, `dramatic`).
- `mode`: transition type.
- `mask`: masking mode (`track`, `free-fade`).
- `dir`: direction mode (`auto`, `forward`, `reverse`).
- `ease`: GSAP ease string.
- `dur`: primary duration.
- `shift`: primary movement shift.
- `ovr`: overlap.
- `idur`: stack indicator duration.
- `tdur`: gallery thumb duration / tabs tab duration.
- `stg`: tabs panel/tab stagger.

## Preset Intent

- `subtle`: lower shift, shorter durations, gentler ease.
- `balanced`: moderate shift/duration with smoother handoff.
- `dramatic`: maximum ranges with longer timing and stronger overlap for elevated motion studies.

## Component-Specific Shift Labels

- `.stack/testing`: `Image Shift`
- `.gallery/product`: `Image Shift`
- `.tabs/tests`: `Panel Shift`
