# AGENTS.md — Learning Engineering & Domain Workspace Specification

## Project Context
- **Course**: CMU 05-840 (*Tools for Online Learning*), Spring 2027 — Tool Task 3 Demo #2
- **Track**: **Track B — Custom Interactive Domain Workspace / Manipulative with Step-Level Diagnostics**
- **Live Demo**: https://gautamyadavs.github.io/tol-vibe-fractions-workspace/
- **Baseline 2026 Articulate Rise 360 Exemplar**: [Understanding Fractions as Division in Real Life](https://corinalucafocsan.github.io/fraction-course/) by Corina Luca Focsan

---

## 1. Pedagogical Anchor & Learning Objectives (Non-Negotiable)

All interactive mechanics, representations, hints, and diagnostic messages must directly serve the four carried-over Learning Objectives from the 2026 exemplar:

- **LO1**: Build and use fraction diagrams and number lines to solve real-world equal-sharing division problems (`a ÷ b = a/b`).
- **LO2**: Identify when a sharing quotient is less than 1 whole (proper fraction) versus greater than 1 whole (improper fraction / mixed number).
- **LO3**: Transform improper fractions into mixed numbers by grouping whole units and interpreting leftover fractional parts.
- **LO4**: Explain and justify fraction-as-division reasoning in real-world unit contexts.

### Why Track B (Overcoming Rise 360's Authoring Limitation)
In Articulate Rise 360, learners could only inspect static diagrams of fraction bars and respond to fixed multiple-choice or fill-in-the-blank blocks. Rise 360 cannot dynamically partition wholes into `b` parts, synchronize discrete bar models with continuous number lines, or diagnose mismatches between a learner's visual construction and symbolic fraction notation. Every feature in this workspace exists to close that authoring gap.

---

## 2. Four-Scenario Problem Progression (with Rue)

Maintain per-problem state in memory so learners can revisit completed scenarios at any time:

1. **Problem 1 — Weekly Chores (`10 ÷ 7 = 10/7 = 1 3/7` hours/day)**
   - *Context*: Rue completes **10 hours** of chores equally across **1 week (7 days)**. How many hours per day?
   - *Target Misconceptions*: Unit omission (`10/1` or leaving `partsPerWhole === 1` from "1 week"), dividend/divisor inversion (`7/10`), and mixed-number remainder denominator error (`1 3/10`).
2. **Problem 2 — Trail Granola (`7 ÷ 4 = 7/4 = 1 3/4` bars/hiker)**
   - *Context*: Sharing **7 granola bars** equally among **4 hikers**.
   - *Target Misconceptions*: Inversion (`4/7`), remainder-denominator error (`1 3/7`), single-whole unit share (`1/4` instead of `7/4`).
3. **Problem 3 — Community Mural Paint (`3 ÷ 5 = 3/5` liters/board — Conceptual Contrast `< 1`)**
   - *Context*: Dividing **3 liters** of paint equally across **5 poster boards**.
   - *Pedagogical Role*: Prevents mechanical overgeneralization of mixed-number rules from Problems 1–2. Quotient stays inside `[0, 1]` (`0` full liters).
   - *Critical UI Constraint*: Never hide the Mixed Number option solely on Problem 3; reveal Mixed Number inputs strictly based on whether the learner selects `Greater than 1 whole` in Step 2B so magnitude selection remains a genuine conceptual judgment.
4. **Problem 4 — Stage Banners (`11 ÷ 3 = 11/3 = 3 2/3` yards/banner — Multi-Whole Transfer)**
   - *Context*: Cutting **11 yards** of canvas equally into **3 stage banners**.
   - *Pedagogical Role*: Transfers grouping across `3` complete wholes + `2` leftover third-yard pieces near the upper end of the `0–4` workspace.

---

## 3. Dual-Representation Manipulative Contract (UDL Guideline 2.5)

- **View Modes**: `Linked Side-by-Side` (default), `Equal-Sharing Fraction Bars`, and `Partitioned Number Line (0–4)`.
- **Partition Control**: `partsPerWhole` (`b`, integer range `1..10`) via accessible `- / +` buttons and numeric input. Clamps `shadedParts` to `[0, 4 * b]`.
- **Shading / Marker Synchronization**:
  - **Fraction Bars**: 4 whole-unit bars, each subdivided into `b` clickable `<button>` segments with unique IDs (`bar-seg-w{1..4}-p{1..b}`).
  - **Number Line (`0` to `4`)**: Responsive SVG (`viewBox="0 0 640 205"`) with integer ticks (`0..4`), `1/b` subdivision ticks, unit-jump arcs, pointer drag/click snapping, and a synchronized `<input type="range" id="numberline-range-slider">` for full keyboard accessibility.
- **Accessible Dual-Coding (Never Rely on Color Alone)**:
  - Complete whole units (`b/b`): Deep slate `#264653` with diagonal woven hatch pattern.
  - Partial / leftover fractional pieces (`1/b`): Warm terracotta `#C85A32` with dot-stipple pattern.
- **Anti-Spoiler Constraint**: The visual workspace readout may report physical counts (`partsPerWhole`, `shadedParts`, count of complete wholes vs. leftover pieces), but must **never** print the simplified symbolic fraction or mixed number before the learner enters them in Step 2.

---

## 4. Deterministic Step-Level Misconception Diagnostic Engine

`diagnoseSubmission(problem, snapshot)` in `app.js` must run 100% client-side with zero external API keys and evaluate learner state in this exact pedagogical priority order:

1. **Input Sanity & Empty State**: Validate positive integer denominators and non-negative integer numerators; gently prompt if untouched.
2. **`UNIT_OMISSION_WEEK_VS_DAYS` (Problem 1)**: Trigger when `fracDen === 1` (`10/1`) or `partsPerWhole === 1` with `shadedParts > 0`. Prompt learner to compare *hours per week* vs. *hours per day*.
3. **`DIVIDEND_DIVISOR_INVERSION`**: Trigger when `fracNum === b && fracDen === a` or `partsPerWhole === a && shadedParts === b` (`7/10`, `4/7`, `5/3`, `3/11`). Explain what the inverted division physically means in context and prompt a magnitude sanity check (`> 1` vs. `< 1`).
4. **`VISUAL_NOT_BUILT` / `FRACTION_MISSING` / `VISUAL_SYMBOLIC_MISMATCH`**: Require both visual construction and symbolic entry, and flag any discrepancy where `shadedParts / partsPerWhole !== fracNum / fracDen`.
5. **Equal-Sharing Sub-Diagnostics**:
   - `SINGLE_WHOLE_ONLY` (`1/b` instead of `a/b`): Affirm `1/b` for 1 whole, then ask what happens across all `a` wholes.
   - `PARTITIONED_BY_DIVIDEND` (`partsPerWhole === a` or `fracDen === a`): Clarify partitioning by recipients (`b`) vs. wholes shared (`a`).
   - `REMAINDER_ONLY_AS_QUOTIENT` (`(a % b)/b`): Prompt learner to include complete whole units in the Step 2A fraction.
6. **Magnitude Diagnostics (`LO2`)**: Catch `MAGNITUDE_OVERGENERALIZED_GT1` (selecting `> 1` on Problem 3's proper fraction `3/5`) and `MAGNITUDE_INCORRECT_FOR_IMPROPER` (selecting `< 1` or `= 1` when `a > b`).
7. **Mixed-Number Grouping Diagnostics (`LO3`, when `a > b`)**:
   - `MIXED_DENOMINATOR_USED_DIVIDEND`: Catch Corina's documented remainder error (`1 3/10` instead of `1 3/7`, `1 3/7` instead of `1 3/4`, `3 2/11` instead of `3 2/3`) by pointing directly to how many parts divide **1 whole** in the learner's bar model.
   - `MIXED_REMAINDER_STILL_IMPROPER` (`mixNum >= mixDen`), `MIXED_WHOLE_INCORRECT`, `MIXED_DENOMINATOR_INCORRECT`, `MIXED_NUMERATOR_INCORRECT`.
8. **`JUSTIFICATION_DISTRACTOR` (`LO4`)**: Explain why the chosen distractor's unit reasoning fails without naming the correct letter.
9. **`ALL_STEPS_VERIFIED`**: Unlock verified synthesis across `LO1`–`LO4` and reveal Course Mastery table once all 4 scenarios are verified.

**Non-Giveaway Rule**: Coaching messages (`status: "coaching"`) must never print the target answer string; use Socratic unit and visual-inspection prompts, paired with a separate 2-step progressive hint drawer (`Get a Hint (0/2)`).

---

## 5. Technical, Accessibility & Visual Guardrails

- **Stack**: Vanilla HTML5 (`index.html`), Vanilla CSS (`styles.css`), Vanilla JS (`app.js`), `.nojekyll`. Zero npm runtime dependencies, zero build step, zero client-side API keys.
- **Typography & Palette**: Warm archival paper `#FAF9F6`, crisp `#FFFFFF` cards with `1px solid #E4E4DF` borders, `#18181B` ink, `#264653` slate wholes, `#C85A32` terracotta unit parts; `Source Serif 4`, `Inter`, and `JetBrains Mono`.
- **Forbidden UI Tropes**: No dark-mode neon/purple palettes, no colored left-border stripes (`border-left: 4px solid`), no gradient headline text, no pulsing badges, no confetti, no countdown timers, and no cartoon gamification clutter.
- **Semantic & Testable DOM**: Single `<h1>`, descriptive `<title>` and `<meta name="description">`, unique `id` on every interactive element, `aria-pressed` on `Learning Engineer View` and representation toggles, `aria-live="polite"` on diagnostic output.
- **Verification**: Always run `node --check app.js` and verify DOM ID parity + all diagnostic branches via Node assertions prior to committing.
