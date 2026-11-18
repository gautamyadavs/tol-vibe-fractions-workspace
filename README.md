# Understanding Fractions as Division in Real Life — Interactive Rise 360 + Manipulative Course

**CMU 05-840 (Tools for Online Learning) · Spring 2027 · Tool Task 3 Demo #2 (Track B)**

- **Live Demo (GitHub Pages)**: https://gautamyadavs.github.io/tol-vibe-fractions-workspace/
- **Baseline Spring 2026 Articulate Rise 360 Course**: [Understanding Fractions as Division in Real Life](https://corinalucafocsan.github.io/fraction-course/) (*by Corina Luca Focsan*)
- **Architecture Track**: **Track B — Custom Interactive Domain Workspace / Manipulative with Step-Level Diagnostics**
- **Target Learners**: **5th–6th Grade Mathematics** (*Common Core 5.NF.B.3 — Interpreting a fraction as division of the numerator by the denominator*)
- **Tech Stack**: Pure Vanilla HTML5 (`index.html`), Vanilla CSS (`styles.css`), Vanilla ES6+ JavaScript (`app.js`), `.nojekyll`, plus Corina’s authentic visual & voiceover assets (`assets/`) — zero external JS libraries, zero build step, zero client-side API keys.

---

## 1. Pedagogical Origin & Overcoming Rise 360’s Authoring Gap

This project faithfully honors and extends **Corina Luca Focsan’s** Spring 2026 Articulate Rise 360 exemplar, [*Understanding Fractions as Division in Real Life*](https://corinalucafocsan.github.io/fraction-course/), preserving all four original learning objectives:

- **LO1**: Build and use fraction diagrams and number lines to solve real-world equal-sharing division problems (`a ÷ b = a/b`).
- **LO2**: Identify when a sharing quotient is less than 1 whole (proper fraction `< 1`) versus greater than 1 whole (improper fraction / mixed number `> 1`).
- **LO3**: Transform improper fractions into mixed numbers by grouping whole units and interpreting leftover fractional parts.
- **LO4**: Explain and justify fraction-as-division reasoning in real-world unit contexts (`1 week = 7 days`).

### Why Track B? (Closing Rise 360’s Interactive Scenario Limitation)
In Lesson 4 (*“Scenario: Help Rue Out!”*) of Corina’s original Rise 360 submission, Rue asks the learner to split **10 hours of weekly chores evenly across 1 week (7 days)**. Because Articulate Rise 360’s Scenario Block only supports multiple-choice dialogue, Corina had to ask learners to pick *written sentences describing how they would draw a fraction bar or number line*.

Our rebuild keeps Corina’s authentic Rise 360 course shell (`#1E325C` fraction-tile cover, `#FF631E` Rise progress rings & `CONTINUE` buttons, Rue’s expressive character cutouts, and Corina’s MP3 voiceovers) while embedding a **live, synchronized Fraction Bar + Number Line manipulative directly inside Rue’s scenario** with step-level misconception coaching.

---

## 2. Three-Lesson Mayer-Aligned Architecture

### Lesson 1: `Fractions as Fair Sharing` (*Pre-Training + Signaling + Modality*)
- **Consistent Color Signaling (`assets/num-den-color-guide.png`)**: Establishes the course-wide visual code—**Blue (`#2563EB`) = Numerator** (*pieces in one fair share*) and **Green (`#2E8B57`) = Denominator** (*equal parts in 1 whole*).
- **4-Card Interactive Flip Strip + Optional Voiceovers (`assets/audio-*.mp3`)**: Introduces *Fraction*, *Numerator*, *Denominator*, and *Division (`a ÷ b = a/b`)* with learner-triggered audio clips (**Modality Principle**—never auto-playing).
- **Interactive Cookie Worked Example (`assets/cookies-split-4.jpg`)**: 1-click SVG overlay slices 3 chocolate-chip cookies into **4 green fourths** each and collects **1 blue fourth** per cookie (`3 ÷ 4 = 3/4` of a cookie).

### Lesson 2: `Scenario — Help Rue Out!` (*Embodiment + Segmenting + Spatial Contiguity*)
Segmented into **3 bite-sized, single-viewport steps** inside Rue’s room (`assets/scene-rue-room.jpg`) with dynamic facial reactions (`asking`, `thinking`, `confused`, `worried`, `happy`):
1. **Step 2.1 — Set Up the Problem (`10 hours across 1 week`)**: Catches multiplication (`10 × 7 = 70 hrs/day`), addition (`10 + 7 = 17`), and Corina’s documented **Unit Omission** misconception (`10 ÷ 1` forgetting to convert `1 week = 7 days`).
2. **Step 2.2 — Build the Linked Visual Model (`10 ÷ 7 = 10/7`)**:
   - **End-to-End Pixel-Aligned Manipulative**: `Hour 1` and `Hour 2` sit horizontally end-to-end directly above the `0` to `2` SVG number line (`Both Linked` | `Fraction Bars` | `Number Line` UDL toggle) right beside the color-coded symbolic fraction inputs.
   - **Step-Level Diagnostics**: Inspects both `(partsPerWhole, shadedParts)` and `Numerator / Denominator` to catch **Unit Omission (`10/1`)**, **Dividend/Divisor Inversion (`7/10` — highlighting the `0 to 1` zone on the number line!)**, **Single-Unit Confusion (`1/7`)**, **Remainder-Only (`3/7`)**, and **Visual–Symbolic Mismatch**, paired with 2-step progressive visual hints.
3. **Step 2.3 — Group into a Mixed Number & Explain (`10/7 = 1 3/7`)**:
   - Keeps the learner’s `10/7` model locked on the left while catching `0` wholes and Corina’s documented **Remainder-Denominator Error (`1 3/10`)**—glowing **Hour 2’s 7 green partitions** directly on the bar diagram to show why the leftover unit is sevenths, not tenths.

### Lesson 3: `Equal-Sharing Studio` (*3 Focused Transfer Challenges, 1 at a Time*)
| Challenge | Real-Life Story | Division & Result | Key Pedagogical Target |
| :--- | :--- | :--- | :--- |
| **1. Bakery Muffins** | 5 friends share 13 jumbo blueberry muffins | `13 ÷ 5 = 13/5 = 2 3/5` muffins | Multi-whole grouping (`2` complete wholes + `3/5` leftover; catches `5/13` and `2 3/13`) |
| **2. Mural Paint** | 5 poster boards share 3 liters of blue paint | `3 ÷ 5 = 3/5` liters (`< 1` whole) | **Conceptual contrast (`< 1`)**: tests whether learners notice the dot lands *before `1`* rather than mechanically writing a mixed number |
| **3. Trail Granola** | 4 hikers share 7 trail-granola bars | `7 ÷ 4 = 7/4 = 1 3/4` bars | Consolidates fair-sharing partitioning into fourths and mixed-number conversion (catches `4/7` and `1 3/7`) |

> **Instructor / Reviewer Mode (`⚙️ LXD & Mayer Notes`)**: Click the discreet bottom-right button at any time to slide open the instructor drawer containing the Rise 360 baseline link, Mayer’s Multimedia Learning rationale, live diagnostic JSON state, and 1-click lesson/step jump controls—keeping the student canvas 100% free of adult meta-clutter (**Coherence Principle**).

---

## 3. Corrective Prompt Iteration Log (Mayer’s Multimedia Audit: v1 → v2)

| Iteration | Failure Observed in Earlier Build | Corrective Prompt & Engineering Fix | Mayer Principle & Learner Impact |
| :--- | :--- | :--- | :--- |
| **1. Eliminating Split-Attention & Vertical Scroll Overload** | v1 dumped 4 vertically stacked bars, a separate number line, and 5 symbolic sub-forms onto a 2,800px scrolling page; learners scrolled 700px away from their visual model to type fractions and read feedback. | Re-engineered Lesson 2 into 3 segmented steps and placed end-to-end 1-whole bars pixel-aligned directly above the `0..N` number line and beside the fraction boxes—verified in headless Chromium to fit inside `1440×900` (`scrollHeight === 900`, zero scroll). | **Spatial Contiguity & Segmenting**: Learners see their bar cuts, number-line dot, symbolic fraction, and Rue’s coaching simultaneously in one glance. |
| **2. Restoring Corina’s Authentic Rise 360 Aesthetic, Character Embodiment & Audio Modality** | v1 looked like an adult SaaS dashboard (`#FAF9F6` cream, `JetBrains Mono` `CMU 05-840` tags, muted slate/terracotta bars) and dropped Corina’s Rue scenario, color code, and voiceovers. | Rebuilt the UI in authentic Rise 360 (`#1E325C` fraction-tile cover, `#FF631E` progress rings & `CONTINUE` buttons, `Lato` + `Merriweather`), integrated Rue’s 7 expressive cutouts in *Help Rue Out!*, and wired Corina’s 4 MP3 clips to learner-triggered `🔊 Listen` buttons. | **Embodiment, Personalization & Modality**: Age-appropriate 5th/6th-grade warmth, optional voiceover support without auto-play overload, and high fidelity to the S26 exemplar. |
| **3. Enforcing Color Signaling, Coherence & Non-Redundant Coaching** | v1 cluttered the top header with adult `LO1–LO4` pills, used colors disconnected from numerator/denominator roles, and risked repeating identical text in speech bubbles and feedback boxes. | Enforced **Blue (`#2563EB`) = Numerator** and **Green (`#2E8B57`) = Denominator** across every graphic, stepper, bar slice, tick mark, input border, and error highlight; moved all LXD/CMU metadata into a discreet `⚙️ LXD & Mayer Notes` drawer; kept story prompts anchored in Rue’s speech bubble. | **Signaling, Coherence & Redundancy**: Zero extraneous meta-clutter for kids, instant visual mapping between diagrams and symbols, and preserved working-memory access to problem quantities. |

---

## 4. Running Locally & Verification

No build step or package installation is required:

```bash
# Serve locally over HTTP
python3 -m http.server 8000
# Open http://localhost:8000

# Validate JavaScript syntax
node --check app.js
```

### GitHub Pages Deployment
1. Push `main` to `https://github.com/gautamyadavs/tol-vibe-fractions-workspace`.
2. Ensure **Settings → Pages** is configured to deploy from `main` / `/ (root)`. `.nojekyll` serves all static HTML/CSS/JS and `assets/` directly.
