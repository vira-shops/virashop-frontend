const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New features
        'fix', // Bug fixes
        'refactor', // Code changes that neither fix bugs nor add features
        'perf', // Performance improvements
        'style', // Changes that don't affect code functionality (formatting, etc.)
        'test', // Adding or correcting tests
        'docs', // Documentation changes
        'build', // Changes to build system, dependencies, project version, CI
        'ops', // Changes to operational components (infrastructure, deployment)
        'chore', // Miscellaneous changes
      ],
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 120],
    'body-max-line-length': [2, 'always', 150],
    'subject-exclamation-mark': [0], // Allow ! for breaking changes
    'footer-leading-blank': [2, 'always'],
    'body-leading-blank': [2, 'always'],
    'subject-min-length': [2, 'always', 3],
    'issue-references': [1, 'always'], // Warning only
    'tense-rule': [
      2,
      'always',
      [
        'add',
        'change',
        'update',
        'remove',
        'fix',
        'upgrade',
        'implement',
        'refactor',
        'revert',
        'resolve',
        'enhance',
      ],
    ], // Enforce imperative tense verbs
    'wip-rule': [1, 'never'], // Warning for WIP commits (discourage but allow)
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?:(WIP): )?(\w*)(?:\((.*)\))?(!)?: (.*)$/,
      headerCorrespondence: ['wip', 'type', 'scope', 'breaking', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'tense-rule': (parsed, _, value) => {
          const { subject } = parsed;
          if (!subject) return [true];

          const startsWithImperative = value.some((verb) => subject.toLowerCase().startsWith(verb));

          return [
            startsWithImperative,
            `subject must start with imperative present tense verb (${value.join(', ')})`,
          ];
        },
        'issue-references': (parsed, _) => {
          const { footer } = parsed;

          if (!footer) return [false, 'commit must have a footer with issue references'];

          const hasIssueReference =
            /#\d+|GH-\d+|Fixes #\d+|Closes #\d+|Resolves #\d+|References #\d+|Related to #\d+/.test(
              footer,
            );

          return [
            hasIssueReference,
            'footer must contain issue references (e.g., #123, Fixes #123)',
          ];
        },
        'wip-rule': (parsed) => {
          const { wip } = parsed;

          if (wip === 'WIP') {
            return [false, 'WIP commits should not be pushed to shared branches'];
          }

          return [true];
        },
      },
    },
  ],
};

export default config;
