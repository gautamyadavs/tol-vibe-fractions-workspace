# Understanding Fractions as Division in Real Life — Interactive Manipulative Studio

**CMU 05-840 (Tools for Online Learning) · Spring 2027 · Tool Task 3 Demo #2 (Track B)**

- **Live Demo (GitHub Pages)**: https://gautamyadavs.github.io/tol-vibe-fractions-workspace/
- **Baseline 2026 Articulate Rise 360 Course**: [Understanding Fractions as Division in Real Life](https://corinalucafocsan.github.io/fraction-course/) (*by Corina Luca Focsan*)
- **Architecture Track**: **Track B — Custom Interactive Domain Workspace / Manipulative with Step-Level Diagnostics**
- **Tech Stack**: Vanilla HTML5 (`index.html`), Vanilla CSS (`styles.css`), Vanilla ES6+ JavaScript (`app.js`), `.nojekyll` — zero external JS dependencies, zero build step, zero client-side API keys.

---

## 1. Pedagogical Origin & Carried-Over Learning Objectives

This project replicates and extends Corina Luca Focsan’s Spring 2026 Articulate Rise 360 exemplar, [*Understanding Fractions as Division in Real Life*](https://corinalucafocsan.github.io/fraction-course/), preserving all four original learning objectives while overcoming Rise 360’s native authoring limitations:

- **LO1**: Build and use fraction diagrams and number lines to solve real-world equal-sharing division problems (`a ÷ b = a/b`).
- **LO2**: Identify when a sharing quotient is less than 1 whole (proper fraction) versus greater than 1 whole (improper fraction / mixed number).
- **LO3**: Transform improper fractions into mixed numbers by grouping whole units and interpreting leftover fractional parts.
- **LO4**: Explain and justify fraction-as-division reasoning in real-world unit contexts.

### Why Rebuild Beyond Articulate Rise 360? (Track B Rationale)
In her 2026 design reflection, Corina documented a core authoring constraint of Articulate Rise 360: learners could only view static fraction-bar graphics and answer multiple-choice or text-match blocks with generic feedback. They could not dynamically partition wholes into `b` equal shares, test how discrete fraction bars map onto a continuous `0–4` number line, or receive targeted coaching when their visual model disagreed with their written mixed number.

This **Track B Domain Studio** replaces static blocks with a parameterized dual-representation manipulative coupled to a deterministic step-level misconception engine. Toggle **Learning Engineer View** in the top header at any time to inspect inline LXD callouts explaining the instructional design decisions directly in context.

---

## 2. Interactive Architecture

### A. Four-Scenario Equal-Sharing Progression with Rue
| Problem | Real-World Context | Division & Quotient | Pedagogical Focus |
| :--- | :--- | :--- | :--- |
| **1. Weekly Chores** | Share **10 hours** of chores equally across **1 week (7 days)** | `10 ÷ 7 = 10/7 = 1 3/7` hrs/day | Corina’s signature scenario: tests `1 week = 7 days` unit conversion (`10/1`), inversion (`7/10`), and remainder denominator (`1 3/10`) |
| **2. Trail Granola** | Share **7 granola bars** equally among **4 hikers** | `7 ÷ 4 = 7/4 = 1 3/4` bars/hiker | Reinforces partitioning each whole into `4` fourths and grouping `4/4` into `1` whole bar |
| **3. Mural Paint** | Divide **3 liters** of paint equally across **5 poster boards** | `3 ÷ 5 = 3/5` L/board (`< 1`) | **Conceptual contrast (`< 1` whole)** preventing blind application of mixed-number conversion rules |
| **4. Stage Banners** | Cut **11 yards** of canvas equally into **3 stage banners** | `11 ÷ 3 = 11/3 = 3 2/3` yds/banner | Multi-whole transfer across `3` complete wholes (`9/3`) + `2` leftover third-yard pieces |

### B. UDL Dual-Representation Manipulative Workspace
Learners can switch seamlessly among **Linked Side-by-Side View**, **Equal-Sharing Fraction Bars**, and **Partitioned Number Line (`0–4`)**:
- **Dynamic Partitioning (`1–10` Equal Parts per Whole)**: Subdivides four whole-unit bars into interactive buttons and renders exact `1/b` ticks between integers `0..4` on the SVG number line.
- **Accessible Dual-Coding**: Complete whole units render in deep slate (`#264653`) with a diagonal woven hatch, while leftover `1/b` fractional parts render in warm terracotta (`#C85A32`) with a dot-stipple texture—supporting learners with color-vision deficiency while visually scaffolding mixed-number grouping (`LO3`).
- **Multi-Modal Input**: Click individual bar segments, click/drag directly along the SVG number line, use `- / +` steppers, or navigate via keyboard (`Tab`, `ArrowLeft`/`ArrowRight` on the synchronized range slider).

### C. Step-Level Misconception Diagnostic Engine (`app.js`)
When a learner selects **Check My Work**, `diagnoseSubmission(problem, snapshot)` inspects both the visual workspace `(partsPerWhole, shadedParts)` and symbolic entries `(fracNum/fracDen, magnitude, mixedNumber, justification)` to deliver targeted, non-giveaway Socratic coaching:
- **Unit Omission (`10/1` or unpartitioned `partsPerWhole = 1` on Problem 1)**: Prompts the learner to compare *hours per week* vs. *hours per day*.
- **Dividend/Divisor Inversion (`7/10`, `4/7`, `5/3`, `3/11`)**: Explains what the inverted fraction physically means in story units and asks a magnitude estimation question (`> 1` vs. `< 1`).
- **Visual–Symbolic Mismatch**: Points out discrepancies between the shaded manipulative (`shadedParts / partsPerWhole`) and the written fraction (`Numerator / Denominator`).
- **Mixed-Number Remainder / Denominator Error (`1 3/10` instead of `1 3/7`)**: Directs the learner to their partially shaded bar to verify the fractional unit size (`1/7` of an hour, not `1/10`).
- **Magnitude Overgeneralization (`> 1` selected on Problem 3)**: Prompts visual inspection of `3/5` staying inside `[0, 1]`.
- **Progressive 2-Step Hints**: Optional `Get a Hint (0/2)` scaffolding provides unit-partitioning and piece-counting guidance without spoiling answers on Attempt 1.

---

## 3. Corrective Prompt Iteration Log (Tool Task 3 Reflection)

| Iteration | Initial AI / Design Behavior Observed | Corrective Prompt & Specification Change (`AGENTS.md`) | Pedagogical & UX Outcome |
| :--- | :--- | :--- | :--- |
| **1. Eliminating Visual Spoilers & Magnitude Cueing** | An early workspace layout displayed the simplified mixed number directly in the manipulative toolbar and hid Step 2C (Mixed Number inputs) only on Problem 3 (`3 ÷ 5`), inadvertently signaling the magnitude answer before the learner reasoned about `LO2`. | Constrained the Step 1 live readout to report only concrete physical counts (*complete wholes vs. leftover pieces*) and tied Step 2C visibility strictly to the learner’s own Step 2B radio selection (`Greater than 1 whole`). | Learners must actively interpret their shaded bars/number line to write `a/b` and judge whether `< 1`, `= 1`, or `> 1` applies—preserving Problem 3 as an authentic conceptual contrast. |
| **2. Ordering Multi-Signal Misconception Diagnostics** | Standard form validation flagged `10/1`, `7/10`, and `1 3/10` with generic "check your numerator/denominator" hints, missing Corina’s documented domain misconceptions and failing to notice when a student’s bar diagram disagreed with their typed fraction. | Specified a deterministic 9-stage diagnostic priority tree in `AGENTS.md` over `(partsPerWhole, shadedParts, num/den, magnitude, mixed, justification)` with dedicated rules for unit conversion (`1 week = 7 days`), inversion (`b/a`), visual–symbolic alignment, and dividend-as-denominator remainders (`1 3/10`). | Each misconception triggers specific, non-punitive Socratic feedback referencing the learner’s own visual construction without revealing numeric answers on Attempt 1. |
| **3. Enforcing Accessible Dual-Coding & Editorial Restraint** | Default UI styling risked relying on flat red/green color fills for fraction segments and decorative dashboard callout stripes (`border-left` accents), reducing grayscale legibility and visual focus. | Enforced warm academic-editorial tokens (`#FAF9F6` paper, `#FFFFFF` cards, `Source Serif 4` + `Inter` + `JetBrains Mono`), added woven hatch (`#264653`) vs. stippled (`#C85A32`) SVG/CSS fills, and added a synchronized keyboard slider plus `Learning Engineer View` (`aria-pressed`). | High-contrast, screen-reader and keyboard-accessible math studio with clear distinction between complete wholes and leftover unit fractions—plus transparent LXD documentation for 05-840 reviewers. |

---

## 4. Running Locally & Deploying to GitHub Pages

Because this repository uses zero build tools and zero external JavaScript dependencies, it runs directly in any modern browser:

```bash
# Option A: Serve locally over HTTP
python3 -m http.server 8000
# Open http://localhost:8000

# Option B: Validate JavaScript syntax
node --check app.js
```

### GitHub Pages Deployment
1. Push branch `main` to GitHub (`https://github.com/gautamyadavs/tol-vibe-fractions-workspace`).
2. In **Settings → Pages**, set **Source** to **Deploy from a branch** → `main` / `/ (root)`.
3. `.nojekyll` ensures clean static asset delivery at `https://gautamyadavs.github.io/tol-vibe-fractions-workspace/`.
