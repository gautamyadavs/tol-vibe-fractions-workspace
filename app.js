/**
 * Understanding Fractions as Division in Real Life — Interactive Domain Workspace
 * CMU 05-840 (Tools for Online Learning) · Spring 2027 · Tool Task 3 Demo #2 (Track B)
 *
 * Vanilla ES6+ JavaScript · Zero external dependencies · Zero client-side API keys
 * Replicates and extends Corina Luca Focsan's 2026 Articulate Rise 360 exemplar:
 * https://corinalucafocsan.github.io/fraction-course/
 */

(function () {
  "use strict";

  const TOTAL_WHOLES = 4;
  const SVG_NS = "http://www.w3.org/2000/svg";

  /**
   * 4-Problem Equal-Sharing Progression with Rue
   * Includes Problem 1 unit conversion (1 week = 7 days) and Problem 3 (< 1 whole contrast).
   */
  const PROBLEMS = [
    {
      id: 1,
      tabTitle: "Weekly Chores",
      tabMeta: "10 hrs · 1 week",
      kicker: "Problem 1 of 4 · Signature Scenario (Unit Conversion)",
      title: "Rue\u2019s Weekly Chore Schedule",
      narrativeHtml:
        "Rue needs to complete <strong>10 hours</strong> of household chores shared equally across <strong>1 week (7 days)</strong> so every day has the exact same workload.",
      question: "How many hours of chores will Rue complete per day?",
      dividend: 10,
      divisor: 7,
      dividendNoun: "hours of chores",
      divisorNoun: "days",
      wholeSingular: "hour",
      wholePlural: "hours",
      wholeCapital: "Hour",
      recipientSingular: "day",
      targetRateLabel: "hours per day",
      divisionPromptLabel: "One day\u2019s share =",
      unitBoxShared: "10 hours of chores",
      unitBoxWhole: "1 hour",
      unitBoxTarget: "Hours per day",
      correctJustification: "A",
      justifications: [
        {
          id: "A",
          text: "Partitioning each of the 10 hours into 7 equal parts gives 1/7-hour pieces; each day receives one 1/7-hour piece from every hour, totaling 10/7 = 1 3/7 hours per day.",
          feedbackIfChosen: ""
        },
        {
          id: "B",
          text: "Splitting 7 days across 10 hours gives 7/10 of a day per hour, because a proper fraction must always put the smaller number in the numerator.",
          feedbackIfChosen:
            "Option B inverts the sharing relationship (dividing 7 days by 10 hours) and relies on the false rule that fractions must always be less than 1 whole."
        },
        {
          id: "C",
          text: "Each of the 7 days gets 1 full hour (using 7 hours) with 3 hours left over, and those 3 leftover hours become 3/10 of an hour per day because there were 10 hours in total.",
          feedbackIfChosen:
            "Option C correctly groups 1 full hour per day, but changes the fractional unit to tenths (3/10). Each leftover hour is still split across 7 days, making seventh-hour pieces."
        }
      ],
      hints: [
        "Check the target unit first: the schedule covers 1 week, and the question asks for hours per day. Since 1 week = 7 days, partition each 1-hour bar into 7 equal parts so each piece represents 1/7 of an hour.",
        "If Rue shares 1 single hour equally across 7 days, each day gets 1/7 hour. Doing that for all 10 hours gives ten 1/7-hour pieces on your model. Count how many full 7/7 bars that fills and how many 1/7 pieces remain."
      ],
      synthesisContext:
        "Converting 1 week into 7 days gives 10 \u00f7 7 = 10/7 hours per day: 1 full hour (7/7) plus 3 leftover seventh-hour pieces (1 3/7 hours every day)."
    },
    {
      id: 2,
      tabTitle: "Trail Granola",
      tabMeta: "7 bars · 4 hikers",
      kicker: "Problem 2 of 4 · Improper Fraction (> 1 Whole)",
      title: "Trailside Granola Share",
      narrativeHtml:
        "Halfway along a ridge hike, Rue and friends want to share <strong>7 granola bars</strong> equally among <strong>4 hikers</strong> so nothing goes to waste.",
      question: "How many granola bars does each hiker get?",
      dividend: 7,
      divisor: 4,
      dividendNoun: "granola bars",
      divisorNoun: "hikers",
      wholeSingular: "granola bar",
      wholePlural: "granola bars",
      wholeCapital: "Bar",
      recipientSingular: "hiker",
      targetRateLabel: "granola bars per hiker",
      divisionPromptLabel: "One hiker\u2019s share =",
      unitBoxShared: "7 granola bars",
      unitBoxWhole: "1 granola bar",
      unitBoxTarget: "Bars per hiker",
      correctJustification: "B",
      justifications: [
        {
          id: "A",
          text: "There are 4 hikers and 7 granola bars, so each hiker receives 4/7 of a granola bar because 4 hikers is fewer than 7 bars.",
          feedbackIfChosen:
            "Option A divides the 4 hikers by the 7 granola bars. Notice that with 7 bars for only 4 hikers, everyone can get at least 1 whole bar first!"
        },
        {
          id: "B",
          text: "Cutting each granola bar into 4 equal fourths lets every hiker take one 1/4 piece from each of the 7 bars, totaling 7 fourth-size pieces (7/4 = 1 3/4 bars per hiker).",
          feedbackIfChosen: ""
        },
        {
          id: "C",
          text: "Each hiker takes 1 whole granola bar (using 4 bars) and 3/7 of another bar, because 3 bars are left out of the original 7 bars.",
          feedbackIfChosen:
            "Option C switches the remainder denominator to 7 (the starting number of bars). The 3 leftover bars are shared among 4 hikers, so each piece is 1/4 of a bar."
        }
      ],
      hints: [
        "Ask: who is receiving an equal share of each granola bar? There are 4 hikers, so partition each 1-bar unit into 4 equal parts (fourths).",
        "One hiker gets 1/4 from each of the 7 granola bars. Shade that many 1/4 pieces starting from 0, then see how many full 4/4 bars and leftover 1/4 pieces you built."
      ],
      synthesisContext:
        "Sharing 7 granola bars equally among 4 hikers yields 7 \u00f7 4 = 7/4 granola bars per hiker: 1 whole bar (4/4) plus 3 fourth-bar pieces (1 3/4 bars)."
    },
    {
      id: 3,
      tabTitle: "Mural Paint",
      tabMeta: "3 liters · 5 boards",
      kicker: "Problem 3 of 4 · Conceptual Contrast (< 1 Whole)",
      title: "Community Mural Paint",
      narrativeHtml:
        "Rue has <strong>3 liters</strong> of sky-blue paint to divide equally across <strong>5 poster boards</strong> for a school community mural.",
      question: "How many liters of paint go onto each poster board?",
      dividend: 3,
      divisor: 5,
      dividendNoun: "liters of paint",
      divisorNoun: "poster boards",
      wholeSingular: "liter",
      wholePlural: "liters",
      wholeCapital: "Liter",
      recipientSingular: "poster board",
      targetRateLabel: "liters per poster board",
      divisionPromptLabel: "One board\u2019s share =",
      unitBoxShared: "3 liters of paint",
      unitBoxWhole: "1 liter",
      unitBoxTarget: "Liters per poster board",
      correctJustification: "C",
      justifications: [
        {
          id: "A",
          text: "Dividing the larger number by the smaller number gives 5 \u00f7 3 = 5/3 = 1 2/3 liters of paint on each poster board.",
          feedbackIfChosen:
            "Option A divides 5 boards by 3 liters! If each of the 5 boards used more than 1 liter, Rue would need more than 5 liters of paint, yet Rue only has 3 liters."
        },
        {
          id: "B",
          text: "Each poster board receives 1/3 of a liter because the paint starts as 3 whole liters.",
          feedbackIfChosen:
            "Option B partitions by 3 (the liters of paint) instead of 5 (the poster boards sharing each liter). Five boards sharing 1 liter each receive 1/5 liter from that liter."
        },
        {
          id: "C",
          text: "Because 3 liters are shared across 5 poster boards, each board gets less than 1 full liter: splitting each liter into 5 fifths gives every board three 1/5-liter shares (3/5 liter).",
          feedbackIfChosen: ""
        }
      ],
      hints: [
        "Pause and estimate magnitude before calculating: Rue only has 3 liters of paint for 5 poster boards. Is there enough paint for each board to get 1 full liter, or will each share stay inside the first whole liter?",
        "Partition each 1-liter bar into 5 equal parts (for the 5 poster boards). One board gets 1/5 liter from each of the 3 liters\u2014count those fifths and notice where the marker lands between 0 and 1."
      ],
      synthesisContext:
        "Sharing 3 liters across 5 poster boards gives 3 \u00f7 5 = 3/5 liter per board. Because 3 < 5, the quotient is a proper fraction less than 1 whole (0 full liters, no mixed number needed)."
    },
    {
      id: 4,
      tabTitle: "Stage Banners",
      tabMeta: "11 yards · 3 banners",
      kicker: "Problem 4 of 4 · Multi-Whole Transfer",
      title: "Spring Showcase Stage Banners",
      narrativeHtml:
        "For the spring talent showcase, Rue cuts <strong>11 yards</strong> of canvas fabric equally to make <strong>3 stage banners</strong> of identical length.",
      question: "How many yards of fabric long is each stage banner?",
      dividend: 11,
      divisor: 3,
      dividendNoun: "yards of fabric",
      divisorNoun: "stage banners",
      wholeSingular: "yard",
      wholePlural: "yards",
      wholeCapital: "Yard",
      recipientSingular: "stage banner",
      targetRateLabel: "yards per banner",
      divisionPromptLabel: "One banner\u2019s length =",
      unitBoxShared: "11 yards of fabric",
      unitBoxWhole: "1 yard",
      unitBoxTarget: "Yards per stage banner",
      correctJustification: "A",
      justifications: [
        {
          id: "A",
          text: "Partitioning each yard into 3 equal thirds gives eleven 1/3-yard pieces per banner, which groups into 3 full yards (9/3) plus 2 leftover third-yard pieces (3 2/3 yards).",
          feedbackIfChosen: ""
        },
        {
          id: "B",
          text: "Three banners use 9 yards (3 whole yards each) with 2 yards left over, so each banner is 3 2/11 yards long.",
          feedbackIfChosen:
            "Option B writes the leftover 2 yards over 11 (the total starting yards) instead of 3 (the 3 banners sharing each leftover yard into thirds)."
        },
        {
          id: "C",
          text: "11 divided by 3 gives 3 whole yards per banner, and the remaining 2 yards must be discarded because whole yards cannot be subdivided.",
          feedbackIfChosen:
            "Option C treats fabric like indivisible items! Continuous lengths like yards of fabric can be cut into 3 equal thirds so the remaining 2 yards are shared completely."
        }
      ],
      hints: [
        "Each yard of fabric is shared equally among 3 stage banners. Set Equal Parts per Whole to 3 so every yard is partitioned into thirds (1/3 yard each).",
        "Sharing all 11 yards gives one 1/3-yard piece per yard (11 thirds altogether). Shade 11 pieces of 1/3 across the 4 yard bars to see how many full 3/3 yards and leftover thirds form one banner."
      ],
      synthesisContext:
        "Cutting 11 yards equally into 3 banners produces 11 \u00f7 3 = 11/3 yards per banner: 3 full yards (9/3) plus 2 leftover third-yard pieces (3 2/3 yards)."
    }
  ];

  /**
   * Pure Step-Level Misconception Diagnostic Evaluator
   * Inspects BOTH constructed visual workspace state AND symbolic inputs.
   * Never reveals exact numeric answers on error states.
   *
   * @param {object} problem - Problem definition from PROBLEMS
   * @param {object} snapshot - Current learner workspace & symbolic values
   * @returns {object} Structured diagnostic feedback descriptor
   */
  function diagnoseSubmission(problem, snapshot) {
    const a = problem.dividend;
    const b = problem.divisor;
    const targetMagnitude = a < b ? "lt1" : a === b ? "eq1" : "gt1";
    const targetWhole = Math.floor(a / b);
    const targetRemNum = a % b;

    const partsPerWhole = snapshot.partsPerWhole;
    const shadedParts = snapshot.shadedParts;

    const hasNum = snapshot.fracNumRaw !== "" && Number.isFinite(snapshot.fracNum);
    const hasDen = snapshot.fracDenRaw !== "" && Number.isFinite(snapshot.fracDen);
    const fracNum = snapshot.fracNum;
    const fracDen = snapshot.fracDen;

    // Basic denominator sanity check if entered
    if (hasDen && (!Number.isInteger(fracDen) || fracDen <= 0)) {
      return {
        status: "coaching",
        code: "INVALID_DENOMINATOR",
        badge: "Denominator Check",
        heading: "Check Your Fraction Denominator",
        message:
          "A fraction\u2019s denominator tells how many equal parts make up 1 whole unit, so it must be a positive whole number (1 or greater).",
        prompt:
          "Enter a whole number of equal parts in the denominator box."
      };
    }

    if (hasNum && (!Number.isInteger(fracNum) || fracNum < 0)) {
      return {
        status: "coaching",
        code: "INVALID_NUMERATOR",
        badge: "Numerator Check",
        heading: "Check Your Fraction Numerator",
        message:
          "Enter a non-negative whole number in the numerator box to count how many fractional pieces make up one share.",
        prompt:
          "Count the shaded unit-fraction pieces starting from 0."
      };
    }

    const hasValidFraction = hasNum && hasDen && fracDen > 0 && fracNum >= 0;

    // Completely untouched submission check
    if (shadedParts === 0 && partsPerWhole === 1 && !hasValidFraction && !snapshot.magnitude && !snapshot.justification) {
      return {
        status: "neutral",
        code: "EMPTY_SUBMISSION",
        badge: "Workspace Ready",
        heading: "Start by Building Your Model in Step 1",
        message:
          "You haven\u2019t partitioned a share or entered a symbolic quotient yet. Use the manipulative above to partition each whole unit and shade one equal share first.",
        prompt:
          "Ask yourself: how many equal " + problem.divisorNoun + " are sharing each " + problem.wholeSingular + "?"
      };
    }

    // -----------------------------------------------------------------------
    // 1. UNIT OMISSION MISCONCEPTION (Problem 1: 1 week vs. 7 days -> 10/1 or partsPerWhole === 1)
    // -----------------------------------------------------------------------
    const symbolicUnitOmission =
      problem.id === 1 && hasValidFraction && fracDen === 1 && fracNum > 0;
    const visualUnitOmission =
      problem.id === 1 && partsPerWhole === 1 && shadedParts > 0 && (!hasValidFraction || fracDen === 1);

    if (symbolicUnitOmission || visualUnitOmission) {
      return {
        status: "coaching",
        code: "UNIT_OMISSION_WEEK_VS_DAYS",
        badge: "Unit-Conversion Check (LO1 · LO4)",
        heading: "Look Closely at the Target Unit: Per Week vs. Per Day",
        message:
          hasValidFraction && fracDen === 1
            ? "Writing a denominator of 1 (" + fracNum + "/1) keeps the schedule as 1 whole week, which measures hours per week rather than hours per day."
            : "Your bar model currently leaves each hour as 1 unpartitioned whole (parts per whole = 1), matching 1 week rather than individual days.",
        prompt:
          "Re-read the question: Rue wants to know how many hours of chores to complete each day across 1 week. How many equal days are in 1 week? Set Equal Parts per Whole (and your denominator) to that number of days."
      };
    }

    // -----------------------------------------------------------------------
    // 2. DIVIDEND / DIVISOR INVERSION (e.g., 7/10, 4/7, 5/3, 3/11)
    // -----------------------------------------------------------------------
    const symbolicInversion = hasValidFraction && fracNum === b && fracDen === a;
    const visualInversion =
      a <= 10 && b <= 10 && partsPerWhole === a && shadedParts === b;

    if (symbolicInversion || visualInversion) {
      const magnitudeHint =
        a > b
          ? "Estimate one share first: if Rue has " +
            a +
            " " +
            problem.dividendNoun +
            " to share among " +
            b +
            " " +
            problem.divisorNoun +
            ", can every " +
            problem.recipientSingular +
            " receive at least 1 full " +
            problem.wholeSingular +
            "? Should one share be greater than 1 or less than 1?"
          : "Estimate one share first: Rue only has " +
            a +
            " " +
            problem.dividendNoun +
            " to spread across " +
            b +
            " " +
            problem.divisorNoun +
            ". Is there enough for each " +
            problem.recipientSingular +
            " to receive more than 1 full " +
            problem.wholeSingular +
            ", or must each share be less than 1 " +
            problem.wholeSingular +
            "?";

      return {
        status: "coaching",
        code: "DIVIDEND_DIVISOR_INVERSION",
        badge: "Dividend / Divisor Inversion (LO1 · LO2)",
        heading: "What Is Being Shared vs. Who Receives a Share?",
        message:
          "Modeling or writing " +
          b +
          "/" +
          a +
          " reverses the division story\u2014it splits " +
          b +
          " " +
          problem.divisorNoun +
          " across " +
          a +
          " " +
          problem.dividendNoun +
          " instead of sharing the " +
          a +
          " " +
          problem.dividendNoun +
          " equally among the " +
          b +
          " " +
          problem.divisorNoun +
          ".",
        prompt: magnitudeHint
      };
    }

    // -----------------------------------------------------------------------
    // 3. VISUAL WORKSPACE COMPLETENESS & VISUAL-SYMBOLIC ALIGNMENT (LO1)
    // -----------------------------------------------------------------------
    if (shadedParts === 0) {
      return {
        status: "coaching",
        code: "VISUAL_NOT_BUILT",
        badge: "Step 1 Visual Model Needed (LO1)",
        heading: "Construct Your Share on the Manipulative First",
        message:
          "Your visual workspace currently has 0 shaded pieces. Building the visual model lets you verify both the size of each fractional piece and whether the share passes 1 whole.",
        prompt:
          "In Step 1, set Equal Parts per Whole for the " +
          problem.divisorNoun +
          " receiving a share, then click the fraction bars or drag the number line marker to shade one " +
          problem.recipientSingular +
          "\u2019s share."
      };
    }

    if (!hasValidFraction) {
      return {
        status: "coaching",
        code: "FRACTION_MISSING",
        badge: "Step 2A Symbolic Fraction Needed",
        heading: "Connect Your Visual Model to a Fraction",
        message:
          "On the workspace you partitioned each whole into " +
          partsPerWhole +
          " equal part(s) and shaded " +
          shadedParts +
          " piece(s). Now enter your fraction quotient (Numerator / Denominator) in Step 2A.",
        prompt:
          "What denominator names the equal parts in 1 whole " +
          problem.wholeSingular +
          ", and how many of those pieces did you shade?"
      };
    }

    // Check Visual-Symbolic Mismatch (neither exact match nor mathematically equivalent)
    const visualMatchesSymbolicExact =
      shadedParts === fracNum && partsPerWhole === fracDen;
    const visualMatchesSymbolicEquiv =
      shadedParts * fracDen === fracNum * partsPerWhole;

    if (!visualMatchesSymbolicExact && !visualMatchesSymbolicEquiv) {
      return {
        status: "coaching",
        code: "VISUAL_SYMBOLIC_MISMATCH",
        badge: "Visual\u2013Symbolic Mismatch (LO1)",
        heading: "Your Visual Model and Written Fraction Disagree",
        message:
          "In Step 1, your manipulative shows " +
          shadedParts +
          " shaded piece(s) where each whole is split into " +
          partsPerWhole +
          " part(s) (" +
          shadedParts +
          "/" +
          partsPerWhole +
          "), whereas in Step 2A you typed " +
          fracNum +
          "/" +
          fracDen +
          ".",
        prompt:
          "Align both representations: check how many equal parts make up 1 whole " +
          problem.wholeSingular +
          " (denominator) and count all shaded 1/" +
          partsPerWhole +
          " pieces from 0 (numerator)."
      };
    }

    // Check whether the aligned Visual + Symbolic quotient actually solves a ÷ b
    const quotientIsEquivalent = fracNum * b === a * fracDen;
    if (!quotientIsEquivalent) {
      // Specific sub-misconception: only shaded 1 single unit share (1/b) instead of a shares
      if (fracNum === 1 && fracDen === b) {
        return {
          status: "coaching",
          code: "SINGLE_WHOLE_ONLY",
          badge: "Equal-Sharing Count Check (LO1)",
          heading: "Great Partition\u2014Now Share All " + a + " Wholes!",
          message:
            "You accurately found that sharing 1 single " +
            problem.wholeSingular +
            " among " +
            b +
            " " +
            problem.divisorNoun +
            " gives each " +
            problem.recipientSingular +
            " 1/" +
            b +
            " of a " +
            problem.wholeSingular +
            ".",
          prompt:
            "Now remember Rue is sharing all " +
            a +
            " " +
            problem.dividendNoun +
            "! If one " +
            problem.recipientSingular +
            " receives a 1/" +
            b +
            " piece from every " +
            problem.wholeSingular +
            ", how many 1/" +
            b +
            " pieces should you shade and write in the numerator?"
        };
      }

      // Specific sub-misconception: partitioned wholes by dividend a instead of divisor b
      if (partsPerWhole === a || fracDen === a) {
        return {
          status: "coaching",
          code: "PARTITIONED_BY_DIVIDEND",
          badge: "Partition Unit Check (LO1)",
          heading: "Check How Many Recipients Share Each Whole",
          message:
            "You partitioned each whole into " +
            a +
            " parts (the number of " +
            problem.dividendNoun +
            " being shared) rather than the number of " +
            problem.divisorNoun +
            " receiving an equal share.",
          prompt:
            "Partition each 1 " +
            problem.wholeSingular +
            " into equal parts matching the number of " +
            problem.divisorNoun +
            ", then take 1 piece from each of the " +
            a +
            " " +
            problem.wholePlural +
            "."
        };
      }

      // Specific sub-misconception: only entered the leftover remainder (e.g., 3/7 instead of 10/7)
      if (a > b && fracDen === b && fracNum === targetRemNum) {
        return {
          status: "coaching",
          code: "REMAINDER_ONLY_AS_QUOTIENT",
          badge: "Total Share Check (LO1 · LO3)",
          heading: "Include the Full Whole Unit(s) in Your Fraction Too",
          message:
            "It looks like you only shaded and wrote the leftover fractional part (" +
            fracNum +
            "/" +
            b +
            ") and left out the complete whole " +
            problem.wholePlural +
            " each " +
            problem.recipientSingular +
            " receives first!",
          prompt:
            "Include all 1/" +
            b +
            " pieces from the complete whole(s) plus the leftover pieces so your fraction in Step 2A represents one entire share."
        };
      }

      return {
        status: "coaching",
        code: "INCORRECT_EQUAL_SHARE",
        badge: "Equal-Sharing Model Check (LO1)",
        heading: "Re-Check the Size and Count of One Equal Share",
        message:
          "Your workspace and fraction both show " +
          fracNum +
          "/" +
          fracDen +
          ", which doesn\u2019t yet match sharing " +
          a +
          " " +
          problem.dividendNoun +
          " equally among " +
          b +
          " " +
          problem.divisorNoun +
          ".",
        prompt:
          "Step through one whole at a time: if 1 " +
          problem.wholeSingular +
          " is split equally among " +
          b +
          " " +
          problem.divisorNoun +
          ", what size piece does one " +
          problem.recipientSingular +
          " get? Then collect one of those pieces from each of the " +
          a +
          " " +
          problem.wholePlural +
          "."
      };
    }

    // -----------------------------------------------------------------------
    // 4. QUOTIENT MAGNITUDE CHECK (< 1 vs. = 1 vs. > 1) — LO2
    // -----------------------------------------------------------------------
    if (!snapshot.magnitude) {
      return {
        status: "coaching",
        code: "MAGNITUDE_MISSING",
        badge: "Step 2B Magnitude Needed (LO2)",
        heading: "Compare Your Quotient to 1 Whole Unit",
        message:
          "Your visual model and fraction (" +
          fracNum +
          "/" +
          fracDen +
          ") accurately represent one share! Next, select in Step 2B whether this share is less than, equal to, or greater than 1 whole " +
          problem.wholeSingular +
          ".",
        prompt:
          "Look at where your marker lands on the 0\u20134 number line relative to 1."
      };
    }

    if (snapshot.magnitude !== targetMagnitude) {
      if (targetMagnitude === "lt1") {
        return {
          status: "coaching",
          code: "MAGNITUDE_OVERGENERALIZED_GT1",
          badge: "Quotient Magnitude Contrast (LO2)",
          heading: "Look Where Your Share Lands Relative to 1 Whole!",
          message:
            "Not every division problem produces a mixed number greater than 1! Look at your fraction bar and number line: your shaded share (" +
            fracNum +
            "/" +
            fracDen +
            " " +
            problem.wholeSingular +
            ") stays completely inside the first whole unit between 0 and 1.",
          prompt:
            "Compare the numerator (" +
            fracNum +
            " pieces) with the " +
            fracDen +
            " pieces needed to make 1 full " +
            problem.wholeSingular +
            ". Which magnitude option in Step 2B describes this proper fraction?"
        };
      }

      return {
        status: "coaching",
        code: "MAGNITUDE_INCORRECT_FOR_IMPROPER",
        badge: "Quotient Magnitude Check (LO2)",
        heading: "Compare Your Shaded Pieces to 1 Full Whole",
        message:
          "Look at your visual workspace: " +
          partsPerWhole +
          " pieces fill 1 whole " +
          problem.wholeSingular +
          ", and your shaded share (" +
          shadedParts +
          " pieces) extends past 1 on the bars and number line!",
        prompt:
          "Because the numerator is larger than the denominator, is one share less than 1 whole, equal to 1 whole, or greater than 1 whole?"
      };
    }

    // -----------------------------------------------------------------------
    // 5. MIXED-NUMBER GROUPING & REMAINDER DENOMINATOR CHECK — LO3 (when > 1)
    // -----------------------------------------------------------------------
    if (targetMagnitude === "gt1") {
      const hasWhole =
        snapshot.mixWholeRaw !== "" &&
        Number.isInteger(snapshot.mixWhole) &&
        snapshot.mixWhole >= 0;
      const hasMixNum =
        snapshot.mixNumRaw !== "" &&
        Number.isInteger(snapshot.mixNum) &&
        snapshot.mixNum >= 0;
      const hasMixDen =
        snapshot.mixDenRaw !== "" &&
        Number.isInteger(snapshot.mixDen) &&
        snapshot.mixDen > 0;

      if (!hasWhole || !hasMixNum || !hasMixDen) {
        return {
          status: "coaching",
          code: "MIXED_INCOMPLETE",
          badge: "Step 2C Mixed Number Needed (LO3)",
          heading: "Group Whole Units & Leftover Pieces into a Mixed Number",
          message:
            "Because one share is greater than 1 whole " +
            problem.wholeSingular +
            ", complete all three boxes of the Mixed Number in Step 2C (Whole Number, Remainder Numerator, and Remainder Denominator).",
          prompt:
            "Count the completely shaded dark-slate bars for the whole number, and count the terracotta pieces in the partially shaded bar for the fractional part."
        };
      }

      const mixWhole = snapshot.mixWhole;
      const mixNum = snapshot.mixNum;
      const mixDen = snapshot.mixDen;

      // Corina's Signature Remainder-Denominator Misconception (e.g., 1 3/10 instead of 1 3/7!)
      if (mixWhole === targetWhole && mixNum === targetRemNum && mixDen === a) {
        return {
          status: "coaching",
          code: "MIXED_DENOMINATOR_USED_DIVIDEND",
          badge: "Mixed-Number Fractional Unit Error (LO3)",
          heading: "Check the Size of Each Leftover Piece!",
          message:
            "You accurately grouped " +
            targetWhole +
            " full " +
            (targetWhole === 1 ? problem.wholeSingular : problem.wholePlural) +
            " and counted " +
            targetRemNum +
            " leftover pieces\u2014however, writing " +
            mixNum +
            "/" +
            mixDen +
            " uses " +
            a +
            " (the starting number of " +
            problem.dividendNoun +
            ") as the denominator!",
          prompt:
            "Look at the partially shaded bar in your workspace: how many equal parts is 1 whole " +
            problem.wholeSingular +
            " divided into? Each terracotta piece has that unit-fraction denominator, not 1/" +
            a +
            "."
        };
      }

      // Improper fractional remainder (didn't finish grouping all wholes, e.g., 1 8/3 or 0 10/7)
      if (mixNum >= mixDen) {
        return {
          status: "coaching",
          code: "MIXED_REMAINDER_STILL_IMPROPER",
          badge: "Whole-Unit Grouping Incomplete (LO3)",
          heading: "More Full Whole Units Can Still Be Grouped",
          message:
            "In your mixed number, the fractional part (" +
            mixNum +
            "/" +
            mixDen +
            ") is still at least 1 whole unit!",
          prompt:
            "Count all completely filled dark-slate whole bars on your diagram (or the highest integer passed on the number line) for the whole number, leaving a proper fraction smaller than 1 whole."
        };
      }

      // Wrong whole-unit count
      if (mixWhole !== targetWhole) {
        return {
          status: "coaching",
          code: "MIXED_WHOLE_INCORRECT",
          badge: "Whole-Unit Count Check (LO3)",
          heading: "Re-Count Complete Whole Units",
          message:
            "You entered " +
            mixWhole +
            " whole " +
            (mixWhole === 1 ? problem.wholeSingular : problem.wholePlural) +
            ", which doesn\u2019t match the complete wholes shown on your bar model and number line.",
          prompt:
            "Every " +
            b +
            " pieces of size 1/" +
            b +
            " form 1 full " +
            problem.wholeSingular +
            ". Count how many completely filled dark-slate bars appear in Step 1."
        };
      }

      // Correct whole count, wrong denominator (other than dividend a)
      const remFractionEquiv = mixNum * b === targetRemNum * mixDen;
      if (!remFractionEquiv && mixDen !== b) {
        return {
          status: "coaching",
          code: "MIXED_DENOMINATOR_INCORRECT",
          badge: "Mixed-Number Denominator Check (LO3)",
          heading: "Keep the Same Fractional Unit Size",
          message:
            "Grouping wholes into a mixed number does not change the size of the leftover fractional pieces. You wrote a denominator of " +
            mixDen +
            ".",
          prompt:
            "Check your partially shaded bar in Step 1: how many equal parts make up 1 whole " +
            problem.wholeSingular +
            "?"
        };
      }

      // Correct whole & denominator, wrong remainder numerator
      if (!remFractionEquiv) {
        return {
          status: "coaching",
          code: "MIXED_NUMERATOR_INCORRECT",
          badge: "Leftover Pieces Check (LO3)",
          heading: "Re-Count the Leftover Fractional Pieces",
          message:
            "Your whole number (" +
            mixWhole +
            ") and piece size (1/" +
            mixDen +
            ") look good, and the numerator (" +
            mixNum +
            ") doesn\u2019t match the leftover pieces after grouping full wholes.",
          prompt:
            "Count just the terracotta-shaded pieces in the partially filled bar (or the ticks past " +
            targetWhole +
            " on the number line)."
        };
      }
    }

    // -----------------------------------------------------------------------
    // 6. CONCEPTUAL JUSTIFICATION IN REAL-WORLD CONTEXT — LO4
    // -----------------------------------------------------------------------
    if (!snapshot.justification) {
      return {
        status: "coaching",
        code: "JUSTIFICATION_MISSING",
        badge: "Step 2D Justification Needed (LO4)",
        heading: "Almost There\u2014Select Your Contextual Justification",
        message:
          "Your visual model, fraction quotient, and magnitude reasoning are all aligned! Complete Step 2D by selecting the explanation that justifies why this fraction works in context.",
        prompt:
          "Read the three explanations carefully and match how each whole " +
          problem.wholeSingular +
          " was partitioned among the " +
          problem.divisorNoun +
          "."
      };
    }

    if (snapshot.justification !== problem.correctJustification) {
      const chosenObj = problem.justifications.find(
        (j) => j.id === snapshot.justification
      );
      return {
        status: "coaching",
        code: "JUSTIFICATION_DISTRACTOR",
        badge: "Conceptual Justification Check (LO4)",
        heading: "Check the Unit Reasoning in Your Selected Explanation",
        message:
          chosenObj && chosenObj.feedbackIfChosen
            ? chosenObj.feedbackIfChosen
            : "Your numbers and model are right, yet the selected statement doesn\u2019t accurately describe how the units are partitioned.",
        prompt:
          "Choose the justification in Step 2D that explains partitioning each " +
          problem.wholeSingular +
          " into " +
          b +
          " equal shares and collecting " +
          a +
          " of those unit-fraction pieces."
      };
    }

    // -----------------------------------------------------------------------
    // 7. FULL MASTERY VERIFIED ACROSS LO1–LO4!
    // -----------------------------------------------------------------------
    const usedScaledEquiv = !(fracNum === a && fracDen === b);
    const scaleNote = usedScaledEquiv
      ? " (Note: your equivalent fraction " +
        fracNum +
        "/" +
        fracDen +
        " equals " +
        a +
        "/" +
        b +
        ", which directly reflects " +
        a +
        " \u00f7 " +
        b +
        "!)"
      : "";

    const summaryBullets = [
      "LO1 (Division = Fraction): " +
        a +
        " " +
        problem.dividendNoun +
        " \u00f7 " +
        b +
        " " +
        problem.divisorNoun +
        " = " +
        a +
        "/" +
        b +
        " " +
        problem.targetRateLabel +
        scaleNote,
      targetMagnitude === "gt1"
        ? "LO2 & LO3 (Magnitude > 1 & Grouping): " +
          a +
          "/" +
          b +
          " groups into " +
          targetWhole +
          " full " +
          (targetWhole === 1 ? problem.wholeSingular : problem.wholePlural) +
          " (" +
          targetWhole * b +
          "/" +
          b +
          ") plus " +
          targetRemNum +
          " leftover 1/" +
          b +
          " piece(s) = " +
          targetWhole +
          " " +
          targetRemNum +
          "/" +
          b +
          "."
        : "LO2 (Magnitude < 1 Contrast): Because " +
          a +
          " < " +
          b +
          ", one share (" +
          a +
          "/" +
          b +
          ") stays between 0 and 1 whole\u2014a proper fraction requiring no mixed-number conversion.",
      "LO4 (Unit Context): " + problem.synthesisContext
    ];

    return {
      status: "verified",
      code: "ALL_STEPS_VERIFIED",
      badge: "All 4 Learning Objectives Verified \u2713",
      heading: "Exact Equal-Sharing Model & Reasoning Verified!",
      message:
        "Your visual manipulative, symbolic quotient, magnitude comparison, and real-world unit justification are completely aligned.",
      bullets: summaryBullets
    };
  }

  // Expose engine for automated Node verification while running cleanly in browser
  if (typeof globalThis !== "undefined") {
    globalThis.FractionsWorkspaceEngine = {
      PROBLEMS: PROBLEMS,
      diagnoseSubmission: diagnoseSubmission
    };
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      PROBLEMS: PROBLEMS,
      diagnoseSubmission: diagnoseSubmission
    };
  }

  // Guard DOM initialization so `node` require/syntax checks succeed cleanly
  if (typeof document === "undefined") {
    return;
  }

  // =========================================================================
  // Browser Interactive Application State & Controller
  // =========================================================================

  function createInitialProblemState() {
    return {
      partsPerWhole: 1,
      shadedParts: 0,
      fracNumRaw: "",
      fracDenRaw: "",
      magnitude: "",
      mixWholeRaw: "",
      mixNumRaw: "",
      mixDenRaw: "",
      justification: "",
      hintsShown: 0,
      solved: false,
      lastDiagnosis: null
    };
  }

  const appState = {
    currentProblemIndex: 0,
    viewMode: "linked", // "linked" | "bars" | "numberline"
    lxdViewActive: false,
    loExpanded: true,
    isDraggingNumberLine: false,
    previewBarIndex: null,
    perProblem: PROBLEMS.map(() => createInitialProblemState())
  };

  // Cache DOM references
  const dom = {
    toggleLxdBtn: document.getElementById("toggle-lxd-view"),
    toggleLoBtn: document.getElementById("toggle-lo-btn"),
    loDrawer: document.getElementById("lo-objectives-drawer"),
    problemNav: document.getElementById("problem-progression-nav"),
    problemKicker: document.getElementById("problem-kicker"),
    problemTitle: document.getElementById("problem-title-heading"),
    problemNarrative: document.getElementById("problem-narrative"),
    problemQuestion: document.getElementById("problem-question"),
    unitShared: document.getElementById("unit-shared-label"),
    unitWhole: document.getElementById("unit-whole-label"),
    unitTarget: document.getElementById("unit-target-label"),

    viewBtnLinked: document.getElementById("view-btn-linked"),
    viewBtnBars: document.getElementById("view-btn-bars"),
    viewBtnNumberline: document.getElementById("view-btn-numberline"),
    representationsGrid: document.getElementById("representations-grid"),

    partsDecBtn: document.getElementById("parts-dec-btn"),
    partsIncBtn: document.getElementById("parts-inc-btn"),
    partsInput: document.getElementById("parts-per-whole-input"),
    partsHelper: document.getElementById("parts-helper-text"),

    shadeDecBtn: document.getElementById("shade-dec-btn"),
    shadeIncBtn: document.getElementById("shade-inc-btn"),
    shadedReadout: document.getElementById("shaded-pieces-readout"),
    resetWorkspaceBtn: document.getElementById("reset-workspace-btn"),

    barsContainer: document.getElementById("fraction-bars-container"),
    numberlineSvg: document.getElementById("numberline-svg"),
    numberlineSlider: document.getElementById("numberline-range-slider"),
    liveModelDesc: document.getElementById("live-model-description"),
    liveGroupingHint: document.getElementById("live-grouping-hint"),

    divisionPrompt: document.getElementById("symbolic-division-prompt"),
    fracNumInput: document.getElementById("frac-num-input"),
    fracDenInput: document.getElementById("frac-den-input"),
    fracUnitLabel: document.getElementById("symbolic-fraction-unit"),

    magRadioLt1: document.getElementById("mag-radio-lt1"),
    magRadioEq1: document.getElementById("mag-radio-eq1"),
    magRadioGt1: document.getElementById("mag-radio-gt1"),
    magCardLt1: document.getElementById("mag-card-lt1"),
    magCardEq1: document.getElementById("mag-card-eq1"),
    magCardGt1: document.getElementById("mag-card-gt1"),

    mixedNote: document.getElementById("mixed-number-note"),
    mixedEditor: document.getElementById("mixed-number-editor"),
    mixedWholeInput: document.getElementById("mixed-whole-input"),
    mixedNumInput: document.getElementById("mixed-num-input"),
    mixedDenInput: document.getElementById("mixed-den-input"),
    mixedUnitLabel: document.getElementById("symbolic-mixed-unit"),

    justificationsContainer: document.getElementById("justification-options-container"),

    checkWorkBtn: document.getElementById("check-work-btn"),
    requestHintBtn: document.getElementById("request-hint-btn"),
    clearSymbolicBtn: document.getElementById("clear-symbolic-btn"),

    readyVisual: document.getElementById("ready-visual"),
    readyVisualState: document.getElementById("ready-visual-state"),
    readyFraction: document.getElementById("ready-fraction"),
    readyFractionState: document.getElementById("ready-fraction-state"),
    readyMagnitude: document.getElementById("ready-magnitude"),
    readyMagnitudeState: document.getElementById("ready-magnitude-state"),
    readyJustification: document.getElementById("ready-justification"),
    readyJustificationState: document.getElementById("ready-justification-state"),

    diagBox: document.getElementById("diagnostic-output-box"),
    diagBadge: document.getElementById("diag-category-badge"),
    diagHeading: document.getElementById("diag-heading"),
    diagMessage: document.getElementById("diag-message"),
    diagPrompt: document.getElementById("diag-socratic-prompt"),
    diagVerifiedList: document.getElementById("diag-verified-list"),
    nextProblemBtn: document.getElementById("next-problem-cta-btn"),

    hintsContainer: document.getElementById("hints-output-container"),
    masteryCard: document.getElementById("course-mastery-card")
  };

  function getActiveProblem() {
    return PROBLEMS[appState.currentProblemIndex];
  }

  function getActiveState() {
    return appState.perProblem[appState.currentProblemIndex];
  }

  function clampInt(val, min, max) {
    const parsed = parseInt(val, 10);
    if (Number.isNaN(parsed)) return min;
    return Math.max(min, Math.min(max, parsed));
  }

  // =========================================================================
  // Rendering Functions
  // =========================================================================

  function renderProblemTabs() {
    dom.problemNav.textContent = "";
    PROBLEMS.forEach((prob, idx) => {
      const pState = appState.perProblem[idx];
      const isActive = idx === appState.currentProblemIndex;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "problem-tab-" + prob.id;
      btn.className =
        "problem-tab-btn" +
        (isActive ? " is-active" : "") +
        (pState.solved ? " is-solved" : "");
      btn.setAttribute("aria-current", isActive ? "step" : "false");

      const topRow = document.createElement("span");
      topRow.className = "problem-tab-top";

      const numSpan = document.createElement("span");
      numSpan.className = "problem-tab-num";
      numSpan.textContent = "PROBLEM 0" + prob.id;

      const statusSpan = document.createElement("span");
      statusSpan.className = "problem-status-tag";
      statusSpan.textContent = pState.solved
        ? "Verified \u2713"
        : isActive
        ? "Active"
        : "Unsolved";

      topRow.appendChild(numSpan);
      topRow.appendChild(statusSpan);

      const titleSpan = document.createElement("span");
      titleSpan.className = "problem-tab-title";
      titleSpan.textContent = prob.tabTitle;

      const metaSpan = document.createElement("span");
      metaSpan.className = "problem-tab-meta";
      metaSpan.textContent = prob.tabMeta;

      btn.appendChild(topRow);
      btn.appendChild(titleSpan);
      btn.appendChild(metaSpan);

      btn.addEventListener("click", () => {
        if (appState.currentProblemIndex !== idx) {
          appState.currentProblemIndex = idx;
          appState.previewBarIndex = null;
          renderAll();
        }
      });

      dom.problemNav.appendChild(btn);
    });
  }

  function renderProblemStory() {
    const prob = getActiveProblem();
    dom.problemKicker.textContent = prob.kicker;
    dom.problemTitle.textContent = prob.title;
    dom.problemNarrative.innerHTML = prob.narrativeHtml;
    dom.problemQuestion.textContent = prob.question;

    dom.unitShared.textContent = prob.unitBoxShared;
    dom.unitWhole.textContent = prob.unitBoxWhole;
    dom.unitTarget.textContent = prob.unitBoxTarget;

    dom.divisionPrompt.textContent = prob.divisionPromptLabel;
    dom.fracUnitLabel.textContent = prob.targetRateLabel;
    dom.mixedUnitLabel.textContent = prob.targetRateLabel;
  }

  function renderViewSwitcher() {
    const modes = [
      { id: "linked", btn: dom.viewBtnLinked, cls: "mode-linked" },
      { id: "bars", btn: dom.viewBtnBars, cls: "mode-bars" },
      { id: "numberline", btn: dom.viewBtnNumberline, cls: "mode-numberline" }
    ];

    dom.representationsGrid.classList.remove("mode-linked", "mode-bars", "mode-numberline");
    modes.forEach((m) => {
      const active = appState.viewMode === m.id;
      m.btn.setAttribute("aria-pressed", active ? "true" : "false");
      if (active) {
        dom.representationsGrid.classList.add(m.cls);
      }
    });
  }

  function renderManipulativeControls() {
    const prob = getActiveProblem();
    const state = getActiveState();
    const b = state.partsPerWhole;
    const maxPieces = TOTAL_WHOLES * b;

    dom.partsInput.value = String(b);
    dom.partsDecBtn.disabled = b <= 1;
    dom.partsIncBtn.disabled = b >= 10;

    dom.partsHelper.textContent =
      b === 1
        ? "1 " + prob.wholeSingular + " = 1 unpartitioned whole (adjust 1\u201310)"
        : "1 " +
          prob.wholeSingular +
          " = " +
          b +
          " equal parts (each piece is 1/" +
          b +
          " " +
          prob.wholeSingular +
          ")";

    dom.shadeDecBtn.disabled = state.shadedParts <= 0;
    dom.shadeIncBtn.disabled = state.shadedParts >= maxPieces;
    dom.shadedReadout.textContent =
      state.shadedParts === 1
        ? "1 piece (1/" + b + ")"
        : state.shadedParts + " pieces (of 1/" + b + ")";

    dom.numberlineSlider.max = String(maxPieces);
    dom.numberlineSlider.value = String(state.shadedParts);
    dom.numberlineSlider.setAttribute(
      "aria-valuetext",
      state.shadedParts +
        " shaded pieces of size 1/" +
        b +
        " " +
        prob.wholeSingular
    );

    const fullWholes = Math.floor(state.shadedParts / b);
    const remPieces = state.shadedParts % b;

    dom.liveModelDesc.innerHTML =
      "Current workspace: each 1 " +
      prob.wholeSingular +
      " has <code>" +
      b +
      "</code> equal " +
      (b === 1 ? "part" : "parts") +
      "; <code>" +
      state.shadedParts +
      "</code> " +
      (state.shadedParts === 1 ? "piece" : "pieces") +
      " shaded.";

    if (state.shadedParts === 0) {
      dom.liveGroupingHint.textContent =
        "Click any bar segment or drag along the number line to model one equal share.";
    } else if (state.shadedParts < b) {
      dom.liveGroupingHint.textContent =
        "Visual check: 0 full " +
        prob.wholePlural +
        " filled; share stays inside the 1st whole (< 1).";
    } else if (remPieces === 0) {
      dom.liveGroupingHint.textContent =
        "Visual check: exactly " +
        fullWholes +
        " complete " +
        (fullWholes === 1 ? prob.wholeSingular : prob.wholePlural) +
        " filled with 0 leftover pieces.";
    } else {
      dom.liveGroupingHint.textContent =
        "Visual check: " +
        fullWholes +
        " complete dark-slate " +
        (fullWholes === 1 ? prob.wholeSingular : prob.wholePlural) +
        " + " +
        remPieces +
        " terracotta leftover " +
        (remPieces === 1 ? "piece" : "pieces") +
        ".";
    }
  }

  function renderFractionBars() {
    const prob = getActiveProblem();
    const state = getActiveState();
    const b = state.partsPerWhole;
    const shaded = state.shadedParts;

    dom.barsContainer.textContent = "";

    for (let w = 1; w <= TOTAL_WHOLES; w++) {
      const startIdx = (w - 1) * b + 1;
      const endIdx = w * b;
      const shadedInWhole = Math.max(0, Math.min(b, shaded - (w - 1) * b));
      const isWholeComplete = shadedInWhole === b;

      const row = document.createElement("div");
      row.className = "whole-bar-row";

      const meta = document.createElement("div");
      meta.className = "whole-bar-meta";

      const label = document.createElement("span");
      label.className = "whole-bar-label";
      label.textContent = prob.wholeCapital + " " + w + " (1 Whole " + prob.wholeCapital + ")";

      const status = document.createElement("span");
      status.className =
        "whole-bar-status" +
        (isWholeComplete
          ? " status-complete"
          : shadedInWhole > 0
          ? " status-partial"
          : "");

      if (isWholeComplete) {
        status.textContent = "Complete Whole (" + b + "/" + b + ")";
      } else if (shadedInWhole > 0) {
        status.textContent = shadedInWhole + " of " + b + " pieces shaded";
      } else {
        status.textContent = "0 of " + b + " shaded";
      }

      meta.appendChild(label);
      meta.appendChild(status);

      const track = document.createElement("div");
      track.className = "whole-bar-track";
      track.style.gridTemplateColumns = "repeat(" + b + ", minmax(0, 1fr))";

      for (let p = 1; p <= b; p++) {
        const globalIdx = startIdx + p - 1;
        const isShaded = globalIdx <= shaded;

        const segBtn = document.createElement("button");
        segBtn.type = "button";
        segBtn.id = "bar-seg-w" + w + "-p" + p;
        segBtn.dataset.pieceIndex = String(globalIdx);
        segBtn.className = "bar-segment-btn";

        if (isShaded) {
          segBtn.classList.add(
            isWholeComplete ? "is-shaded-whole" : "is-shaded-partial"
          );
        } else if (
          appState.previewBarIndex !== null &&
          globalIdx <= appState.previewBarIndex
        ) {
          segBtn.classList.add("is-preview");
        }

        segBtn.textContent = b === 1 ? "1 whole" : "1/" + b;
        segBtn.setAttribute("aria-pressed", isShaded ? "true" : "false");
        segBtn.setAttribute(
          "aria-label",
          prob.wholeCapital +
            " " +
            w +
            ", piece " +
            p +
            " of " +
            b +
            " (shade " +
            globalIdx +
            " pieces of size 1/" +
            b +
            ")"
        );

        segBtn.addEventListener("click", () => {
          // Clicking the exact last shaded piece steps down by 1; otherwise shades up to globalIdx
          if (state.shadedParts === globalIdx) {
            state.shadedParts = globalIdx - 1;
          } else {
            state.shadedParts = globalIdx;
          }
          appState.previewBarIndex = null;
          renderVisualWorkspace();
          renderReadinessChecklist();
        });

        segBtn.addEventListener("mouseenter", () => {
          if (globalIdx > state.shadedParts) {
            appState.previewBarIndex = globalIdx;
            updateBarPreviewHighlight();
          }
        });

        segBtn.addEventListener("mouseleave", () => {
          if (appState.previewBarIndex !== null) {
            appState.previewBarIndex = null;
            updateBarPreviewHighlight();
          }
        });

        // Prevent unused variable lint warning for endIdx while keeping clarity
        if (globalIdx === endIdx) {
          segBtn.dataset.wholeEnd = "true";
        }

        track.appendChild(segBtn);
      }

      row.appendChild(meta);
      row.appendChild(track);
      dom.barsContainer.appendChild(row);
    }
  }

  function updateBarPreviewHighlight() {
    const state = getActiveState();
    const buttons = dom.barsContainer.querySelectorAll(".bar-segment-btn");
    buttons.forEach((btn) => {
      const idx = parseInt(btn.dataset.pieceIndex, 10);
      if (idx > state.shadedParts) {
        btn.classList.toggle(
          "is-preview",
          appState.previewBarIndex !== null && idx <= appState.previewBarIndex
        );
      } else {
        btn.classList.remove("is-preview");
      }
    });
  }

  function createSvgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    Object.keys(attrs).forEach((k) => {
      el.setAttribute(k, String(attrs[k]));
    });
    return el;
  }

  function renderNumberLineSvg() {
    const prob = getActiveProblem();
    const state = getActiveState();
    const b = state.partsPerWhole;
    const shaded = state.shadedParts;
    const totalSteps = TOTAL_WHOLES * b;

    const X_START = 44;
    const X_END = 596;
    const TRACK_W = X_END - X_START; // 552
    const AXIS_Y = 124;

    const xOf = (step) => X_START + (step / totalSteps) * TRACK_W;

    const svg = dom.numberlineSvg;
    svg.textContent = "";

    // Accessible hatch/stipple patterns matching the Fraction Bars
    const defs = createSvgEl("defs", {});

    const wholePat = createSvgEl("pattern", {
      id: "nl-whole-hatch",
      width: 8,
      height: 8,
      patternUnits: "userSpaceOnUse",
      patternTransform: "rotate(45)"
    });
    wholePat.appendChild(
      createSvgEl("rect", { width: 8, height: 8, fill: "#264653" })
    );
    wholePat.appendChild(
      createSvgEl("line", {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 8,
        stroke: "rgba(255,255,255,0.22)",
        "stroke-width": 2
      })
    );

    const partPat = createSvgEl("pattern", {
      id: "nl-part-dots",
      width: 6,
      height: 6,
      patternUnits: "userSpaceOnUse"
    });
    partPat.appendChild(
      createSvgEl("rect", { width: 6, height: 6, fill: "#C85A32" })
    );
    partPat.appendChild(
      createSvgEl("circle", {
        cx: 3,
        cy: 3,
        r: 1,
        fill: "rgba(255,255,255,0.35)"
      })
    );

    defs.appendChild(wholePat);
    defs.appendChild(partPat);
    svg.appendChild(defs);

    // Base unshaded axis track
    svg.appendChild(
      createSvgEl("line", {
        x1: X_START,
        y1: AXIS_Y,
        x2: X_END,
        y2: AXIS_Y,
        stroke: "#D6D5CE",
        "stroke-width": 8,
        "stroke-linecap": "round"
      })
    );

    const fullWholes = Math.floor(shaded / b);
    const remSteps = shaded % b;

    // 1) Shaded Complete Integer Span (0 -> fullWholes) + Whole Jump Arcs
    if (fullWholes > 0) {
      svg.appendChild(
        createSvgEl("line", {
          x1: xOf(0),
          y1: AXIS_Y,
          x2: xOf(fullWholes * b),
          y2: AXIS_Y,
          stroke: "url(#nl-whole-hatch)",
          "stroke-width": 10,
          "stroke-linecap": "butt"
        })
      );

      for (let w = 0; w < fullWholes; w++) {
        const x1 = xOf(w * b);
        const x2 = xOf((w + 1) * b);
        const midX = (x1 + x2) / 2;
        const arcPath =
          "M " + x1 + " " + (AXIS_Y - 12) + " Q " + midX + " " + (AXIS_Y - 46) + " " + x2 + " " + (AXIS_Y - 12);
        svg.appendChild(
          createSvgEl("path", {
            d: arcPath,
            fill: "none",
            stroke: "#264653",
            "stroke-width": 1.8,
            "stroke-dasharray": "4 3"
          })
        );
      }
    }

    // 2) Shaded Fractional Remainder Span (fullWholes -> shaded/b) + Unit Hops
    if (remSteps > 0) {
      svg.appendChild(
        createSvgEl("line", {
          x1: xOf(fullWholes * b),
          y1: AXIS_Y,
          x2: xOf(shaded),
          y2: AXIS_Y,
          stroke: "url(#nl-part-dots)",
          "stroke-width": 10,
          "stroke-linecap": "butt"
        })
      );

      for (let s = fullWholes * b; s < shaded; s++) {
        const x1 = xOf(s);
        const x2 = xOf(s + 1);
        const midX = (x1 + x2) / 2;
        const hopHeight = b <= 5 ? 28 : 20;
        const hopPath =
          "M " + x1 + " " + (AXIS_Y - 10) + " Q " + midX + " " + (AXIS_Y - hopHeight) + " " + x2 + " " + (AXIS_Y - 10);
        svg.appendChild(
          createSvgEl("path", {
            d: hopPath,
            fill: "none",
            stroke: "#C85A32",
            "stroke-width": 1.6
          })
        );
      }
    }

    // 3) Partition Ticks & Integer Labels across 0..4
    for (let step = 0; step <= totalSteps; step++) {
      const x = xOf(step);
      const isInteger = step % b === 0;
      const isMid = !isInteger && b % 2 === 0 && step % (b / 2) === 0;

      const yTop = isInteger ? AXIS_Y - 18 : isMid ? AXIS_Y - 11 : AXIS_Y - 7;
      const yBot = isInteger ? AXIS_Y + 18 : isMid ? AXIS_Y + 11 : AXIS_Y + 7;

      svg.appendChild(
        createSvgEl("line", {
          x1: x,
          y1: yTop,
          x2: x,
          y2: yBot,
          stroke: isInteger ? "#18181B" : step <= shaded ? "#264653" : "#71717A",
          "stroke-width": isInteger ? 2.4 : isMid ? 1.5 : 1.15
        })
      );

      if (isInteger) {
        const wholeVal = step / b;
        const numLabel = createSvgEl("text", {
          x: x,
          y: AXIS_Y + 38,
          "text-anchor": "middle",
          fill: "#18181B",
          "font-family": "JetBrains Mono, monospace",
          "font-size": "14",
          "font-weight": "700"
        });
        numLabel.textContent = String(wholeVal);
        svg.appendChild(numLabel);

        const unitSub = createSvgEl("text", {
          x: x,
          y: AXIS_Y + 56,
          "text-anchor": "middle",
          fill: "#686870",
          "font-family": "Inter, sans-serif",
          "font-size": "10.5",
          "font-weight": "500"
        });
        unitSub.textContent =
          wholeVal === 1
            ? "1 " + prob.wholeSingular
            : wholeVal + " " + prob.wholePlural;
        svg.appendChild(unitSub);
      }
    }

    // 4) Active Draggable Marker & Callout Badge
    const markerX = xOf(shaded);
    const badgeW = 136;
    const badgeX = Math.max(8, Math.min(640 - badgeW - 8, markerX - badgeW / 2));
    const markerColor =
      shaded === 0
        ? "#52525B"
        : remSteps === 0
        ? "#264653"
        : "#C85A32";

    // Connector stem from callout badge down to axis
    svg.appendChild(
      createSvgEl("line", {
        x1: markerX,
        y1: 44,
        x2: markerX,
        y2: AXIS_Y,
        stroke: markerColor,
        "stroke-width": 2
      })
    );

    // Callout pill
    svg.appendChild(
      createSvgEl("rect", {
        x: badgeX,
        y: 14,
        width: badgeW,
        height: 30,
        rx: 6,
        fill: markerColor
      })
    );

    const badgeText = createSvgEl("text", {
      x: badgeX + badgeW / 2,
      y: 33,
      "text-anchor": "middle",
      fill: "#FFFFFF",
      "font-family": "JetBrains Mono, monospace",
      "font-size": "11.5",
      "font-weight": "600"
    });
    badgeText.textContent =
      shaded === 0
        ? "0 (Start)"
        : shaded + (shaded === 1 ? " tick" : " ticks") + " of 1/" + b;
    svg.appendChild(badgeText);

    // Tactile marker pin on the axis
    svg.appendChild(
      createSvgEl("circle", {
        cx: markerX,
        cy: AXIS_Y,
        r: 10.5,
        fill: markerColor,
        stroke: "#FFFFFF",
        "stroke-width": 2.5
      })
    );
    svg.appendChild(
      createSvgEl("circle", {
        cx: markerX,
        cy: AXIS_Y,
        r: 3.5,
        fill: "#FFFFFF"
      })
    );
  }

  function renderVisualWorkspace() {
    renderManipulativeControls();
    renderFractionBars();
    renderNumberLineSvg();
  }

  function renderSymbolicInputs() {
    const prob = getActiveProblem();
    const state = getActiveState();

    dom.fracNumInput.value = state.fracNumRaw;
    dom.fracDenInput.value = state.fracDenRaw;

    dom.magRadioLt1.checked = state.magnitude === "lt1";
    dom.magRadioEq1.checked = state.magnitude === "eq1";
    dom.magRadioGt1.checked = state.magnitude === "gt1";

    dom.magCardLt1.classList.toggle("is-selected", state.magnitude === "lt1");
    dom.magCardEq1.classList.toggle("is-selected", state.magnitude === "eq1");
    dom.magCardGt1.classList.toggle("is-selected", state.magnitude === "gt1");

    // Conditional Mixed Number Editor based on learner's selected magnitude (never spoils Problem 3!)
    if (state.magnitude === "gt1") {
      dom.mixedEditor.hidden = false;
      dom.mixedNote.textContent =
        "Group your complete wholes and leftover fractional pieces into a mixed number below:";
    } else if (state.magnitude === "lt1") {
      dom.mixedEditor.hidden = true;
      dom.mixedNote.textContent =
        "Less than 1 whole selected: a proper fraction has 0 full wholes, so no mixed-number conversion is needed.";
    } else if (state.magnitude === "eq1") {
      dom.mixedEditor.hidden = true;
      dom.mixedNote.textContent =
        "Equal to 1 whole selected: the quotient equals 1 full unit with 0 leftover fractional parts.";
    } else {
      dom.mixedEditor.hidden = true;
      dom.mixedNote.innerHTML =
        "Select a magnitude in <strong>Step 2B</strong>. When a share is <strong>greater than 1 whole</strong>, enter its Mixed Number equivalence here.";
    }

    dom.mixedWholeInput.value = state.mixWholeRaw;
    dom.mixedNumInput.value = state.mixNumRaw;
    dom.mixedDenInput.value = state.mixDenRaw;

    // Render 3-option Conceptual Justifications
    dom.justificationsContainer.textContent = "";
    prob.justifications.forEach((opt) => {
      const label = document.createElement("label");
      label.id = "just-card-" + opt.id;
      label.htmlFor = "just-radio-" + opt.id;
      label.className =
        "choice-card" + (state.justification === opt.id ? " is-selected" : "");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.id = "just-radio-" + opt.id;
      radio.name = "conceptual-justification";
      radio.value = opt.id;
      radio.checked = state.justification === opt.id;

      radio.addEventListener("change", () => {
        state.justification = opt.id;
        renderSymbolicJustificationSelection();
        renderReadinessChecklist();
      });

      const span = document.createElement("span");
      span.className = "choice-text";
      const prefix = document.createElement("strong");
      prefix.textContent = "Option " + opt.id + ": ";
      span.appendChild(prefix);
      span.appendChild(document.createTextNode(opt.text));

      label.appendChild(radio);
      label.appendChild(span);
      dom.justificationsContainer.appendChild(label);
    });
  }

  function renderSymbolicJustificationSelection() {
    const state = getActiveState();
    const prob = getActiveProblem();
    prob.justifications.forEach((opt) => {
      const card = document.getElementById("just-card-" + opt.id);
      if (card) {
        card.classList.toggle("is-selected", state.justification === opt.id);
      }
    });
  }

  function renderReadinessChecklist() {
    const state = getActiveState();

    const visReady = state.shadedParts > 0;
    const fracReady =
      state.fracNumRaw.trim() !== "" && state.fracDenRaw.trim() !== "";
    const magReady =
      state.magnitude === "lt1" ||
      state.magnitude === "eq1" ||
      (state.magnitude === "gt1" &&
        state.mixWholeRaw.trim() !== "" &&
        state.mixNumRaw.trim() !== "" &&
        state.mixDenRaw.trim() !== "");
    const justReady = state.justification !== "";

    dom.readyVisual.classList.toggle("is-ready", visReady);
    dom.readyVisualState.textContent = visReady ? "Built \u2713" : "Pending";

    dom.readyFraction.classList.toggle("is-ready", fracReady);
    dom.readyFractionState.textContent = fracReady ? "Entered \u2713" : "Pending";

    dom.readyMagnitude.classList.toggle("is-ready", magReady);
    dom.readyMagnitudeState.textContent = magReady ? "Set \u2713" : "Pending";

    dom.readyJustification.classList.toggle("is-ready", justReady);
    dom.readyJustificationState.textContent = justReady ? "Selected \u2713" : "Pending";
  }

  function renderDiagnosticPanel() {
    const state = getActiveState();
    const diag = state.lastDiagnosis;

    dom.diagBox.classList.remove("state-coaching", "state-verified");
    dom.diagPrompt.hidden = true;
    dom.diagVerifiedList.hidden = true;
    dom.diagVerifiedList.textContent = "";
    dom.nextProblemBtn.hidden = true;

    if (!diag) {
      dom.diagBadge.textContent = "Ready to Diagnose";
      dom.diagHeading.textContent = "Build Your Model & Test Your Reasoning";
      dom.diagMessage.innerHTML =
        "Start in <strong>Step 1</strong> by partitioning each whole unit and shading one share on the fraction bars or number line. Then complete <strong>Step 2</strong> and select <strong>Check My Work</strong> for step-level feedback.";
      return;
    }

    if (diag.status === "coaching") {
      dom.diagBox.classList.add("state-coaching");
    } else if (diag.status === "verified") {
      dom.diagBox.classList.add("state-verified");
    }

    dom.diagBadge.textContent = diag.badge;
    dom.diagHeading.textContent = diag.heading;
    dom.diagMessage.textContent = diag.message;

    if (diag.prompt) {
      dom.diagPrompt.hidden = false;
      dom.diagPrompt.textContent = "Next Step: " + diag.prompt;
    }

    if (diag.bullets && diag.bullets.length > 0) {
      dom.diagVerifiedList.hidden = false;
      diag.bullets.forEach((line) => {
        const li = document.createElement("li");
        li.textContent = line;
        dom.diagVerifiedList.appendChild(li);
      });
    }

    if (diag.status === "verified") {
      const allSolved = appState.perProblem.every((p) => p.solved);
      if (appState.currentProblemIndex < PROBLEMS.length - 1) {
        dom.nextProblemBtn.hidden = false;
        dom.nextProblemBtn.textContent =
          "Continue to Problem " + (appState.currentProblemIndex + 2) + " \u2192";
      } else if (allSolved) {
        dom.nextProblemBtn.hidden = false;
        dom.nextProblemBtn.textContent = "Review Full 4-Scenario Synthesis \u2193";
      }
    }
  }

  function renderHints() {
    const prob = getActiveProblem();
    const state = getActiveState();
    const totalHints = prob.hints.length;

    dom.requestHintBtn.textContent =
      state.hintsShown >= totalHints
        ? "All Hints Shown (" + totalHints + "/" + totalHints + ")"
        : "Get a Hint (" + state.hintsShown + "/" + totalHints + ")";
    dom.requestHintBtn.disabled = state.hintsShown >= totalHints;

    dom.hintsContainer.textContent = "";
    for (let i = 0; i < state.hintsShown; i++) {
      const card = document.createElement("div");
      card.className = "hint-card";

      const label = document.createElement("span");
      label.className = "hint-card-label";
      label.textContent =
        i === 0
          ? "Hint 1 of 2 · Partitioning & Units"
          : "Hint 2 of 2 · Counting Pieces & Grouping Wholes";

      const text = document.createElement("div");
      text.textContent = prob.hints[i];

      card.appendChild(label);
      card.appendChild(text);
      dom.hintsContainer.appendChild(card);
    }
  }

  function renderCourseMasteryBanner() {
    const allSolved = appState.perProblem.every((p) => p.solved);
    dom.masteryCard.hidden = !allSolved;
  }

  function renderAll() {
    renderProblemTabs();
    renderProblemStory();
    renderViewSwitcher();
    renderVisualWorkspace();
    renderSymbolicInputs();
    renderReadinessChecklist();
    renderDiagnosticPanel();
    renderHints();
    renderCourseMasteryBanner();
  }

  // =========================================================================
  // Event Wiring
  // =========================================================================

  function updatePartsPerWhole(newB) {
    const state = getActiveState();
    const clampedB = clampInt(newB, 1, 10);
    state.partsPerWhole = clampedB;
    const maxShaded = TOTAL_WHOLES * clampedB;
    if (state.shadedParts > maxShaded) {
      state.shadedParts = maxShaded;
    }
    appState.previewBarIndex = null;
    renderVisualWorkspace();
    renderReadinessChecklist();
  }

  function updateShadedParts(newShaded) {
    const state = getActiveState();
    const maxShaded = TOTAL_WHOLES * state.partsPerWhole;
    state.shadedParts = clampInt(newShaded, 0, maxShaded);
    renderVisualWorkspace();
    renderReadinessChecklist();
  }

  function stepFromSvgEvent(evt) {
    const state = getActiveState();
    const totalSteps = TOTAL_WHOLES * state.partsPerWhole;
    const rect = dom.numberlineSvg.getBoundingClientRect();
    if (rect.width <= 0) return state.shadedParts;

    // Map clientX into 640-unit SVG viewBox space
    const svgX = ((evt.clientX - rect.left) / rect.width) * 640;
    const X_START = 44;
    const TRACK_W = 552;
    const ratio = Math.max(0, Math.min(1, (svgX - X_START) / TRACK_W));
    return Math.round(ratio * totalSteps);
  }

  function bindEvents() {
    // Top Header: Learning Engineer View toggle
    dom.toggleLxdBtn.addEventListener("click", () => {
      appState.lxdViewActive = !appState.lxdViewActive;
      dom.toggleLxdBtn.setAttribute(
        "aria-pressed",
        appState.lxdViewActive ? "true" : "false"
      );
      document.body.classList.toggle("lxd-view-active", appState.lxdViewActive);
    });

    // Learning Objectives collapsible drawer
    dom.toggleLoBtn.addEventListener("click", () => {
      appState.loExpanded = !appState.loExpanded;
      dom.loDrawer.hidden = !appState.loExpanded;
      dom.toggleLoBtn.setAttribute(
        "aria-expanded",
        appState.loExpanded ? "true" : "false"
      );
      dom.toggleLoBtn.textContent = appState.loExpanded
        ? "Hide Learning Objectives (LO1\u2013LO4)"
        : "Show Learning Objectives (LO1\u2013LO4)";
    });

    // Representation View Switcher
    dom.viewBtnLinked.addEventListener("click", () => {
      appState.viewMode = "linked";
      renderViewSwitcher();
    });
    dom.viewBtnBars.addEventListener("click", () => {
      appState.viewMode = "bars";
      renderViewSwitcher();
    });
    dom.viewBtnNumberline.addEventListener("click", () => {
      appState.viewMode = "numberline";
      renderViewSwitcher();
    });

    // Parts per whole controls
    dom.partsDecBtn.addEventListener("click", () => {
      updatePartsPerWhole(getActiveState().partsPerWhole - 1);
    });
    dom.partsIncBtn.addEventListener("click", () => {
      updatePartsPerWhole(getActiveState().partsPerWhole + 1);
    });
    dom.partsInput.addEventListener("change", () => {
      updatePartsPerWhole(dom.partsInput.value);
    });

    // Shaded unit pieces stepper controls
    dom.shadeDecBtn.addEventListener("click", () => {
      updateShadedParts(getActiveState().shadedParts - 1);
    });
    dom.shadeIncBtn.addEventListener("click", () => {
      updateShadedParts(getActiveState().shadedParts + 1);
    });

    // Reset visual workspace
    dom.resetWorkspaceBtn.addEventListener("click", () => {
      const state = getActiveState();
      state.partsPerWhole = 1;
      state.shadedParts = 0;
      appState.previewBarIndex = null;
      renderVisualWorkspace();
      renderReadinessChecklist();
    });

    // Interactive SVG Number Line pointer click & drag
    dom.numberlineSvg.addEventListener("pointerdown", (evt) => {
      appState.isDraggingNumberLine = true;
      if (dom.numberlineSvg.setPointerCapture) {
        try {
          dom.numberlineSvg.setPointerCapture(evt.pointerId);
        } catch (_err) {
          // Ignore synthetic events without active pointerId
        }
      }
      updateShadedParts(stepFromSvgEvent(evt));
    });

    dom.numberlineSvg.addEventListener("pointermove", (evt) => {
      if (!appState.isDraggingNumberLine) return;
      updateShadedParts(stepFromSvgEvent(evt));
    });

    const stopDragging = () => {
      appState.isDraggingNumberLine = false;
    };
    dom.numberlineSvg.addEventListener("pointerup", stopDragging);
    dom.numberlineSvg.addEventListener("pointercancel", stopDragging);

    // Synchronized keyboard-accessible range slider
    dom.numberlineSlider.addEventListener("input", () => {
      updateShadedParts(dom.numberlineSlider.value);
    });

    // Symbolic fraction inputs
    dom.fracNumInput.addEventListener("input", () => {
      getActiveState().fracNumRaw = dom.fracNumInput.value.trim();
      renderReadinessChecklist();
    });
    dom.fracDenInput.addEventListener("input", () => {
      getActiveState().fracDenRaw = dom.fracDenInput.value.trim();
      renderReadinessChecklist();
    });

    // Magnitude radio cards
    [dom.magRadioLt1, dom.magRadioEq1, dom.magRadioGt1].forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.checked) {
          getActiveState().magnitude = radio.value;
          renderSymbolicInputs();
          renderReadinessChecklist();
        }
      });
    });

    // Mixed number inputs
    dom.mixedWholeInput.addEventListener("input", () => {
      getActiveState().mixWholeRaw = dom.mixedWholeInput.value.trim();
      renderReadinessChecklist();
    });
    dom.mixedNumInput.addEventListener("input", () => {
      getActiveState().mixNumRaw = dom.mixedNumInput.value.trim();
      renderReadinessChecklist();
    });
    dom.mixedDenInput.addEventListener("input", () => {
      getActiveState().mixDenRaw = dom.mixedDenInput.value.trim();
      renderReadinessChecklist();
    });

    // Clear symbolic inputs
    dom.clearSymbolicBtn.addEventListener("click", () => {
      const state = getActiveState();
      state.fracNumRaw = "";
      state.fracDenRaw = "";
      state.magnitude = "";
      state.mixWholeRaw = "";
      state.mixNumRaw = "";
      state.mixDenRaw = "";
      state.justification = "";
      state.lastDiagnosis = null;
      renderSymbolicInputs();
      renderReadinessChecklist();
      renderDiagnosticPanel();
    });

    // Progressive 2-step hint button
    dom.requestHintBtn.addEventListener("click", () => {
      const prob = getActiveProblem();
      const state = getActiveState();
      if (state.hintsShown < prob.hints.length) {
        state.hintsShown += 1;
        renderHints();
      }
    });

    // Check My Work — Runs Step-Level Misconception Diagnostic Engine
    dom.checkWorkBtn.addEventListener("click", () => {
      const prob = getActiveProblem();
      const state = getActiveState();

      const parseNumOrNaN = (raw) => (raw === "" ? NaN : Number(raw));

      const snapshot = {
        partsPerWhole: state.partsPerWhole,
        shadedParts: state.shadedParts,
        fracNumRaw: state.fracNumRaw,
        fracDenRaw: state.fracDenRaw,
        fracNum: parseNumOrNaN(state.fracNumRaw),
        fracDen: parseNumOrNaN(state.fracDenRaw),
        magnitude: state.magnitude,
        mixWholeRaw: state.mixWholeRaw,
        mixNumRaw: state.mixNumRaw,
        mixDenRaw: state.mixDenRaw,
        mixWhole: parseNumOrNaN(state.mixWholeRaw),
        mixNum: parseNumOrNaN(state.mixNumRaw),
        mixDen: parseNumOrNaN(state.mixDenRaw),
        justification: state.justification
      };

      const diagnosis = diagnoseSubmission(prob, snapshot);
      state.lastDiagnosis = diagnosis;
      if (diagnosis.status === "verified") {
        state.solved = true;
      }

      renderProblemTabs();
      renderDiagnosticPanel();
      renderCourseMasteryBanner();
    });

    // Next Problem CTA inside Verified Card
    dom.nextProblemBtn.addEventListener("click", () => {
      if (appState.currentProblemIndex < PROBLEMS.length - 1) {
        appState.currentProblemIndex += 1;
        appState.previewBarIndex = null;
        renderAll();
        document
          .getElementById("problem-context-card")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        dom.masteryCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  bindEvents();
  renderAll();
})();
