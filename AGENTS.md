# AGENTS.md — Learning Engineering, Rise 360 Alignment & Mayer Multimedia Specification

## Project Context
- **Course**: CMU 05-840 (*Tools for Online Learning*), Spring 2027 — Tool Task 3 Demo #2
- **Track**: **Track B — Custom Interactive Domain Workspace / Manipulative with Step-Level Diagnostics**
- **Live Demo**: https://gautamyadavs.github.io/tol-vibe-fractions-workspace/
- **Baseline Spring 2026 Articulate Rise 360 Exemplar**: [Understanding Fractions as Division in Real Life](https://corinalucafocsan.github.io/fraction-course/) by **Corina Luca Focsan**

---

## 1. Pedagogical Anchor & Learning Objectives (Non-Negotiable)

All interactive mechanics, visual representations, voiceovers, hints, and step-level diagnostics directly serve the four carried-over Learning Objectives from Corina Luca Focsan’s Spring 2026 exemplar for **5th–6th grade math learners**:

- **LO1**: Build and use fraction diagrams and number lines to solve real-world equal-sharing division problems (`a ÷ b = a/b`).
- **LO2**: Identify when a sharing quotient is less than 1 whole (proper fraction `< 1`) versus greater than 1 whole (improper fraction / mixed number `> 1`).
- **LO3**: Transform improper fractions into mixed numbers by grouping whole units and interpreting leftover fractional parts.
- **LO4**: Explain and justify fraction-as-division reasoning in real-world unit contexts (`1 week = 7 days`).

### Why Track B (Overcoming Articulate Rise 360's #1 Authoring Limitation)
In Lesson 4 (*“Scenario: Help Rue Out!”*) of Corina’s S26 Rise 360 course, Rue asks the learner to split `10 hours of chores across 1 week (7 days)`. Because Rise 360 cannot embed a dynamic math manipulative, Corina had to ask multiple-choice questions *describing in words* how a student would draw a fraction bar or number line. This rebuild places a synchronized, tactile fraction-bar and number-line manipulative **directly inside Rue’s scenario** coupled with a deterministic step-level diagnostic engine.

---

## 2. Mayer’s Multimedia Principles & Authentic Rise 360 Design Contract

Never revert to adult SaaS/analytics dashboard tropes (`JetBrains Mono` uppercase course-code tags, multi-thousand-pixel scrolling forms, or muted gray bars). Enforce these 7 Mayer principles across every screen:

1. **Spatial Contiguity (Single-Viewport Guarantee)**:
   - On desktop (`1440×900`), the Rue Scenario Banner, Linked Fraction Bars + Number Line, Symbolic Fraction/Mixed Inputs, `Check` button, and Diagnostic Coaching Card **must fit together inside a single viewport (`scrollHeight <= 900`) with zero vertical scrolling**.
   - Place `N` 1-whole fraction bars **end-to-end horizontally** directly above the `0..N` SVG number line so every `1/b` partition cut aligns pixel-for-pixel with its tick mark below, and keep symbolic inputs immediately adjacent in the right column.
2. **Segmenting**:
   - Organize the course into 3 Rise lessons in a `268px` left sidebar with `#FF631E` Rise circular progress rings (`0%–100% COMPLETE`):
     - **Lesson 1 (`Fractions as Fair Sharing`)**: Visual & audio pre-training + interactive `3 ÷ 4 = 3/4` chocolate-chip cookie worked example.
     - **Lesson 2 (`Scenario — Help Rue Out!`)**: Segmented into 3 single-screen steps (`2.1 Set Up Problem` → `2.2 Build Model 10 ÷ 7` → `2.3 Mixed Number & Explanation`).
     - **Lesson 3 (`Equal-Sharing Studio`)**: 3 transfer challenges presented **1 card at a time** (`1. Muffins 13 ÷ 5 = 2 3/5` · `2. Mural Paint 3 ÷ 5 = 3/5 (< 1 contrast)` · `3. Trail Granola 7 ÷ 4 = 1 3/4`).
3. **Signaling & Accessible Dual-Coding**:
   - Enforce Corina’s exact color code (`assets/num-den-color-guide.png`) everywhere:
     - **Blue (`#2563EB`) = Numerator** (*shaded pieces in one fair share*, number-line jump arcs, draggable dot, numerator input border).
     - **Green (`#2E8B57`) = Denominator** (*equal parts cutting 1 whole*, bar cut lines, `1/b` ticks, denominator input border).
     - **Complete Wholes (`b/b`)**: Outlined in gold (`#D97706`) with a `✓ 1 Whole` badge and diagonal hatch texture (versus dot-stipple texture on partial pieces) so color-vision-deficient learners never rely on hue alone.
4. **Pre-Training & Modality**:
   - Lesson 1 introduces *Fraction*, *Numerator*, *Denominator*, and *Division* via a 4-card flip strip with optional **`🔊 Listen`** buttons playing Corina’s authentic MP3 clips (`assets/audio-*.mp3`). Audio is **strictly learner-triggered** (never auto-playing).
5. **Embodiment & Personalization**:
   - Render Corina’s `assets/scene-rue-room.jpg` scenario backdrop and expressive transparent cutouts (`rue-asking`, `rue-talking`, `rue-thinking`, `rue-confused`, `rue-worried`, `rue-happy`), speaking in warm 5th/6th-grade `"you"` prose (`Merriweather` + `Lato`).
   - Keep the active story problem visible in Rue’s speech bubble so learners never lose track of problem quantities while reading step-level coaching in the adjacent diagnostic card (**Redundancy Principle**).
6. **Coherence (Zero Learner Meta-Clutter)**:
   - Never display `CMU 05-840`, `LO1–LO4` badges, or `Track B` labels on the student canvas. House all instructor documentation, Mayer audit notes, live diagnostic JSON state, and quick-jump controls inside the discreet slide-over drawer (`⚙️ LXD & Mayer Notes`, bottom-right button, hidden by default).

---

## 3. Deterministic Step-Level Misconception Diagnostic Engine (`app.js`)

All diagnostics run 100% client-side with zero external APIs (`diagnoseLesson2Step2`, `diagnoseLesson2Step3`, `diagnoseStudioChallenge`):

- **Step 2.1 (`10 hours across 1 week`)**: Catches `OPERATION_MULTIPLICATION_ERROR` (`10 × 7 = 70`), `OPERATION_ADDITION_ERROR` (`10 + 7 = 17`), and `UNIT_OMISSION_WEEK_VS_DAYS` (`10 ÷ 1` forgetting `1 week = 7 days`).
- **Step 2.2 & Studio Model/Fraction Diagnostics**:
  1. `EMPTY_SUBMISSION` / `INVALID_FRACTION_INPUT`
  2. `UNIT_OMISSION_WEEK_VS_DAYS` (`partsPerWhole === 1` or `fracDen === 1` on `10 ÷ 7`, pulsing green partition cuts)
  3. `DIVIDEND_DIVISOR_INVERSION` (`7/10`, `5/13`, `5/3`, `4/7` on bars or fraction inputs — highlights the `0 to 1 Whole (< 1)` interval on the SVG number line!)
  4. `SINGLE_WHOLE_ONLY` (`1/7`, `1/5`, `1/4` — affirms the share from 1 whole, then prompts collecting across all `a` wholes)
  5. `PARTITIONED_BY_DIVIDEND` (`partsPerWhole === a` or `fracDen === a`)
  6. `REMAINDER_ONLY_AS_QUOTIENT` (`3/7` instead of `10/7`, `3/5` instead of `13/5`, `3/4` instead of `7/4`)
  7. `VISUAL_WRONG_PARTITIONS` / `VISUAL_WRONG_SHADED_COUNT` / `FRACTION_MISSING` / `VISUAL_SYMBOLIC_MISMATCH`
- **Magnitude Contrast (`LO2`, Lesson 3)**:
  - Never hide the `More than 1 whole` toggle on Challenge 2 (`3 ÷ 5 = 3/5`); reveal Mixed Number boxes strictly based on learner choice so selecting `More than 1 whole` on `3/5` triggers `MAGNITUDE_OVERGENERALIZED_GT1` and highlights `[0, 1]` on the number line.
- **Mixed Number & Remainder-Denominator Diagnostics (`LO3` & `LO4`)**:
  - Catches `MIXED_WHOLE_ZERO`, Corina’s documented **`MIXED_DENOMINATOR_USED_DIVIDEND`** (`1 3/10` instead of `1 3/7`, `2 3/13` instead of `2 3/5`, `1 3/7` instead of `1 3/4` — glowing the partial bar’s **Green** cuts!), `MIXED_REMAINDER_STILL_IMPROPER`, `MIXED_WHOLE_INCORRECT`, `MIXED_DENOMINATOR_INCORRECT`, `MIXED_NUMERATOR_INCORRECT`, and justification distractors (`JUSTIFICATION_DISTRACTOR_REM10`, `JUSTIFICATION_DISTRACTOR_LT1`).

---

## 4. Technical & Verification Guardrails
- **Stack**: Pure Vanilla HTML5 (`index.html`), Vanilla CSS (`styles.css`), Vanilla ES6+ JS (`app.js`), `.nojekyll`, and authentic prepared media in `assets/`. Zero npm runtime dependencies, zero build step, zero API keys.
- **Verification**: Always run `node --check app.js` and verify in headless `/usr/bin/chromium` at `1440×900` (asserting `scrollHeight <= 900` across Lesson 2 & Lesson 3 interactive states, zero console errors, zero broken images, and zero horizontal overflow on desktop and `390px` mobile).
