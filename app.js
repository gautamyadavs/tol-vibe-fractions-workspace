/* ==========================================================================
   Understanding Fractions as Division in Real Life — Track B Interactive App
   Authentic Corina Luca S26 Rise 360 Flow + Mayer Multimedia Principles
   100% Client-Side Vanilla ES6+ · Zero External Libraries · Zero API Keys
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Domain Scenarios & Curriculum Configuration
     ------------------------------------------------------------------------ */

  const RUE_POSES = {
    neutral: 'assets/rue-neutral.png',
    asking: 'assets/rue-asking.png',
    talking: 'assets/rue-talking.png',
    thinking: 'assets/rue-thinking.png',
    confused: 'assets/rue-confused.png',
    worried: 'assets/rue-worried.png',
    happy: 'assets/rue-happy.png'
  };

  const LESSON2_PROBLEM = {
    id: 'rue-chores-10-7',
    title: 'Weekly Chores',
    dividend: 10,
    divisor: 7,
    maxWholes: 2,
    maxParts: 10,
    wholeLabel: 'Hour',
    wholeLabelPlural: 'hours',
    recipientLabelPlural: 'days',
    shareUnitLabel: 'hours per day',
    hints: [
      'Hint 1 (Green Cuts): Since 1 week = 7 days, click the Green [ + ] button until each 1-hour bar is cut into 7 equal parts.',
      'Hint 2 (Blue Share): Collecting 1/7 from each of the 10 hours gives 10 seventh-hour pieces! Shade 10 blue pieces (1 full bar + 3 pieces in Hour 2).'
    ]
  };

  const STUDIO_CHALLENGES = [
    {
      index: 0,
      id: 'studio-muffins-13-5',
      shortTitle: '1. Muffins (13 ÷ 5)',
      title: 'Sharing Bakery Muffins',
      dividend: 13,
      divisor: 5,
      maxWholes: 3,
      maxParts: 13,
      wholeLabel: 'Muffin',
      wholeLabelPlural: 'muffins',
      recipientLabelPlural: 'friends',
      unitShort: 'muffins / friend',
      mixUnitShort: 'muffins',
      promptHtml:
        '“Challenge 1: <strong>5 friends</strong> equally share <strong>13 jumbo blueberry muffins</strong> after soccer practice (<code>13 ÷ 5</code>). Build one friend’s fair share and see how many muffins each friend gets!”',
      hints: [
        'Hint 1 (Green Cuts): 5 friends are sharing each muffin equally, so cut each 1-muffin bar into 5 equal fifths.',
        'Hint 2 (Blue Share): Shade 13 fifth-size pieces across the bars (that fills 2 whole muffins plus 3 fifths of Muffin 3!).'
      ]
    },
    {
      index: 1,
      id: 'studio-paint-3-5',
      shortTitle: '2. Paint (3 ÷ 5)',
      title: 'Sharing Mural Paint',
      dividend: 3,
      divisor: 5,
      maxWholes: 2,
      maxParts: 10,
      wholeLabel: 'Liter',
      wholeLabelPlural: 'liters',
      recipientLabelPlural: 'poster boards',
      unitShort: 'liters / board',
      mixUnitShort: 'liters',
      promptHtml:
        '“Challenge 2: My art club is splitting <strong>3 liters</strong> of blue paint equally across <strong>5 poster boards</strong> (<code>3 ÷ 5</code>). Watch carefully where your dot lands compared to <strong>1 whole liter</strong>!”',
      hints: [
        'Hint 1 (Green Cuts): 5 poster boards share each liter equally, so cut each 1-liter bar into 5 equal fifths.',
        'Hint 2 (Blue Share): Shade 3 fifths (1/5 from each of the 3 liters). Notice whether the blue dot is to the left or right of 1!'
      ]
    },
    {
      index: 2,
      id: 'studio-granola-7-4',
      shortTitle: '3. Granola (7 ÷ 4)',
      title: 'Sharing Trail Granola',
      dividend: 7,
      divisor: 4,
      maxWholes: 2,
      maxParts: 10,
      wholeLabel: 'Bar',
      wholeLabelPlural: 'granola bars',
      recipientLabelPlural: 'hikers',
      unitShort: 'bars / hiker',
      mixUnitShort: 'bars',
      promptHtml:
        '“Challenge 3: <strong>4 hikers</strong> equally share <strong>7 trail-granola bars</strong> on a mountain hike (<code>7 ÷ 4</code>). Build one hiker’s fair share and write both the fraction and mixed number!”',
      hints: [
        'Hint 1 (Green Cuts): 4 hikers share each granola bar equally, so cut each 1-bar whole into 4 equal fourths.',
        'Hint 2 (Blue Share): Shade 7 fourth-size pieces (1 full bar of 4/4 plus 3 fourths of Bar 2).'
      ]
    }
  ];

  /* ------------------------------------------------------------------------
     2. Mutable Course State
     ------------------------------------------------------------------------ */

  function createInitialState() {
    return {
      activeLesson: 1,
      lxdDrawerOpen: false,

      lesson1: {
        flippedCards: {
          fraction: false,
          numerator: false,
          denominator: false,
          division: false
        },
        cookieState: 'initial', // 'initial' | 'shared'
        completed: false
      },

      lesson2: {
        activeStep: 1, // 1 | 2 | 3
        step1Choice: null,
        step1Verified: false,

        viewMode: 'both', // 'both' | 'bars' | 'line'
        partsPerWhole: 1,
        shadedParts: 0,
        hintLevel: 0,
        visualHighlight: null, // null | 'green-cuts' | 'blue-shares' | 'interval-0-1' | 'partial-bar-cuts'

        fracNum: '',
        fracDen: '',
        step2Verified: false,
        step2LastDiag: {
          status: 'idle',
          code: 'INITIAL',
          title: '',
          message:
            'Cut each 1-hour bar into equal daily parts (green), shade one day’s share (blue), and click Check!'
        },

        mixWhole: '',
        mixNum: '',
        mixDen: '',
        justification: null, // 'correct' | 'rem10' | 'lt1'
        step3Verified: false,
        step3LastDiag: {
          status: 'idle',
          code: 'INITIAL',
          title: '',
          message:
            'Look at your model on the left: count complete 1-hour bars and leftover pieces in Hour 2!'
        },

        ruePose: 'asking',
        rueSpeechHtml:
          '“Hi! This week I need to spend <strong>10 hours</strong> on chores spread evenly across <strong>1 week (7 days)</strong>. How should I set up this problem to find my <strong>hours per day</strong>?”'
      },

      lesson3: {
        activeChallengeIndex: 0,
        challenges: STUDIO_CHALLENGES.map((c) => ({
          viewMode: 'both',
          partsPerWhole: 1,
          shadedParts: 0,
          hintLevel: 0,
          visualHighlight: null,
          fracNum: '',
          fracDen: '',
          magnitude: null, // 'lt1' | 'gt1'
          mixWhole: '',
          mixNum: '',
          mixDen: '',
          verified: false,
          ruePose: 'talking',
          rueSpeechHtml: c.promptHtml,
          lastDiag: {
            status: 'idle',
            code: 'INITIAL',
            title: '',
            message:
              'Build the sharing model on the left, enter your fraction, and compare one share to 1 whole!'
          }
        }))
      },

      lastDiagnosticEvent: 'COURSE_READY'
    };
  }

  let state = createInitialState();

  /* Managed single audio element (Modality Principle: user-initiated only, never auto-plays) */
  const voiceAudio = typeof Audio !== 'undefined' ? new Audio() : null;
  let activeAudioBtnId = null;

  if (voiceAudio) {
    voiceAudio.addEventListener('ended', () => {
      activeAudioBtnId = null;
      syncAudioButtonsUI();
    });
  }

  /* ------------------------------------------------------------------------
     3. Deterministic Step-Level Misconception Diagnostic Functions
     ------------------------------------------------------------------------ */

  function parseOptionalInt(raw) {
    if (raw === '' || raw === null || raw === undefined) return null;
    const trimmed = String(raw).trim();
    if (!/^-?\d+$/.test(trimmed)) return NaN;
    return parseInt(trimmed, 10);
  }

  /**
   * Diagnoses Lesson 2 Step 2.2: Visual construction + symbolic fraction for 10 ÷ 7
   */
  function diagnoseLesson2Step2(snapshot) {
    const a = LESSON2_PROBLEM.dividend; // 10
    const b = LESSON2_PROBLEM.divisor; // 7
    const parts = snapshot.partsPerWhole;
    const shaded = snapshot.shadedParts;
    const num = parseOptionalInt(snapshot.fracNum);
    const den = parseOptionalInt(snapshot.fracDen);

    // 1. Untouched check
    if (parts === 1 && shaded === 0 && num === null && den === null) {
      return {
        status: 'coaching',
        code: 'EMPTY_SUBMISSION',
        ruePose: 'asking',
        highlight: 'green-cuts',
        title: 'Let’s Build Your Model First!',
        message:
          'Use the <strong>Green +</strong> button to cut each 1-hour bar into equal daily parts, then shade one day’s share in <strong>Blue</strong>.'
      };
    }

    // Invalid number sanity
    if (
      (num !== null && (Number.isNaN(num) || num < 0)) ||
      (den !== null && (Number.isNaN(den) || den <= 0))
    ) {
      return {
        status: 'coaching',
        code: 'INVALID_FRACTION_INPUT',
        ruePose: 'confused',
        highlight: null,
        title: 'Check Your Numbers',
        message:
          'Enter whole counting numbers in the fraction boxes (and make sure the green bottom denominator is at least 1).'
      };
    }

    // 2. Unit Omission: 1 week = 1 instead of 7 days (parts == 1 or den == 1)
    if (den === 1 || (parts === 1 && (shaded > 0 || num !== null))) {
      return {
        status: 'coaching',
        code: 'UNIT_OMISSION_WEEK_VS_DAYS',
        ruePose: 'thinking',
        highlight: 'green-cuts',
        title: 'Watch the Time Unit: 1 Week = 7 Days!',
        message:
          'Each bar is still <strong>1 uncut hour</strong> (denominator = 1)! Remember <strong>1 week has 7 days</strong>—cut each 1-hour bar into <strong>7</strong> equal daily parts.'
      };
    }

    // 3. Dividend/Divisor Inversion (7/10 on bars OR in fraction box)
    if ((parts === a && shaded === b) || (num === b && den === a)) {
      return {
        status: 'coaching',
        code: 'DIVIDEND_DIVISOR_INVERSION',
        ruePose: 'thinking',
        highlight: 'interval-0-1',
        title: 'Careful — Dividend & Divisor Swapped (7/10 vs. 10 ÷ 7)!',
        message:
          'Look at the highlighted <strong>0 to 1</strong> hour zone on the number line: cutting 1 hour into 10 parts gives <strong>7/10 of an hour</strong> (<em>less than 1 hour a day!</em>). Since we are sharing <strong>10 hours</strong> across <strong>7 days</strong>, each 1-hour bar needs <strong>7</strong> equal parts!'
      };
    }

    // 4. Single-Unit Confusion (1/7 instead of 10/7)
    if ((parts === b && shaded === 1) || (num === 1 && den === b && shaded <= 1)) {
      return {
        status: 'coaching',
        code: 'SINGLE_WHOLE_ONLY',
        ruePose: 'thinking',
        highlight: 'blue-shares',
        title: 'Great Start for 1 Hour — Now Share All 10 Hours!',
        message:
          'Shading <strong>1/7</strong> shows Monday’s share from just <strong>1 single hour</strong>. Since I have <strong>10 hours</strong> of chores, collect one seventh-piece for each of the 10 hours!'
      };
    }

    // 5. Partitioned by Dividend (10 parts per hour instead of 7)
    if (parts === a || den === a) {
      return {
        status: 'coaching',
        code: 'PARTITIONED_BY_DIVIDEND',
        ruePose: 'confused',
        highlight: 'green-cuts',
        title: 'Check How Many Parts Cut 1 Whole Hour',
        message:
          '<strong>10</strong> is the total hours being shared, not the number of days! Cut each 1-hour whole by the <strong>7 days</strong> sharing the work.'
      };
    }

    // 6. Remainder-only (3/7 instead of 10/7)
    if ((parts === b && shaded === a % b) || (num === a % b && den === b)) {
      return {
        status: 'coaching',
        code: 'REMAINDER_ONLY_AS_QUOTIENT',
        ruePose: 'thinking',
        highlight: 'blue-shares',
        title: 'Don’t Forget the Complete 1-Hour Bar!',
        message:
          '<strong>3/7</strong> is only the leftover part past 1 hour. Include the <strong>full first hour (7/7)</strong> plus the leftover pieces in one day’s total share!'
      };
    }

    // 7. Visual model still incomplete
    if (parts !== b) {
      return {
        status: 'coaching',
        code: 'VISUAL_WRONG_PARTITIONS',
        ruePose: 'asking',
        highlight: 'green-cuts',
        title: 'Adjust Your Green Hour Cuts',
        message: `Right now each 1-hour bar is cut into <strong>${parts}</strong> parts. Since <strong>7 days</strong> share each hour equally, cut each hour into <strong>7</strong> equal parts.`
      };
    }

    if (shaded !== a) {
      return {
        status: 'coaching',
        code: 'VISUAL_WRONG_SHADED_COUNT',
        ruePose: 'asking',
        highlight: 'blue-shares',
        title: 'Check Your Blue Shaded Pieces',
        message: `Nice <strong>7-part</strong> hour bars! You currently shaded <strong>${shaded}</strong> pieces. Sharing <strong>10 hours</strong> across 7 days gives one seventh from every hour—adjust your blue pieces!`
      };
    }

    // 8. Visual model is exact (parts === 7, shaded === 10). Now check symbolic fraction!
    if (num === null || den === null) {
      return {
        status: 'coaching',
        code: 'FRACTION_MISSING',
        ruePose: 'happy',
        highlight: null,
        title: 'Awesome Visual Model! Now Write the Fraction',
        message:
          'Your bars and number line show <strong>1 full hour (7/7)</strong> plus <strong>3 more sevenths</strong>! Type the <strong class="text-num-blue">Blue Numerator</strong> and <strong class="text-den-green">Green Denominator</strong> in the boxes above.'
      };
    }

    if (num !== a || den !== b) {
      return {
        status: 'coaching',
        code: 'VISUAL_SYMBOLIC_MISMATCH',
        ruePose: 'confused',
        highlight: null,
        title: 'Match Your Fraction Boxes to Your Model',
        message: `Your diagram has <strong>10 blue pieces</strong> shaded with <strong>7 green parts</strong> in 1 whole hour, which doesn’t match <strong>${num}/${den}</strong>! Put shaded pieces on top (Blue) and parts in 1 hour on bottom (Green).`
      };
    }

    // 9. Verified!
    return {
      status: 'verified',
      code: 'STEP_2_2_VERIFIED',
      ruePose: 'happy',
      highlight: null,
      title: '✓ Model & Fraction Verified: 10 ÷ 7 = 10/7 hours/day!',
      message:
        'Look how clearly your bars and number line agree: <strong>10 seventh-hour pieces</strong> fills <strong>1 whole hour</strong> plus <strong>3 sevenths</strong> of Hour 2! Let’s turn <code>10/7</code> into a Mixed Number next.'
    };
  }

  /**
   * Diagnoses Lesson 2 Step 2.3: Mixed Number (1 3/7) & Justification
   */
  function diagnoseLesson2Step3(snapshot) {
    const w = parseOptionalInt(snapshot.mixWhole);
    const n = parseOptionalInt(snapshot.mixNum);
    const d = parseOptionalInt(snapshot.mixDen);
    const just = snapshot.justification;

    if (w === null || n === null || d === null) {
      return {
        status: 'coaching',
        code: 'MIXED_FIELDS_MISSING',
        ruePose: 'asking',
        highlight: null,
        title: 'Fill In All Three Mixed-Number Boxes',
        message:
          'Enter the <strong>Whole Number</strong> of full hours, the <strong class="text-num-blue">Blue Numerator</strong> (leftover pieces), and the <strong class="text-den-green">Green Denominator</strong> (parts in 1 hour).'
      };
    }

    if (Number.isNaN(w) || Number.isNaN(n) || Number.isNaN(d) || w < 0 || n < 0 || d <= 0) {
      return {
        status: 'coaching',
        code: 'MIXED_INVALID_NUMBERS',
        ruePose: 'confused',
        highlight: null,
        title: 'Check Your Mixed Number Entries',
        message: 'Use whole numbers in all three boxes (with a denominator of at least 1).'
      };
    }

    if (w === 0) {
      return {
        status: 'coaching',
        code: 'MIXED_WHOLE_ZERO',
        ruePose: 'thinking',
        highlight: null,
        title: 'Check Whole Hours: We Passed 1 Full Hour!',
        message:
          '0 whole hours per day wouldn’t finish 10 hours in 7 days! Look at <strong>Hour 1</strong> on the left—how many complete 1-hour bars are completely filled?'
      };
    }

    // Corina's documented Remainder-Denominator Error: 1 3/10 instead of 1 3/7
    if (d === 10) {
      return {
        status: 'coaching',
        code: 'MIXED_DENOMINATOR_USED_DIVIDEND',
        ruePose: 'thinking',
        highlight: 'partial-bar-cuts',
        title: 'Look at Hour 2’s Green Cuts (Sevenths, Not Tenths!)',
        message:
          'You spotted the leftover pieces—great! Now look at <strong>Hour 2 glowing in green</strong> on the left: 1 hour is cut into <strong>7 equal parts</strong> (not 10 total hours). What should the green denominator be?'
      };
    }

    if (n >= d) {
      return {
        status: 'coaching',
        code: 'MIXED_REMAINDER_STILL_IMPROPER',
        ruePose: 'confused',
        highlight: null,
        title: 'Bundle Complete Wholes First',
        message: `Your fraction part (<strong>${n}/${d}</strong>) still has enough pieces to make another whole hour! Every 7 sevenths belongs in the Whole Number box.`
      };
    }

    if (w !== 1) {
      return {
        status: 'coaching',
        code: 'MIXED_WHOLE_INCORRECT',
        ruePose: 'thinking',
        highlight: null,
        title: 'Check Where the Dot Lands on the Number Line',
        message: `Our blue dot at <code>10/7</code> sits between <strong>1</strong> and <strong>2</strong>, so we have <strong>1</strong> complete whole hour (not ${w}).`
      };
    }

    if (d !== 7) {
      return {
        status: 'coaching',
        code: 'MIXED_DENOMINATOR_INCORRECT',
        ruePose: 'thinking',
        highlight: 'partial-bar-cuts',
        title: 'Check the Green Denominator',
        message:
          'Count the equal parts inside <strong>Hour 2</strong> on the left—each 1-hour bar is split into <strong>7</strong> equal parts.'
      };
    }

    if (n !== 3) {
      return {
        status: 'coaching',
        code: 'MIXED_NUMERATOR_INCORRECT',
        ruePose: 'thinking',
        highlight: 'partial-bar-cuts',
        title: 'Count the Leftover Blue Pieces in Hour 2',
        message:
          'After 7 pieces fill Hour 1, count how many bright <strong>blue</strong> pieces are shaded inside <strong>Hour 2</strong>!'
      };
    }

    // Mixed number 1 3/7 is exact! Now check conceptual justification:
    if (!just) {
      return {
        status: 'coaching',
        code: 'JUSTIFICATION_MISSING',
        ruePose: 'happy',
        highlight: null,
        title: '1 3/7 Is Spot On! Now Pick Why It Makes Sense',
        message: 'Select explanation <strong>A</strong>, <strong>B</strong>, or <strong>C</strong> above and click Check!'
      };
    }

    if (just === 'rem10') {
      return {
        status: 'coaching',
        code: 'JUSTIFICATION_DISTRACTOR_REM10',
        ruePose: 'thinking',
        highlight: 'partial-bar-cuts',
        title: 'Check the Fractional Unit in Your Explanation',
        message:
          'Your mixed number <strong>1 3/7</strong> is right! Notice Choice B says <em>“3 tenths”</em>—but each leftover piece in Hour 2 is <strong>1 seventh</strong> of an hour, not 1 tenth.'
      };
    }

    if (just === 'lt1') {
      return {
        status: 'coaching',
        code: 'JUSTIFICATION_DISTRACTOR_LT1',
        ruePose: 'thinking',
        highlight: null,
        title: 'Compare 1 3/7 Hours to 1 Hour',
        message:
          'Your mixed number <strong>1 3/7</strong> is right—and since it includes <strong>1 full hour</strong> plus 3/7 more, each day is <em>more</em> than 1 hour, not less!'
      };
    }

    return {
      status: 'verified',
      code: 'STEP_2_3_VERIFIED',
      ruePose: 'happy',
      highlight: null,
      title: '🎉 You Helped Rue Solve It! 10 ÷ 7 = 10/7 = 1 3/7 hours/day',
      message:
        'Every day I’ll do <strong>1 full hour</strong> plus <strong>3/7 of an hour</strong> of chores—across 7 days that finishes all 10 hours! Ready for 3 quick challenges in the Equal-Sharing Studio?'
    };
  }

  /**
   * Diagnoses Lesson 3 Studio Challenges (Muffins 13÷5, Paint 3÷5 <1 contrast, Granola 7÷4)
   */
  function diagnoseStudioChallenge(challenge, snapshot) {
    const a = challenge.dividend;
    const b = challenge.divisor;
    const isProperContrast = a < b; // True on Challenge 2 (3 ÷ 5 = 3/5 < 1)
    const targetWhole = Math.floor(a / b);
    const targetRem = a % b;

    const parts = snapshot.partsPerWhole;
    const shaded = snapshot.shadedParts;
    const num = parseOptionalInt(snapshot.fracNum);
    const den = parseOptionalInt(snapshot.fracDen);
    const mag = snapshot.magnitude;
    const w = parseOptionalInt(snapshot.mixWhole);
    const mn = parseOptionalInt(snapshot.mixNum);
    const md = parseOptionalInt(snapshot.mixDen);

    // 1. Untouched state
    if (parts === 1 && shaded === 0 && num === null && den === null && !mag) {
      return {
        status: 'coaching',
        code: 'EMPTY_SUBMISSION',
        ruePose: 'asking',
        highlight: 'green-cuts',
        title: 'Start by Cutting & Shading on the Left!',
        message: `Cut each 1-${challenge.wholeLabel.toLowerCase()} bar into equal parts for the <strong>${b} ${challenge.recipientLabelPlural}</strong>, then shade one fair share.`
      };
    }

    if (
      (num !== null && (Number.isNaN(num) || num < 0)) ||
      (den !== null && (Number.isNaN(den) || den <= 0))
    ) {
      return {
        status: 'coaching',
        code: 'INVALID_FRACTION_INPUT',
        ruePose: 'confused',
        highlight: null,
        title: 'Check Your Fraction Numbers',
        message: 'Enter whole numbers in the Numerator and Denominator boxes (denominator ≥ 1).'
      };
    }

    // 2. Dividend / Divisor Inversion (b/a: 5/13, 5/3, 4/7)
    if ((parts === a && shaded === b) || (num === b && den === a)) {
      return {
        status: 'coaching',
        code: 'DIVIDEND_DIVISOR_INVERSION',
        ruePose: 'thinking',
        highlight: 'interval-0-1',
        title: `Careful — Swapped ${a} and ${b} (${b}/${a} vs. ${a} ÷ ${b})!`,
        message: isProperContrast
          ? `<strong>${b}/${a}</strong> is <em>more than 1 whole ${challenge.wholeLabel.toLowerCase()}</em> per board—5 boards would need over 8 ${challenge.wholeLabelPlural}! Since we only have <strong>${a} ${challenge.wholeLabelPlural}</strong> shared across <strong>${b} ${challenge.recipientLabelPlural}</strong>, cut each whole into <strong>${b}</strong> equal parts.`
          : `<strong>${b}/${a}</strong> is <em>less than 1 whole</em> (see the 0–1 interval!), which happens if ${a} ${challenge.recipientLabelPlural} shared ${b} ${challenge.wholeLabelPlural}. Here <strong>${b} ${challenge.recipientLabelPlural}</strong> share <strong>${a} ${challenge.wholeLabelPlural}</strong>—so cut each whole into <strong>${b}</strong> parts!`
      };
    }

    // 3. Single-whole share only (1/b instead of a/b)
    if ((parts === b && shaded === 1) || (num === 1 && den === b && shaded <= 1)) {
      return {
        status: 'coaching',
        code: 'SINGLE_WHOLE_ONLY',
        ruePose: 'thinking',
        highlight: 'blue-shares',
        title: `That’s the Share from 1 ${challenge.wholeLabel} — Now Share All ${a}!`,
        message: `<strong>1/${b}</strong> comes from splitting 1 ${challenge.wholeLabel.toLowerCase()}. Collect <code>1/${b}</code> from each of the <strong>${a} ${challenge.wholeLabelPlural}</strong>!`
      };
    }

    // 4. Partitioned by dividend
    if (parts === a || den === a) {
      return {
        status: 'coaching',
        code: 'PARTITIONED_BY_DIVIDEND',
        ruePose: 'confused',
        highlight: 'green-cuts',
        title: 'Check Your Green Partition Cuts',
        message: `<strong>${a}</strong> is the number of ${challenge.wholeLabelPlural} being shared! Cut each 1-${challenge.wholeLabel.toLowerCase()} bar by the <strong>${b} ${challenge.recipientLabelPlural}</strong>.`
      };
    }

    // 5. Remainder only on improper fractions (e.g. 3/5 instead of 13/5, or 3/4 instead of 7/4)
    if (!isProperContrast && ((parts === b && shaded === targetRem) || (num === targetRem && den === b))) {
      return {
        status: 'coaching',
        code: 'REMAINDER_ONLY_AS_QUOTIENT',
        ruePose: 'thinking',
        highlight: 'blue-shares',
        title: 'Include the Complete Wholes Too!',
        message: `<strong>${targetRem}/${b}</strong> is only the leftover part! Make sure your model and fraction include all complete wholes plus the leftover pieces.`
      };
    }

    // 6. Visual model checks
    if (parts !== b) {
      return {
        status: 'coaching',
        code: 'VISUAL_WRONG_PARTITIONS',
        ruePose: 'asking',
        highlight: 'green-cuts',
        title: 'Adjust Your Green Equal Parts',
        message: `Since <strong>${b} ${challenge.recipientLabelPlural}</strong> share equally, cut each 1-${challenge.wholeLabel.toLowerCase()} bar into <strong>${b}</strong> equal parts.`
      };
    }

    if (shaded !== a) {
      return {
        status: 'coaching',
        code: 'VISUAL_WRONG_SHADED_COUNT',
        ruePose: 'asking',
        highlight: 'blue-shares',
        title: 'Check How Many Blue Pieces Are Shaded',
        message: `Each whole is cut into <strong>${b}</strong> parts. Sharing <strong>${a} ${challenge.wholeLabelPlural}</strong> gives 1 piece from each whole—check your blue piece count!`
      };
    }

    // 7. Symbolic fraction check
    if (num === null || den === null) {
      return {
        status: 'coaching',
        code: 'FRACTION_MISSING',
        ruePose: 'happy',
        highlight: null,
        title: 'Great Model! Now Fill In Step 1 Fraction',
        message: 'Type your Blue Numerator and Green Denominator in Step 1 on the right.'
      };
    }

    if (num !== a || den !== b) {
      return {
        status: 'coaching',
        code: 'VISUAL_SYMBOLIC_MISMATCH',
        ruePose: 'confused',
        highlight: null,
        title: 'Match Your Written Fraction to Your Model',
        message: `Your diagram shows <strong>${a}</strong> blue pieces with <strong>${b}</strong> green parts per whole, which doesn’t match <strong>${num}/${den}</strong>.`
      };
    }

    // 8. LO2 Magnitude check (< 1 vs > 1)
    if (!mag) {
      return {
        status: 'coaching',
        code: 'MAGNITUDE_MISSING',
        ruePose: 'asking',
        highlight: isProperContrast ? 'interval-0-1' : null,
        title: 'Step 2: Compare 1 Share to 1 Whole!',
        message:
          'Look at where your blue dot lands on the number line: is one share <strong>Less than 1 whole</strong> or <strong>More than 1 whole</strong>?'
      };
    }

    if (isProperContrast && mag === 'gt1') {
      return {
        status: 'coaching',
        code: 'MAGNITUDE_OVERGENERALIZED_GT1',
        ruePose: 'thinking',
        highlight: 'interval-0-1',
        title: 'Look Closely at the 0 to 1 Zone on Your Number Line!',
        message:
          'When <strong>3 liters</strong> are shared across <strong>5 poster boards</strong>, your blue dot at <code>3/5</code> stops <strong>before 1 whole liter</strong>! Not every division problem makes a mixed number—choose <strong>Less than 1 whole</strong>.'
      };
    }

    if (!isProperContrast && mag === 'lt1') {
      return {
        status: 'coaching',
        code: 'MAGNITUDE_INCORRECT_FOR_IMPROPER',
        ruePose: 'thinking',
        highlight: null,
        title: 'Look Past the 1 Mark on Your Number Line!',
        message: `Your shaded bars fill ${targetWhole} complete whole${targetWhole > 1 ? 's' : ''} and go past <strong>1</strong> on the number line! Choose <strong>More than 1 whole</strong> and write the Mixed Number.`
      };
    }

    // 9. LO3 Mixed Number check (only when a > b)
    if (!isProperContrast) {
      if (w === null || mn === null || md === null) {
        return {
          status: 'coaching',
          code: 'MIXED_FIELDS_MISSING',
          ruePose: 'asking',
          highlight: null,
          title: 'Step 3: Write Your Mixed Number',
          message:
            'Count the complete whole bars on the left, then write the leftover blue pieces over the green parts in 1 whole.'
        };
      }

      if (Number.isNaN(w) || Number.isNaN(mn) || Number.isNaN(md) || w < 0 || mn < 0 || md <= 0) {
        return {
          status: 'coaching',
          code: 'MIXED_INVALID_NUMBERS',
          ruePose: 'confused',
          highlight: null,
          title: 'Check Mixed Number Boxes',
          message: 'Use whole numbers in all three mixed-number boxes.'
        };
      }

      if (md === a) {
        return {
          status: 'coaching',
          code: 'MIXED_DENOMINATOR_USED_DIVIDEND',
          ruePose: 'thinking',
          highlight: 'partial-bar-cuts',
          title: `Look at the Partial ${challenge.wholeLabel}’s Green Cuts!`,
          message: `You found the wholes and leftover pieces—nice! Look at the partially shaded bar glowing in <strong>green</strong>: 1 whole is cut into <strong>${b} equal parts</strong> (not ${a}).`
        };
      }

      if (mn >= md) {
        return {
          status: 'coaching',
          code: 'MIXED_REMAINDER_STILL_IMPROPER',
          ruePose: 'confused',
          highlight: null,
          title: 'Group Every Complete Whole!',
          message: `Your fraction part (<strong>${mn}/${md}</strong>) is still ≥ 1 whole. Bundle complete wholes into the Whole Number box!`
        };
      }

      if (w !== targetWhole) {
        return {
          status: 'coaching',
          code: 'MIXED_WHOLE_INCORRECT',
          ruePose: 'thinking',
          highlight: null,
          title: 'Count Complete Whole Bars',
          message: `Count how many bars have a gold <strong>✓ 1 Whole</strong> badge on the left (your dot sits between ${targetWhole} and ${targetWhole + 1}).`
        };
      }

      if (md !== b) {
        return {
          status: 'coaching',
          code: 'MIXED_DENOMINATOR_INCORRECT',
          ruePose: 'thinking',
          highlight: 'partial-bar-cuts',
          title: 'Check the Green Denominator',
          message: `Each 1-${challenge.wholeLabel.toLowerCase()} whole is cut into <strong>${b}</strong> equal parts.`
        };
      }

      if (mn !== targetRem) {
        return {
          status: 'coaching',
          code: 'MIXED_NUMERATOR_INCORRECT',
          ruePose: 'thinking',
          highlight: 'partial-bar-cuts',
          title: 'Count Leftover Blue Pieces',
          message: `Count how many bright <strong>blue</strong> pieces are shaded inside ${challenge.wholeLabel} ${targetWhole + 1} past ${targetWhole} whole${targetWhole > 1 ? 's' : ''}!`
        };
      }
    }

    // 10. Challenge Verified!
    return {
      status: 'verified',
      code: 'CHALLENGE_VERIFIED',
      ruePose: 'happy',
      highlight: isProperContrast ? 'interval-0-1' : null,
      title: isProperContrast
        ? `✓ Challenge Solved: ${a} ÷ ${b} = ${a}/${b} ${challenge.unitShort} (< 1 whole)!`
        : `✓ Challenge Solved: ${a} ÷ ${b} = ${a}/${b} = ${targetWhole} ${targetRem}/${b} ${challenge.unitShort}!`,
      message: isProperContrast
        ? `Sharp eye! Because 3 liters are shared among 5 poster boards, each board gets <strong>3/5 of a liter</strong>—staying inside <code>0</code> to <code>1</code> with zero whole liters!`
        : `Awesome! Each share gets <strong>${targetWhole} whole ${targetWhole === 1 ? challenge.wholeLabel.toLowerCase() : challenge.wholeLabelPlural}</strong> plus <strong>${targetRem}/${b}</strong> more.`
    };
  }

  /* ------------------------------------------------------------------------
     4. Shared Visual Manipulative Renderer (Aligned Bars + SVG Number Line)
     ------------------------------------------------------------------------ */

  function renderAlignedFractionBars(containerEl, opts) {
    const {
      prefix,
      maxWholes,
      partsPerWhole,
      shadedParts,
      wholeLabel,
      locked,
      visualHighlight,
      onSliceClick
    } = opts;

    containerEl.style.gridTemplateColumns = `repeat(${maxWholes}, 1fr)`;
    containerEl.innerHTML = '';

    const fullWholesCount = Math.floor(shadedParts / partsPerWhole);

    for (let w = 1; w <= maxWholes; w++) {
      const unitDiv = document.createElement('div');
      unitDiv.className = 'whole-bar-unit';

      const startIdx = (w - 1) * partsPerWhole + 1;
      const endIdx = w * partsPerWhole;
      const isCompleteWhole = shadedParts >= endIdx;
      const isPartialBar = w === fullWholesCount + 1 && shadedParts % partsPerWhole > 0;

      // Top header above each 1-whole bar
      const headerDiv = document.createElement('div');
      headerDiv.className = 'whole-bar-header';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'whole-bar-name';
      nameSpan.textContent = `${wholeLabel} ${w}`;
      headerDiv.appendChild(nameSpan);

      if (isCompleteWhole) {
        const badge = document.createElement('span');
        badge.className = 'whole-complete-badge';
        badge.textContent = `✓ 1 Whole (${partsPerWhole}/${partsPerWhole})`;
        headerDiv.appendChild(badge);
      }
      unitDiv.appendChild(headerDiv);

      // Bar track
      const trackDiv = document.createElement('div');
      trackDiv.className = 'whole-bar-track';
      if (isCompleteWhole) trackDiv.classList.add('is-complete-whole');
      if (
        visualHighlight === 'green-cuts' ||
        (visualHighlight === 'partial-bar-cuts' && (isPartialBar || w === 2))
      ) {
        trackDiv.classList.add('highlight-green-cuts');
      }

      for (let p = 1; p <= partsPerWhole; p++) {
        const globalSliceIndex = startIdx + p - 1;
        const isShaded = globalSliceIndex <= shadedParts;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = `${prefix}-bar-w${w}-p${p}`;
        btn.className = 'bar-slice-btn';
        if (isShaded) {
          btn.classList.add(isCompleteWhole ? 'is-shaded-whole' : 'is-shaded-partial');
        }
        btn.disabled = Boolean(locked);
        btn.setAttribute(
          'aria-label',
          `${wholeLabel} ${w}, piece ${p} of ${partsPerWhole}${isShaded ? ' (shaded)' : ''}`
        );

        if (!locked && onSliceClick) {
          btn.addEventListener('click', () => {
            const nextShaded =
              shadedParts === globalSliceIndex ? globalSliceIndex - 1 : globalSliceIndex;
            onSliceClick(nextShaded);
          });
        }

        trackDiv.appendChild(btn);
      }

      unitDiv.appendChild(trackDiv);
      containerEl.appendChild(unitDiv);
    }
  }

  function renderAlignedNumberLineSVG(svgEl, opts) {
    const {
      maxWholes,
      partsPerWhole,
      shadedParts,
      locked,
      visualHighlight,
      onValueChange
    } = opts;

    const svgNS = 'http://www.w3.org/2000/svg';
    const width = 520;
    const xStart = 2;
    const xEnd = 518;
    const span = xEnd - xStart;
    const axisY = 60;
    const totalSubdivisions = maxWholes * partsPerWhole;

    svgEl.innerHTML = '';

    const xForStep = (step) => xStart + (step / totalSubdivisions) * span;
    const xForWhole = (w) => xStart + (w / maxWholes) * span;

    // Optional Signaling Zone on [0, 1] for Inversion / Proper-Fraction Contrast
    if (visualHighlight === 'interval-0-1') {
      const x0 = xForWhole(0);
      const x1 = xForWhole(1);
      const zoneRect = document.createElementNS(svgNS, 'rect');
      zoneRect.setAttribute('x', x0);
      zoneRect.setAttribute('y', 16);
      zoneRect.setAttribute('width', x1 - x0);
      zoneRect.setAttribute('height', 72);
      zoneRect.setAttribute('rx', '6');
      zoneRect.setAttribute('fill', 'rgba(245, 158, 11, 0.14)');
      zoneRect.setAttribute('stroke', '#F59E0B');
      zoneRect.setAttribute('stroke-width', '1.5');
      zoneRect.setAttribute('stroke-dasharray', '4 3');
      svgEl.appendChild(zoneRect);

      const zoneLabel = document.createElementNS(svgNS, 'text');
      zoneLabel.setAttribute('x', (x0 + x1) / 2);
      zoneLabel.setAttribute('y', 105);
      zoneLabel.setAttribute('text-anchor', 'middle');
      zoneLabel.setAttribute('fill', '#B45309');
      zoneLabel.setAttribute('font-family', 'Lato, sans-serif');
      zoneLabel.setAttribute('font-size', '11');
      zoneLabel.setAttribute('font-weight', '900');
      zoneLabel.textContent = '0 to 1 Whole (< 1)';
      svgEl.appendChild(zoneLabel);
    }

    // Subtle vertical alignment connectors from Fraction Bars down to Integer Ticks
    for (let w = 0; w <= maxWholes; w++) {
      const xw = xForWhole(w);
      const guide = document.createElementNS(svgNS, 'line');
      guide.setAttribute('x1', xw);
      guide.setAttribute('y1', 2);
      guide.setAttribute('x2', xw);
      guide.setAttribute('y2', axisY - 12);
      guide.setAttribute('stroke', '#CBD5E1');
      guide.setAttribute('stroke-width', '1.2');
      guide.setAttribute('stroke-dasharray', '3 3');
      svgEl.appendChild(guide);
    }

    // Main Axis Track
    const baseLine = document.createElementNS(svgNS, 'line');
    baseLine.setAttribute('x1', xStart);
    baseLine.setAttribute('y1', axisY);
    baseLine.setAttribute('x2', xEnd);
    baseLine.setAttribute('y2', axisY);
    baseLine.setAttribute('stroke', '#475569');
    baseLine.setAttribute('stroke-width', '2.5');
    svgEl.appendChild(baseLine);

    // Blue highlighted segment from 0 to shadedParts
    if (shadedParts > 0) {
      const activeLine = document.createElementNS(svgNS, 'line');
      activeLine.setAttribute('x1', xStart);
      activeLine.setAttribute('y1', axisY);
      activeLine.setAttribute('x2', xForStep(shadedParts));
      activeLine.setAttribute('y2', axisY);
      activeLine.setAttribute('stroke', '#2563EB');
      activeLine.setAttribute('stroke-width', '4.5');
      svgEl.appendChild(activeLine);
    }

    // Blue Jump Arcs for each shaded piece
    for (let s = 0; s < shadedParts; s++) {
      const x1 = xForStep(s);
      const x2 = xForStep(s + 1);
      const xm = (x1 + x2) / 2;
      const arcHeight = Math.min(20, Math.max(9, (x2 - x1) * 0.42));
      const arc = document.createElementNS(svgNS, 'path');
      arc.setAttribute('d', `M ${x1} ${axisY} Q ${xm} ${axisY - arcHeight} ${x2} ${axisY}`);
      arc.setAttribute('fill', 'none');
      arc.setAttribute(
        'stroke',
        visualHighlight === 'blue-shares' ? '#1D4ED8' : 'rgba(37, 99, 235, 0.78)'
      );
      arc.setAttribute('stroke-width', visualHighlight === 'blue-shares' ? '2.6' : '1.8');
      svgEl.appendChild(arc);
    }

    // Green 1/b Subdivision Ticks & Bold Whole Integer Ticks
    const glowGreen =
      visualHighlight === 'green-cuts' || visualHighlight === 'partial-bar-cuts';

    for (let s = 0; s <= totalSubdivisions; s++) {
      const x = xForStep(s);
      const isWholeTick = s % partsPerWhole === 0;
      const tick = document.createElementNS(svgNS, 'line');
      tick.setAttribute('x1', x);
      tick.setAttribute('x2', x);

      if (isWholeTick) {
        tick.setAttribute('y1', axisY - 11);
        tick.setAttribute('y2', axisY + 11);
        tick.setAttribute('stroke', '#1E325C');
        tick.setAttribute('stroke-width', '2.8');
      } else {
        tick.setAttribute('y1', axisY - 7);
        tick.setAttribute('y2', axisY + 7);
        tick.setAttribute('stroke', '#2E8B57');
        tick.setAttribute('stroke-width', glowGreen ? '2.8' : '1.8');
      }
      svgEl.appendChild(tick);

      if (isWholeTick) {
        const wNum = s / partsPerWhole;
        const lbl = document.createElementNS(svgNS, 'text');
        lbl.setAttribute('x', x);
        lbl.setAttribute('y', axisY + 28);
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('fill', '#1E325C');
        lbl.setAttribute('font-family', 'Lato, sans-serif');
        lbl.setAttribute('font-size', '14');
        lbl.setAttribute('font-weight', '900');
        lbl.textContent = String(wNum);
        svgEl.appendChild(lbl);
      }
    }

    // Draggable Blue Dot + Anti-Spoiler Piece Count Pill
    const dotX = xForStep(shadedParts);

    if (shadedParts > 0 || visualHighlight === 'blue-shares') {
      const pillW = 74;
      const clampedPillX = Math.min(width - pillW / 2 - 2, Math.max(pillW / 2 + 2, dotX));
      const pill = document.createElementNS(svgNS, 'rect');
      pill.setAttribute('x', clampedPillX - pillW / 2);
      pill.setAttribute('y', 8);
      pill.setAttribute('width', pillW);
      pill.setAttribute('height', 21);
      pill.setAttribute('rx', '10.5');
      pill.setAttribute('fill', '#2563EB');
      svgEl.appendChild(pill);

      const pillText = document.createElementNS(svgNS, 'text');
      pillText.setAttribute('x', clampedPillX);
      pillText.setAttribute('y', 22);
      pillText.setAttribute('text-anchor', 'middle');
      pillText.setAttribute('fill', '#FFFFFF');
      pillText.setAttribute('font-family', 'Lato, sans-serif');
      pillText.setAttribute('font-size', '11');
      pillText.setAttribute('font-weight', '900');
      pillText.textContent = `${shadedParts} ${shadedParts === 1 ? 'piece' : 'pieces'}`;
      svgEl.appendChild(pillText);
    }

    const handle = document.createElementNS(svgNS, 'circle');
    handle.setAttribute('cx', dotX);
    handle.setAttribute('cy', axisY);
    handle.setAttribute('r', locked ? '7.5' : '9');
    handle.setAttribute('fill', '#2563EB');
    handle.setAttribute('stroke', '#FFFFFF');
    handle.setAttribute('stroke-width', '3');
    svgEl.appendChild(handle);

    // Interactive pointer click/drag snapping
    svgEl.onpointerdown = null;
    if (!locked && onValueChange) {
      const snapFromClientX = (clientX) => {
        const rect = svgEl.getBoundingClientRect();
        if (!rect.width) return;
        const svgX = ((clientX - rect.left) / rect.width) * width;
        const ratio = Math.max(0, Math.min(1, (svgX - xStart) / span));
        const snapped = Math.round(ratio * totalSubdivisions);
        onValueChange(snapped);
      };

      svgEl.onpointerdown = (ev) => {
        ev.preventDefault();
        if (svgEl.setPointerCapture) {
          try {
            svgEl.setPointerCapture(ev.pointerId);
          } catch (_) {
            /* ignore synthetic event capture errors */
          }
        }
        snapFromClientX(ev.clientX);

        const onMove = (moveEv) => snapFromClientX(moveEv.clientX);
        const onUp = () => {
          svgEl.removeEventListener('pointermove', onMove);
          svgEl.removeEventListener('pointerup', onUp);
          svgEl.removeEventListener('pointercancel', onUp);
        };

        svgEl.addEventListener('pointermove', onMove);
        svgEl.addEventListener('pointerup', onUp);
        svgEl.addEventListener('pointercancel', onUp);
      };
    }
  }

  function formatPhysicalReadout(partsPerWhole, shadedParts, wholeSingular) {
    if (partsPerWhole === 1) {
      return `${shadedParts} uncut ${wholeSingular.toLowerCase()}${shadedParts === 1 ? '' : 's'} shaded · 1 part per whole`;
    }
    const full = Math.floor(shadedParts / partsPerWhole);
    const rem = shadedParts % partsPerWhole;
    return `${shadedParts} blue piece${shadedParts === 1 ? '' : 's'} (${full} full + ${rem} left) · ${partsPerWhole} green parts/whole`;
  }

  /* ------------------------------------------------------------------------
     5. Rise Progress Rings & Sidebar Synchronization
     ------------------------------------------------------------------------ */

  function getLessonProgressRatio(lessonNum) {
    if (lessonNum === 1) {
      if (state.lesson1.completed) return 1;
      const anyFlipped = Object.values(state.lesson1.flippedCards).some(Boolean);
      const cookieUsed = state.lesson1.cookieState === 'shared';
      return anyFlipped || cookieUsed ? 0.5 : 0;
    }
    if (lessonNum === 2) {
      let done = 0;
      if (state.lesson2.step1Verified) done += 1;
      if (state.lesson2.step2Verified) done += 1;
      if (state.lesson2.step3Verified) done += 1;
      return done / 3;
    }
    if (lessonNum === 3) {
      const solved = state.lesson3.challenges.filter((c) => c.verified).length;
      return solved / STUDIO_CHALLENGES.length;
    }
    return 0;
  }

  function renderRiseRingSVG(svgEl, ratio) {
    if (!svgEl) return;
    if (ratio >= 0.999) {
      svgEl.innerHTML = `
        <circle cx="12" cy="12" r="10" fill="#FF631E" />
        <path d="M7.5 12.3 L10.6 15.4 L16.8 9.0" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      `;
    } else if (ratio > 0) {
      const r = 9.5;
      const circ = 2 * Math.PI * r;
      const offset = circ * (1 - ratio);
      svgEl.innerHTML = `
        <circle cx="12" cy="12" r="${r}" fill="none" stroke="#CBD5E1" stroke-width="2.2" />
        <circle cx="12" cy="12" r="${r}" fill="none" stroke="#FF631E" stroke-width="2.5"
          stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
          transform="rotate(-90 12 12)" stroke-linecap="round" />
      `;
    } else {
      svgEl.innerHTML = `
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="#CBD5E1" stroke-width="2.2" />
      `;
    }
  }

  function renderSidebarAndProgress() {
    const r1 = getLessonProgressRatio(1);
    const r2 = getLessonProgressRatio(2);
    const r3 = getLessonProgressRatio(3);
    const overallPct = Math.round(((r1 + r2 + r3) / 3) * 100);

    renderRiseRingSVG(document.getElementById('ring-lesson-1'), r1);
    renderRiseRingSVG(document.getElementById('ring-lesson-2'), r2);
    renderRiseRingSVG(document.getElementById('ring-lesson-3'), r3);

    const fillEl = document.getElementById('course-progress-fill');
    const lblEl = document.getElementById('course-progress-label');
    const mobPill = document.getElementById('mobile-progress-pill');
    if (fillEl) fillEl.style.width = `${overallPct}%`;
    if (lblEl) lblEl.textContent = `${overallPct}% COMPLETE`;
    if (mobPill) mobPill.textContent = `${overallPct}%`;

    [1, 2, 3].forEach((n) => {
      const navBtn = document.getElementById(`nav-lesson-${n}`);
      const sec = document.getElementById(`lesson-${n}`);
      const isActive = state.activeLesson === n;
      if (navBtn) {
        navBtn.classList.toggle('is-active', isActive);
        navBtn.setAttribute('aria-current', isActive ? 'page' : 'false');
      }
      if (sec) {
        sec.classList.toggle('is-active', isActive);
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. Lesson 1 Rendering & Audio Modality Controls
     ------------------------------------------------------------------------ */

  function syncAudioButtonsUI() {
    const btns = document.querySelectorAll('.audio-listen-btn');
    btns.forEach((btn) => {
      const isPlaying = btn.id === activeAudioBtnId && voiceAudio && !voiceAudio.paused;
      btn.classList.toggle('is-playing', isPlaying);
      btn.textContent = isPlaying ? '⏹ Stop Audio' : '🔊 Listen';
    });
  }

  function renderLesson1() {
    ['fraction', 'numerator', 'denominator', 'division'].forEach((key) => {
      const card = document.getElementById(`vocab-card-${key}`);
      const trigger = document.getElementById(`flip-btn-${key}`);
      const flipped = state.lesson1.flippedCards[key];
      if (card) card.classList.toggle('is-flipped', flipped);
      if (trigger) trigger.setAttribute('aria-expanded', String(flipped));
    });

    const cookieBox = document.getElementById('cookie-visual-box');
    const cookieBtn = document.getElementById('cookie-deal-btn');
    const cookieRes = document.getElementById('cookie-equation-result');
    const shared = state.lesson1.cookieState === 'shared';

    if (cookieBox) {
      cookieBox.classList.toggle('state-shared', shared);
    }
    if (cookieBtn) {
      cookieBtn.textContent = shared
        ? '↺ Reset Cookie Diagram'
        : '✨ Highlight 1 Friend’s Fair Share (3 ÷ 4)';
    }
    if (cookieRes) {
      cookieRes.classList.toggle('is-revealed', shared);
      cookieRes.innerHTML = shared
        ? `<strong>Fair Share Collected!</strong> Taking <span class="text-num-blue">1 fourth</span> from each of the 3 cookies gives:
           <span style="margin-left:6px; font-weight:900;">3 ÷ 4 =</span>
           <span class="inline-frac"><span class="inline-frac-num">3</span><span class="inline-frac-den">4</span></span>
           <strong>of a cookie</strong> (less than 1 whole cookie!).`
        : 'Click the button above (or tap the cookies!) to take <strong>1 fourth</strong> from each of the 3 cookies.';
    }
  }

  /* ------------------------------------------------------------------------
     7. Lesson 2 Rendering (Scenario — Help Rue Out!)
     ------------------------------------------------------------------------ */

  function renderDiagnosticBox(el, diag) {
    if (!el || !diag) return;
    el.classList.remove('is-coaching', 'is-verified');
    if (diag.status === 'coaching') el.classList.add('is-coaching');
    if (diag.status === 'verified') el.classList.add('is-verified');

    if (diag.title) {
      el.innerHTML = `<div class="diag-title">${diag.title}</div><div>${diag.message}</div>`;
    } else {
      el.innerHTML = diag.message;
    }
  }

  function renderLesson2() {
    const l2 = state.lesson2;

    // Step pills
    [1, 2, 3].forEach((s) => {
      const pill = document.getElementById(`l2-step-pill-${s}`);
      if (!pill) return;
      const isDone =
        (s === 1 && l2.step1Verified) ||
        (s === 2 && l2.step2Verified) ||
        (s === 3 && l2.step3Verified);
      pill.classList.toggle('is-active', l2.activeStep === s);
      pill.classList.toggle('is-done', isDone);
      // Allow learners to step forward once prior step is verified, or instructor jump unlocked
      if (s === 2) pill.disabled = !l2.step1Verified && l2.activeStep < 2;
      if (s === 3) pill.disabled = !l2.step2Verified && l2.activeStep < 3;
    });

    // Rue Scenario Banner
    const rueImg = document.getElementById('l2-rue-img');
    const rueSpeech = document.getElementById('l2-rue-speech');
    if (rueImg) rueImg.src = RUE_POSES[l2.ruePose] || RUE_POSES.asking;
    if (rueSpeech) rueSpeech.innerHTML = l2.rueSpeechHtml;

    const step1View = document.getElementById('l2-step-1-view');
    const splitWorkspace = document.getElementById('l2-split-workspace');

    if (l2.activeStep === 1) {
      step1View.hidden = false;
      splitWorkspace.hidden = true;

      ['mult', 'add', 'unit1', 'correct'].forEach((c) => {
        const btn = document.getElementById(`l2-choice-${c}`);
        if (!btn) return;
        btn.classList.remove('is-selected-wrong', 'is-selected-correct');
        if (l2.step1Choice === c) {
          btn.classList.add(c === 'correct' ? 'is-selected-correct' : 'is-selected-wrong');
        }
      });

      document.getElementById('l2-step1-next-wrap').hidden = !l2.step1Verified;
      return;
    }

    // Step 2 or Step 3: Side-by-side Single-Viewport Workspace
    step1View.hidden = true;
    splitWorkspace.hidden = false;

    const isStep3Locked = l2.activeStep === 3;
    const displayParts = isStep3Locked ? LESSON2_PROBLEM.divisor : l2.partsPerWhole;
    const displayShaded = isStep3Locked ? LESSON2_PROBLEM.dividend : l2.shadedParts;

    // View mode buttons
    ['both', 'bars', 'line'].forEach((vm) => {
      const btn = document.getElementById(`l2-view-${vm}`);
      if (btn) {
        const active = l2.viewMode === vm;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      }
    });

    document.getElementById('l2-stepper-row').hidden = isStep3Locked;
    document.getElementById('l2-utility-btns').hidden = isStep3Locked;
    document.getElementById('l2-slider-row').hidden = false;
    document.getElementById('l2-range-slider').disabled = isStep3Locked;

    // Steppers
    document.getElementById('l2-parts-val').textContent = String(displayParts);
    document.getElementById('l2-shaded-val').textContent = String(displayShaded);
    document.getElementById('l2-parts-dec').disabled = displayParts <= 1;
    document.getElementById('l2-parts-inc').disabled = displayParts >= LESSON2_PROBLEM.maxParts;
    document.getElementById('l2-shaded-dec').disabled = displayShaded <= 0;
    document.getElementById('l2-shaded-inc').disabled =
      displayShaded >= LESSON2_PROBLEM.maxWholes * displayParts;

    // Hint Banner
    const hintBtn = document.getElementById('l2-hint-btn');
    const hintBanner = document.getElementById('l2-hint-banner');
    hintBtn.textContent = `💡 Hint (${l2.hintLevel}/2)`;
    if (!isStep3Locked && l2.hintLevel > 0) {
      hintBanner.hidden = false;
      hintBanner.textContent = LESSON2_PROBLEM.hints[l2.hintLevel - 1];
    } else {
      hintBanner.hidden = true;
    }

    // Bars + Number Line visibility (UDL Choice)
    const barsEl = document.getElementById('l2-bars-container');
    const nlWrapEl = document.getElementById('l2-numberline-wrap');
    barsEl.style.display = l2.viewMode === 'line' ? 'none' : 'grid';
    nlWrapEl.style.display = l2.viewMode === 'bars' ? 'none' : 'block';

    renderAlignedFractionBars(barsEl, {
      prefix: 'l2',
      maxWholes: LESSON2_PROBLEM.maxWholes,
      partsPerWhole: displayParts,
      shadedParts: displayShaded,
      wholeLabel: LESSON2_PROBLEM.wholeLabel,
      locked: isStep3Locked,
      visualHighlight: l2.visualHighlight,
      onSliceClick: (nextShaded) => {
        l2.shadedParts = nextShaded;
        l2.visualHighlight = null;
        renderAll();
      }
    });

    renderAlignedNumberLineSVG(document.getElementById('l2-numberline-svg'), {
      maxWholes: LESSON2_PROBLEM.maxWholes,
      partsPerWhole: displayParts,
      shadedParts: displayShaded,
      locked: isStep3Locked,
      visualHighlight: l2.visualHighlight,
      onValueChange: (nextShaded) => {
        if (l2.shadedParts !== nextShaded) {
          l2.shadedParts = nextShaded;
          l2.visualHighlight = null;
          renderAll();
        }
      }
    });

    const slider = document.getElementById('l2-range-slider');
    slider.max = String(LESSON2_PROBLEM.maxWholes * displayParts);
    slider.value = String(displayShaded);
    document.getElementById('l2-physical-readout').textContent = formatPhysicalReadout(
      displayParts,
      displayShaded,
      LESSON2_PROBLEM.wholeLabel
    );

    // Right Column Panels
    const step2Right = document.getElementById('l2-step2-right');
    const step3Right = document.getElementById('l2-step3-right');

    if (l2.activeStep === 2) {
      step2Right.hidden = false;
      step3Right.hidden = true;

      const numIn = document.getElementById('l2-frac-num');
      const denIn = document.getElementById('l2-frac-den');
      if (document.activeElement !== numIn) numIn.value = l2.fracNum;
      if (document.activeElement !== denIn) denIn.value = l2.fracDen;

      renderDiagnosticBox(document.getElementById('l2-step2-diag'), l2.step2LastDiag);
      document.getElementById('l2-step2-next-wrap').hidden = !l2.step2Verified;
    } else {
      step2Right.hidden = true;
      step3Right.hidden = false;

      const wIn = document.getElementById('l2-mix-whole');
      const nIn = document.getElementById('l2-mix-num');
      const dIn = document.getElementById('l2-mix-den');
      if (document.activeElement !== wIn) wIn.value = l2.mixWhole;
      if (document.activeElement !== nIn) nIn.value = l2.mixNum;
      if (document.activeElement !== dIn) dIn.value = l2.mixDen;

      ['a', 'b', 'c'].forEach((letter) => {
        const jBtn = document.getElementById(`l2-just-${letter}`);
        const val = jBtn.getAttribute('data-just');
        const selected = l2.justification === val;
        jBtn.classList.toggle('is-selected', selected);
        jBtn.setAttribute('aria-checked', String(selected));
      });

      renderDiagnosticBox(document.getElementById('l2-step3-diag'), l2.step3LastDiag);
      document.getElementById('l2-step3-next-wrap').hidden = !l2.step3Verified;
    }
  }

  /* ------------------------------------------------------------------------
     8. Lesson 3 Rendering (Equal-Sharing Studio — 3 Challenges)
     ------------------------------------------------------------------------ */

  function renderLesson3() {
    const idx = state.lesson3.activeChallengeIndex;
    const chalConfig = STUDIO_CHALLENGES[idx];
    const cs = state.lesson3.challenges[idx];

    // Challenge selector pills
    STUDIO_CHALLENGES.forEach((c, i) => {
      const pill = document.getElementById(`l3-chal-pill-${i}`);
      if (!pill) return;
      pill.classList.toggle('is-active', i === idx);
      pill.classList.toggle('is-done', state.lesson3.challenges[i].verified);
    });

    // Rue Banner
    document.getElementById('l3-rue-img').src = RUE_POSES[cs.ruePose] || RUE_POSES.talking;
    document.getElementById('l3-rue-speech').innerHTML = cs.rueSpeechHtml;

    // View mode buttons
    ['both', 'bars', 'line'].forEach((vm) => {
      const btn = document.getElementById(`l3-view-${vm}`);
      if (btn) {
        const active = cs.viewMode === vm;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      }
    });

    // Steppers
    document.getElementById('l3-parts-val').textContent = String(cs.partsPerWhole);
    document.getElementById('l3-shaded-val').textContent = String(cs.shadedParts);
    document.getElementById('l3-parts-dec').disabled = cs.partsPerWhole <= 1;
    document.getElementById('l3-parts-inc').disabled = cs.partsPerWhole >= chalConfig.maxParts;
    document.getElementById('l3-shaded-dec').disabled = cs.shadedParts <= 0;
    document.getElementById('l3-shaded-inc').disabled =
      cs.shadedParts >= chalConfig.maxWholes * cs.partsPerWhole;

    // Hint Banner
    const hintBtn = document.getElementById('l3-hint-btn');
    const hintBanner = document.getElementById('l3-hint-banner');
    hintBtn.textContent = `💡 Hint (${cs.hintLevel}/2)`;
    if (cs.hintLevel > 0) {
      hintBanner.hidden = false;
      hintBanner.textContent = chalConfig.hints[cs.hintLevel - 1];
    } else {
      hintBanner.hidden = true;
    }

    // Bars & Number Line
    const barsEl = document.getElementById('l3-bars-container');
    const nlWrapEl = document.getElementById('l3-numberline-wrap');
    barsEl.style.display = cs.viewMode === 'line' ? 'none' : 'grid';
    nlWrapEl.style.display = cs.viewMode === 'bars' ? 'none' : 'block';

    renderAlignedFractionBars(barsEl, {
      prefix: `l3-c${idx}`,
      maxWholes: chalConfig.maxWholes,
      partsPerWhole: cs.partsPerWhole,
      shadedParts: cs.shadedParts,
      wholeLabel: chalConfig.wholeLabel,
      locked: false,
      visualHighlight: cs.visualHighlight,
      onSliceClick: (nextShaded) => {
        cs.shadedParts = nextShaded;
        cs.visualHighlight = null;
        renderAll();
      }
    });

    renderAlignedNumberLineSVG(document.getElementById('l3-numberline-svg'), {
      maxWholes: chalConfig.maxWholes,
      partsPerWhole: cs.partsPerWhole,
      shadedParts: cs.shadedParts,
      locked: false,
      visualHighlight: cs.visualHighlight,
      onValueChange: (nextShaded) => {
        if (cs.shadedParts !== nextShaded) {
          cs.shadedParts = nextShaded;
          cs.visualHighlight = null;
          renderAll();
        }
      }
    });

    const slider = document.getElementById('l3-range-slider');
    slider.max = String(chalConfig.maxWholes * cs.partsPerWhole);
    slider.value = String(cs.shadedParts);
    document.getElementById('l3-physical-readout').textContent = formatPhysicalReadout(
      cs.partsPerWhole,
      cs.shadedParts,
      chalConfig.wholeLabel
    );

    // Right Column Symbolic Inputs
    document.getElementById('l3-unit-label').textContent = chalConfig.unitShort;
    document.getElementById('l3-mix-unit-label').textContent = chalConfig.mixUnitShort;

    const numIn = document.getElementById('l3-frac-num');
    const denIn = document.getElementById('l3-frac-den');
    if (document.activeElement !== numIn) numIn.value = cs.fracNum;
    if (document.activeElement !== denIn) denIn.value = cs.fracDen;

    // Magnitude toggle (LO2 — identical UI across all 3 challenges so Challenge 2 is never spoiled!)
    const ltBtn = document.getElementById('l3-mag-lt1');
    const gtBtn = document.getElementById('l3-mag-gt1');
    ltBtn.classList.toggle('is-selected', cs.magnitude === 'lt1');
    ltBtn.setAttribute('aria-pressed', String(cs.magnitude === 'lt1'));
    gtBtn.classList.toggle('is-selected', cs.magnitude === 'gt1');
    gtBtn.setAttribute('aria-pressed', String(cs.magnitude === 'gt1'));

    const mixedPanel = document.getElementById('l3-mixed-panel');
    mixedPanel.hidden = cs.magnitude !== 'gt1';

    const mwIn = document.getElementById('l3-mix-whole');
    const mnIn = document.getElementById('l3-mix-num');
    const mdIn = document.getElementById('l3-mix-den');
    if (document.activeElement !== mwIn) mwIn.value = cs.mixWhole;
    if (document.activeElement !== mnIn) mnIn.value = cs.mixNum;
    if (document.activeElement !== mdIn) mdIn.value = cs.mixDen;

    renderDiagnosticBox(document.getElementById('l3-diag-box'), cs.lastDiag);

    const nextWrap = document.getElementById('l3-next-wrap');
    const nextBtn = document.getElementById('l3-next-chal-btn');
    const nextUnsolvedIdx = state.lesson3.challenges.findIndex((c, i) => i !== idx && !c.verified);

    if (cs.verified && nextUnsolvedIdx !== -1) {
      nextWrap.hidden = false;
      nextBtn.textContent = `Try ${STUDIO_CHALLENGES[nextUnsolvedIdx].shortTitle} ➔`;
      nextBtn.onclick = () => {
        state.lesson3.activeChallengeIndex = nextUnsolvedIdx;
        renderAll();
      };
    } else {
      nextWrap.hidden = true;
    }

    const allThreeSolved = state.lesson3.challenges.every((c) => c.verified);
    document.getElementById('l3-mastery-banner').hidden = !allThreeSolved;
  }

  /* ------------------------------------------------------------------------
     9. LXD & Mayer Notes Drawer Live Inspector
     ------------------------------------------------------------------------ */

  function renderLxdDrawer() {
    const toggleBtn = document.getElementById('lxd-drawer-toggle');
    const drawer = document.getElementById('lxd-drawer');
    const backdrop = document.getElementById('lxd-drawer-backdrop');

    toggleBtn.setAttribute('aria-pressed', String(state.lxdDrawerOpen));
    drawer.classList.toggle('is-open', state.lxdDrawerOpen);
    drawer.setAttribute('aria-hidden', String(!state.lxdDrawerOpen));
    backdrop.classList.toggle('is-open', state.lxdDrawerOpen);

    const livePre = document.getElementById('lxd-live-state');
    if (livePre) {
      const idx = state.lesson3.activeChallengeIndex;
      const activeChal = state.lesson3.challenges[idx];
      const summary = {
        activeLesson: state.activeLesson,
        lastDiagnosticCode: state.lastDiagnosticEvent,
        lesson1Completed: state.lesson1.completed,
        lesson2: {
          activeStep: state.lesson2.activeStep,
          partsPerWhole: state.lesson2.partsPerWhole,
          shadedParts: state.lesson2.shadedParts,
          fraction: `${state.lesson2.fracNum || '?'}/${state.lesson2.fracDen || '?'}`,
          mixed: `${state.lesson2.mixWhole || '?'} ${state.lesson2.mixNum || '?'}/${state.lesson2.mixDen || '?'}`,
          verifiedSteps: [
            state.lesson2.step1Verified,
            state.lesson2.step2Verified,
            state.lesson2.step3Verified
          ]
        },
        lesson3ActiveChallenge: {
          id: STUDIO_CHALLENGES[idx].id,
          partsPerWhole: activeChal.partsPerWhole,
          shadedParts: activeChal.shadedParts,
          fraction: `${activeChal.fracNum || '?'}/${activeChal.fracDen || '?'}`,
          magnitude: activeChal.magnitude,
          verifiedCount: state.lesson3.challenges.filter((c) => c.verified).length
        }
      };
      livePre.textContent = JSON.stringify(summary, null, 2);
    }
  }

  function renderAll() {
    renderSidebarAndProgress();
    renderLesson1();
    renderLesson2();
    renderLesson3();
    renderLxdDrawer();
  }

  /* ------------------------------------------------------------------------
     10. Event Wiring & Interactive Controllers
     ------------------------------------------------------------------------ */

  function closeMobileSidebar() {
    document.getElementById('course-sidebar').classList.remove('is-mobile-open');
    document.getElementById('sidebar-backdrop').classList.remove('is-open');
    document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', 'false');
  }

  function switchLesson(lessonNum) {
    state.activeLesson = lessonNum;
    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'instant' });
    renderAll();
  }

  function enterLesson2Step(stepNum) {
    const l2 = state.lesson2;
    l2.activeStep = stepNum;
    l2.visualHighlight = null;

    if (stepNum === 1) {
      l2.ruePose = l2.step1Verified ? 'happy' : 'asking';
      l2.rueSpeechHtml =
        '“Hi! This week I need to spend <strong>10 hours</strong> on chores spread evenly across <strong>1 week (7 days)</strong>. How should I set up this problem to find my <strong>hours per day</strong>?”';
    } else if (stepNum === 2) {
      l2.ruePose = l2.step2Verified ? 'happy' : 'talking';
      l2.rueSpeechHtml =
        '“Let’s build <strong>10 hours ÷ 7 days</strong>! Cut each <strong>1-hour bar</strong> into equal daily parts (<span class="text-den-green">green</span>), shade one day’s share (<span class="text-num-blue">blue</span>), and write your fraction right beside it.”';
    } else if (stepNum === 3) {
      l2.partsPerWhole = 7;
      l2.shadedParts = 10;
      l2.ruePose = l2.step3Verified ? 'happy' : 'talking';
      l2.rueSpeechHtml =
        '“Look at your model on the left—one day’s share goes <strong>past 1 whole hour</strong>! Write <code>10/7</code> as a <strong>Mixed Number</strong> and choose why it makes sense.”';
    }
    renderAll();
  }

  function bindEvents() {
    // Sidebar lesson navigation
    [1, 2, 3].forEach((n) => {
      document.getElementById(`nav-lesson-${n}`).addEventListener('click', () => switchLesson(n));
    });

    // Mobile hamburger sidebar
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
      const sb = document.getElementById('course-sidebar');
      const open = !sb.classList.contains('is-mobile-open');
      sb.classList.toggle('is-mobile-open', open);
      document.getElementById('sidebar-backdrop').classList.toggle('is-open', open);
      document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', String(open));
    });
    document.getElementById('sidebar-backdrop').addEventListener('click', closeMobileSidebar);

    // Lesson 1: 4-Card Flip Strip + Corina Voiceover Audio
    ['fraction', 'numerator', 'denominator', 'division'].forEach((key) => {
      document.getElementById(`flip-btn-${key}`).addEventListener('click', () => {
        state.lesson1.flippedCards[key] = !state.lesson1.flippedCards[key];
        renderAll();
      });

      const audioBtn = document.getElementById(`audio-btn-${key}`);
      audioBtn.addEventListener('click', () => {
        if (!voiceAudio) return;
        const src = audioBtn.getAttribute('data-audio');
        if (activeAudioBtnId === audioBtn.id && !voiceAudio.paused) {
          voiceAudio.pause();
          voiceAudio.currentTime = 0;
          activeAudioBtnId = null;
          syncAudioButtonsUI();
          return;
        }
        voiceAudio.pause();
        voiceAudio.src = src;
        activeAudioBtnId = audioBtn.id;
        voiceAudio.play().catch(() => {
          activeAudioBtnId = null;
        });
        syncAudioButtonsUI();
      });
    });

    // Lesson 1: Cookie Worked Example
    const toggleCookies = () => {
      state.lesson1.cookieState =
        state.lesson1.cookieState === 'shared' ? 'initial' : 'shared';
      renderAll();
    };
    document.getElementById('cookie-deal-btn').addEventListener('click', toggleCookies);
    document.getElementById('cookie-visual-box').addEventListener('click', toggleCookies);
    document.getElementById('cookie-visual-box').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCookies();
      }
    });

    document.getElementById('l1-continue-btn').addEventListener('click', () => {
      state.lesson1.completed = true;
      switchLesson(2);
    });

    // Lesson 2: Step Pills
    [1, 2, 3].forEach((s) => {
      document.getElementById(`l2-step-pill-${s}`).addEventListener('click', () => {
        enterLesson2Step(s);
      });
    });

    // Lesson 2 Step 2.1: Operation & Unit Choices
    const step1Responses = {
      mult: {
        code: 'OPERATION_MULTIPLICATION_ERROR',
        pose: 'worried',
        speech:
          '“Whoa—<strong>70 hours in a single day</strong> isn’t even possible! Multiplying repeats 10 hours seven times. Which operation <em>splits</em> 10 total hours equally across the days?”',
        diag: {
          status: 'coaching',
          title: 'Too Big: 70 Hours per Day!',
          message:
            'Multiplication finds a total when every day already had 10 hours. Here we are <strong>sharing 10 total hours equally</strong> across the week.'
        }
      },
      add: {
        code: 'OPERATION_ADDITION_ERROR',
        pose: 'confused',
        speech:
          '“Hold on—adding <code>10 + 7 = 17</code> mixes hours and days together, and 17 hours a day is more than my entire week of chores!”',
        diag: {
          status: 'coaching',
          title: 'Check the Operation: Adding vs. Equal Sharing',
          message:
            'Adding combines two amounts, whereas we want to <strong>divide</strong> 10 hours into equal daily shares.'
        }
      },
      unit1: {
        code: 'UNIT_OMISSION_WEEK_VS_DAYS',
        pose: 'thinking',
        speech:
          '“Wait—if I did <strong>10 hours every day</strong>, that’d be 70 hours by Sunday! <code>10 ÷ 1</code> is hours per <em>week</em>. How many <strong>days</strong> are in 1 week?”',
        diag: {
          status: 'coaching',
          title: 'Convert the Unit First: 1 Week = 7 Days!',
          message:
            'Dividing by <code>1</code> finds hours per <strong>week</strong>. Since we want hours per <strong>day</strong>, divide by the <strong>7 days</strong> in 1 week!'
        }
      },
      correct: {
        code: 'STEP_2_1_VERIFIED',
        pose: 'happy',
        speech:
          '“Spot on! Converting <strong>1 week = 7 days</strong> means we divide <strong>10 hours ÷ 7 days</strong> so every day gets an equal share. Let’s build the diagram!”',
        diag: {
          status: 'verified',
          title: '✓ Setup Verified: 10 hours ÷ 7 days!',
          message:
            'Converting <strong>1 week → 7 days</strong> sets up fair sharing across all 7 days. Click Continue to build the fraction bars and number line!'
        }
      }
    };

    ['mult', 'add', 'unit1', 'correct'].forEach((choiceKey) => {
      document.getElementById(`l2-choice-${choiceKey}`).addEventListener('click', () => {
        const res = step1Responses[choiceKey];
        state.lesson2.step1Choice = choiceKey;
        state.lesson2.ruePose = res.pose;
        state.lesson2.rueSpeechHtml = res.speech;
        if (choiceKey === 'correct') {
          state.lesson2.step1Verified = true;
        }
        state.lastDiagnosticEvent = res.code;
        renderDiagnosticBox(document.getElementById('l2-step1-diag'), res.diag);
        renderAll();
      });
    });

    document.getElementById('l2-to-step2-btn').addEventListener('click', () => {
      enterLesson2Step(2);
    });

    // Lesson 2 Manipulative Controls
    ['both', 'bars', 'line'].forEach((vm) => {
      document.getElementById(`l2-view-${vm}`).addEventListener('click', () => {
        state.lesson2.viewMode = vm;
        renderAll();
      });
    });

    document.getElementById('l2-parts-dec').addEventListener('click', () => {
      const l2 = state.lesson2;
      if (l2.partsPerWhole > 1) {
        l2.partsPerWhole -= 1;
        l2.shadedParts = Math.min(l2.shadedParts, LESSON2_PROBLEM.maxWholes * l2.partsPerWhole);
        l2.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l2-parts-inc').addEventListener('click', () => {
      const l2 = state.lesson2;
      if (l2.partsPerWhole < LESSON2_PROBLEM.maxParts) {
        l2.partsPerWhole += 1;
        l2.shadedParts = Math.min(l2.shadedParts, LESSON2_PROBLEM.maxWholes * l2.partsPerWhole);
        l2.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l2-shaded-dec').addEventListener('click', () => {
      const l2 = state.lesson2;
      if (l2.shadedParts > 0) {
        l2.shadedParts -= 1;
        l2.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l2-shaded-inc').addEventListener('click', () => {
      const l2 = state.lesson2;
      const maxS = LESSON2_PROBLEM.maxWholes * l2.partsPerWhole;
      if (l2.shadedParts < maxS) {
        l2.shadedParts += 1;
        l2.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l2-range-slider').addEventListener('input', (e) => {
      state.lesson2.shadedParts = parseInt(e.target.value, 10) || 0;
      state.lesson2.visualHighlight = null;
      renderAll();
    });

    document.getElementById('l2-hint-btn').addEventListener('click', () => {
      const l2 = state.lesson2;
      l2.hintLevel = l2.hintLevel >= 2 ? 1 : l2.hintLevel + 1;
      l2.visualHighlight = l2.hintLevel === 1 ? 'green-cuts' : 'blue-shares';
      const box = document.getElementById(
        l2.hintLevel === 1 ? 'l2-green-stepper-box' : 'l2-blue-stepper-box'
      );
      box.classList.remove('pulse-signal');
      void box.offsetWidth;
      box.classList.add('pulse-signal');
      renderAll();
    });

    document.getElementById('l2-reset-btn').addEventListener('click', () => {
      const l2 = state.lesson2;
      l2.partsPerWhole = 1;
      l2.shadedParts = 0;
      l2.fracNum = '';
      l2.fracDen = '';
      l2.hintLevel = 0;
      l2.visualHighlight = null;
      renderAll();
    });

    document.getElementById('l2-frac-num').addEventListener('input', (e) => {
      state.lesson2.fracNum = e.target.value;
      renderLxdDrawer();
    });
    document.getElementById('l2-frac-den').addEventListener('input', (e) => {
      state.lesson2.fracDen = e.target.value;
      renderLxdDrawer();
    });

    document.getElementById('l2-sync-model-btn').addEventListener('click', () => {
      state.lesson2.fracNum = String(state.lesson2.shadedParts);
      state.lesson2.fracDen = String(state.lesson2.partsPerWhole);
      renderAll();
    });

    document.getElementById('l2-check-step2-btn').addEventListener('click', () => {
      const l2 = state.lesson2;
      const diag = diagnoseLesson2Step2(l2);
      l2.step2LastDiag = diag;
      l2.ruePose = diag.ruePose;
      l2.visualHighlight = diag.highlight;
      l2.rueSpeechHtml =
        diag.status === 'verified'
          ? '“Yes!! Sharing <strong>10 hours ÷ 7 days</strong> gives <strong>10/7 hours per day</strong>—1 full hour bar plus 3 sevenths of Hour 2!”'
          : '“We’re sharing <strong>10 hours</strong> equally across <strong>7 days</strong> (<code>10 ÷ 7</code>). Check my tip beside your fraction box!”';
      if (diag.status === 'verified') {
        l2.step2Verified = true;
      }
      state.lastDiagnosticEvent = diag.code;
      renderAll();
    });

    document.getElementById('l2-to-step3-btn').addEventListener('click', () => {
      enterLesson2Step(3);
    });

    // Lesson 2 Step 2.3 Inputs & Check
    document.getElementById('l2-mix-whole').addEventListener('input', (e) => {
      state.lesson2.mixWhole = e.target.value;
      renderLxdDrawer();
    });
    document.getElementById('l2-mix-num').addEventListener('input', (e) => {
      state.lesson2.mixNum = e.target.value;
      renderLxdDrawer();
    });
    document.getElementById('l2-mix-den').addEventListener('input', (e) => {
      state.lesson2.mixDen = e.target.value;
      renderLxdDrawer();
    });

    ['a', 'b', 'c'].forEach((letter) => {
      const btn = document.getElementById(`l2-just-${letter}`);
      btn.addEventListener('click', () => {
        state.lesson2.justification = btn.getAttribute('data-just');
        renderAll();
      });
    });

    document.getElementById('l2-check-step3-btn').addEventListener('click', () => {
      const l2 = state.lesson2;
      const diag = diagnoseLesson2Step3(l2);
      l2.step3LastDiag = diag;
      l2.ruePose = diag.ruePose;
      l2.visualHighlight = diag.highlight;
      l2.rueSpeechHtml =
        diag.status === 'verified'
          ? '“Thank you so much! <strong>1 full hour + 3/7 of an hour</strong> every day finishes all <strong>10 hours</strong> in <strong>7 days</strong>!”'
          : '“Look at your <code>10/7</code> model on the left (<strong>10 hours ÷ 7 days</strong>) and peek at my hint on the right!”';
      if (diag.status === 'verified') {
        l2.step3Verified = true;
      }
      state.lastDiagnosticEvent = diag.code;
      renderAll();
    });

    document.getElementById('l2-to-lesson3-btn').addEventListener('click', () => {
      switchLesson(3);
    });

    // Lesson 3: Equal-Sharing Studio Controls
    STUDIO_CHALLENGES.forEach((_, i) => {
      document.getElementById(`l3-chal-pill-${i}`).addEventListener('click', () => {
        state.lesson3.activeChallengeIndex = i;
        renderAll();
      });
    });

    ['both', 'bars', 'line'].forEach((vm) => {
      document.getElementById(`l3-view-${vm}`).addEventListener('click', () => {
        const cs = state.lesson3.challenges[state.lesson3.activeChallengeIndex];
        cs.viewMode = vm;
        renderAll();
      });
    });

    document.getElementById('l3-parts-dec').addEventListener('click', () => {
      const idx = state.lesson3.activeChallengeIndex;
      const cs = state.lesson3.challenges[idx];
      const cfg = STUDIO_CHALLENGES[idx];
      if (cs.partsPerWhole > 1) {
        cs.partsPerWhole -= 1;
        cs.shadedParts = Math.min(cs.shadedParts, cfg.maxWholes * cs.partsPerWhole);
        cs.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l3-parts-inc').addEventListener('click', () => {
      const idx = state.lesson3.activeChallengeIndex;
      const cs = state.lesson3.challenges[idx];
      const cfg = STUDIO_CHALLENGES[idx];
      if (cs.partsPerWhole < cfg.maxParts) {
        cs.partsPerWhole += 1;
        cs.shadedParts = Math.min(cs.shadedParts, cfg.maxWholes * cs.partsPerWhole);
        cs.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l3-shaded-dec').addEventListener('click', () => {
      const cs = state.lesson3.challenges[state.lesson3.activeChallengeIndex];
      if (cs.shadedParts > 0) {
        cs.shadedParts -= 1;
        cs.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l3-shaded-inc').addEventListener('click', () => {
      const idx = state.lesson3.activeChallengeIndex;
      const cs = state.lesson3.challenges[idx];
      const cfg = STUDIO_CHALLENGES[idx];
      if (cs.shadedParts < cfg.maxWholes * cs.partsPerWhole) {
        cs.shadedParts += 1;
        cs.visualHighlight = null;
        renderAll();
      }
    });

    document.getElementById('l3-range-slider').addEventListener('input', (e) => {
      const cs = state.lesson3.challenges[state.lesson3.activeChallengeIndex];
      cs.shadedParts = parseInt(e.target.value, 10) || 0;
      cs.visualHighlight = null;
      renderAll();
    });

    document.getElementById('l3-hint-btn').addEventListener('click', () => {
      const cs = state.lesson3.challenges[state.lesson3.activeChallengeIndex];
      cs.hintLevel = cs.hintLevel >= 2 ? 1 : cs.hintLevel + 1;
      cs.visualHighlight = cs.hintLevel === 1 ? 'green-cuts' : 'blue-shares';
      const box = document.getElementById(
        cs.hintLevel === 1 ? 'l3-green-stepper-box' : 'l3-blue-stepper-box'
      );
      box.classList.remove('pulse-signal');
      void box.offsetWidth;
      box.classList.add('pulse-signal');
      renderAll();
    });

    document.getElementById('l3-reset-btn').addEventListener('click', () => {
      const idx = state.lesson3.activeChallengeIndex;
      const cfg = STUDIO_CHALLENGES[idx];
      const cs = state.lesson3.challenges[idx];
      cs.partsPerWhole = 1;
      cs.shadedParts = 0;
      cs.fracNum = '';
      cs.fracDen = '';
      cs.magnitude = null;
      cs.mixWhole = '';
      cs.mixNum = '';
      cs.mixDen = '';
      cs.hintLevel = 0;
      cs.visualHighlight = null;
      cs.ruePose = 'talking';
      cs.rueSpeechHtml = cfg.promptHtml;
      renderAll();
    });

    document.getElementById('l3-frac-num').addEventListener('input', (e) => {
      state.lesson3.challenges[state.lesson3.activeChallengeIndex].fracNum = e.target.value;
      renderLxdDrawer();
    });
    document.getElementById('l3-frac-den').addEventListener('input', (e) => {
      state.lesson3.challenges[state.lesson3.activeChallengeIndex].fracDen = e.target.value;
      renderLxdDrawer();
    });

    document.getElementById('l3-sync-model-btn').addEventListener('click', () => {
      const cs = state.lesson3.challenges[state.lesson3.activeChallengeIndex];
      cs.fracNum = String(cs.shadedParts);
      cs.fracDen = String(cs.partsPerWhole);
      renderAll();
    });

    ['lt1', 'gt1'].forEach((magVal) => {
      document.getElementById(`l3-mag-${magVal}`).addEventListener('click', () => {
        const cs = state.lesson3.challenges[state.lesson3.activeChallengeIndex];
        cs.magnitude = magVal;
        renderAll();
      });
    });

    document.getElementById('l3-mix-whole').addEventListener('input', (e) => {
      state.lesson3.challenges[state.lesson3.activeChallengeIndex].mixWhole = e.target.value;
      renderLxdDrawer();
    });
    document.getElementById('l3-mix-num').addEventListener('input', (e) => {
      state.lesson3.challenges[state.lesson3.activeChallengeIndex].mixNum = e.target.value;
      renderLxdDrawer();
    });
    document.getElementById('l3-mix-den').addEventListener('input', (e) => {
      state.lesson3.challenges[state.lesson3.activeChallengeIndex].mixDen = e.target.value;
      renderLxdDrawer();
    });

    document.getElementById('l3-check-btn').addEventListener('click', () => {
      const idx = state.lesson3.activeChallengeIndex;
      const cfg = STUDIO_CHALLENGES[idx];
      const cs = state.lesson3.challenges[idx];
      const diag = diagnoseStudioChallenge(cfg, cs);
      cs.lastDiag = diag;
      cs.ruePose = diag.ruePose;
      cs.visualHighlight = diag.highlight;
      cs.rueSpeechHtml = cfg.promptHtml;
      if (diag.status === 'verified') {
        cs.verified = true;
      }
      state.lastDiagnosticEvent = diag.code;
      renderAll();
    });

    // Discreet LXD & Mayer Notes Slide-Over Drawer
    const setDrawerOpen = (open) => {
      state.lxdDrawerOpen = open;
      renderLxdDrawer();
    };
    document.getElementById('lxd-drawer-toggle').addEventListener('click', () => {
      setDrawerOpen(!state.lxdDrawerOpen);
    });
    document.getElementById('lxd-drawer-close').addEventListener('click', () => {
      setDrawerOpen(false);
    });
    document.getElementById('lxd-drawer-backdrop').addEventListener('click', () => {
      setDrawerOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.lxdDrawerOpen) {
        setDrawerOpen(false);
      }
    });

    // Instructor Quick-Jump & Course Reset inside Drawer
    document.querySelectorAll('.lxd-jump-btn[data-jump-lesson]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetLesson = parseInt(btn.getAttribute('data-jump-lesson'), 10);
        const stepAttr = btn.getAttribute('data-jump-step');
        const chalAttr = btn.getAttribute('data-jump-chal');

        state.activeLesson = targetLesson;
        if (targetLesson === 2 && stepAttr) {
          const s = parseInt(stepAttr, 10);
          if (s >= 2) state.lesson2.step1Verified = true;
          if (s >= 3) {
            state.lesson2.step2Verified = true;
            state.lesson2.partsPerWhole = 7;
            state.lesson2.shadedParts = 10;
            state.lesson2.fracNum = '10';
            state.lesson2.fracDen = '7';
          }
          enterLesson2Step(s);
        }
        if (targetLesson === 3 && chalAttr !== null) {
          state.lesson3.activeChallengeIndex = parseInt(chalAttr, 10);
        }
        state.lxdDrawerOpen = false;
        renderAll();
      });
    });

    document.getElementById('lxd-reset-all-btn').addEventListener('click', () => {
      if (voiceAudio) {
        voiceAudio.pause();
        activeAudioBtnId = null;
        syncAudioButtonsUI();
      }
      state = createInitialState();
      renderAll();
    });
  }

  /* Expose pure diagnostic functions for automated verification */
  if (typeof window !== 'undefined') {
    window.__FRACTIONS_STUDIO__ = {
      getState: () => state,
      diagnoseLesson2Step2,
      diagnoseLesson2Step3,
      diagnoseStudioChallenge,
      STUDIO_CHALLENGES
    };
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      bindEvents();
      renderAll();
    });
  }
})();
