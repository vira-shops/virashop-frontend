const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const huskyDir = path.join(__dirname, '.husky');

try {
  console.log('Initializing Husky...');
  execSync('npx husky', { stdio: 'inherit' });

  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  if (!fs.existsSync(commitMsgPath)) {
    console.log('Setting up Husky commit-msg hook...');
    fs.writeFileSync(
      commitMsgPath,
      '#!/usr/bin/env sh\n\n' + 'npx --no -- commitlint --edit "$1"\n',
      { mode: 0o755 },
    );
  }

  const preCommitPath = path.join(huskyDir, 'pre-commit');
  if (!fs.existsSync(preCommitPath)) {
    console.log('Setting up Husky pre-commit hook...');
    fs.writeFileSync(preCommitPath, '#!/usr/bin/env sh\n\n' + 'node .husky/pre-commit.js\n', {
      mode: 0o755,
    });
  }

  console.log('Husky setup complete!');
} catch (error) {
  console.error('Error setting up Husky:', error.message);
  process.exit(1);
}
