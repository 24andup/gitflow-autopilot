# gitflow-autopilot

✅ PHASE 1: MVP Tasks (Week 1-2, 10-12 hours)
Week 1: Core Setup & Implementation (6 hours)

DAY 1: Repository Setup (1 hour)
Time: 60 minutes
Tasks:

 Create GitHub repository: gitflow-autopilot
 Initialize with README template
 Add MIT License
 Create project structure

Commands to run:
bash# 1. Create repo on GitHub (do this first on github.com)

# 2. Clone locally
git clone https://github.com/yourusername/gitflow-autopilot.git
cd gitflow-autopilot

# 3. Initialize npm
npm init -y

# 4. Install dependencies
npm install @actions/core @actions/github commander simple-git chalk yaml axios ora prompts

# 5. Install dev dependencies
npm install -D typescript @types/node @types/prompts jest @types/jest ts-jest eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

# 6. Create folder structure
mkdir -p src/cli/commands
mkdir -p src/cli/utils
mkdir -p src/core
mkdir -p src/action
mkdir -p src/types
mkdir -p tests
mkdir -p templates
mkdir -p .github/workflows

# 7. Create files
touch src/types/config.ts
touch src/core/git-operations.ts
touch src/core/conflict-detector.ts
touch src/core/branch-sync.ts
touch src/core/notifications.ts
touch src/cli/index.ts
touch src/cli/commands/init.ts
touch src/cli/commands/sync.ts
touch src/cli/commands/status.ts
touch src/cli/utils/config.ts
touch src/cli/utils/logger.ts
touch src/action/index.ts
touch templates/.gitflow-autopilot.yml
touch action.yml
touch tsconfig.json
touch .gitignore
touch .npmignore

# 8. Initialize TypeScript
npx tsc --init
Update package.json:
json{
  "name": "gitflow-autopilot",
  "version": "0.1.0",
  "description": "Git branch syncing on autopilot",
  "main": "dist/index.js",
  "bin": {
    "gitflow-autopilot": "dist/cli/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  },
  "keywords": [
    "git",
    "gitflow",
    "branch-sync",
    "automation",
    "devops",
    "ci-cd"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/gitflow-autopilot.git"
  }
}
```

**Create .gitignore:**
```
node_modules/
dist/
*.log
.env
.DS_Store
coverage/
.vscode/
Commit:
bashgit add .
git commit -m "Initial project setup"
git push origin main
✅ Done: Project structure ready

DAY 2: Core Type Definitions (1 hour)
Time: 60 minutes
File: src/types/config.ts
Copy the TypeScript interfaces from the artifact I provided earlier. This includes:

GitFlowConfig
SyncResult
ConflictInfo

Test it:
bashnpm run build
# Should compile without errors
✅ Done: Type system in place

DAY 3: Git Operations Module (2 hours)
Time: 120 minutes
File: src/core/git-operations.ts
Focus on these critical methods:

getCurrentBranch() - get current branch name
branchExists() - check if branch exists
fetch() - fetch latest from remote
mergeBranches() - perform merge with conflict detection
getConflictingFiles() - list files with conflicts
shouldSkipSync() - check skip patterns

Copy implementation from artifact, then TEST:
bash# Create test repository
mkdir ../test-repo
cd ../test-repo
git init
git checkout -b main
echo "# Test" > README.md
git add .
git commit -m "Initial commit"
git checkout -b dev
echo "Dev content" >> README.md
git add .
git commit -m "Dev changes"

# Go back to your project
cd ../gitflow-autopilot

# Build and test
npm run build

# Create a simple test file
# tests/git-operations.test.ts
Simple manual test:
typescript// tests/manual-test.ts
import { GitOperations } from '../src/core/git-operations';

async function test() {
  const git = new GitOperations('../test-repo');
  const branch = await git.getCurrentBranch();
  console.log('Current branch:', branch);
  
  const exists = await git.branchExists('main');
  console.log('Main exists:', exists);
}

test();
Run: npx ts-node tests/manual-test.ts
✅ Done: Git operations working

DAY 4: Conflict Detection (1 hour)
Time: 60 minutes
File: src/core/conflict-detector.ts
Copy implementation from artifact.
Key methods:

detectConflicts() - analyze potential conflicts
predictConflictProbability() - estimate risk

Test with intentional conflict:
bashcd ../test-repo
git checkout main
echo "Main changes" >> README.md
git add .
git commit -m "Main changes"

git checkout dev  
echo "Dev changes" >> README.md
git add .
git commit -m "Dev changes"

# Now main and dev have conflicting changes
Test your detector:
typescript// tests/conflict-test.ts
import { ConflictDetector } from '../src/core/conflict-detector';

async function test() {
  const detector = new ConflictDetector('../test-repo');
  const result = await detector.detectConflicts('main', 'dev');
  console.log('Has conflicts:', result.hasConflicts);
  console.log('Conflicts:', result.conflicts);
}

test();
✅ Done: Conflict detection working

DAY 5: Branch Sync Service (1 hour)
Time: 60 minutes
File: src/core/branch-sync.ts
Copy implementation from artifact.
Key method: syncBranches(source, target)
This orchestrates:

Fetch latest
Check skip patterns
Detect conflicts
Merge if safe
Notify results

File: src/core/notifications.ts
Basic Slack webhook implementation:
typescriptasync notifyConflict(result: SyncResult) {
  if (!this.config.notifications.slack?.enabled) return;
  
  const message = `⚠️ Conflicts detected: ${result.conflictFiles?.join(', ')}`;
  
  await axios.post(this.config.notifications.slack.webhook_url, {
    text: message
  });
}
✅ Done: Sync logic complete

Week 2: CLI + GitHub Action (6 hours)

DAY 6: CLI Framework (1 hour)
Time: 60 minutes
File: src/cli/index.ts
typescript#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { syncCommand } from './commands/sync';
import { statusCommand } from './commands/status';

const program = new Command();

program
  .name('gitflow-autopilot')
  .description('Git branch syncing on autopilot')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize GitFlow Autopilot in current repository')
  .action(initCommand);

program
  .command('sync')
  .description('Manually trigger branch sync')
  .option('-s, --source <branch>', 'Source branch')
  .option('-t, --target <branch>', 'Target branch')
  .action(syncCommand);

program
  .command('status')
  .description('Show current sync status')
  .action(statusCommand);

program.parse();
Make it executable:
bashchmod +x dist/cli/index.js
npm link
Test:
bashgitflow-autopilot --version
gitflow-autopilot --help
✅ Done: CLI shell ready

DAY 7: Init Command (1.5 hours)
Time: 90 minutes
File: src/cli/commands/init.ts
Copy implementation from artifact.
What it does:

Checks if in Git repo
Asks configuration questions (prompts)
Creates .gitflow-autopilot.yml
Creates .github/workflows/gitflow-autopilot.yml
Shows next steps

Test:
bashcd ../test-repo
gitflow-autopilot init

# Follow prompts
# Check files created:
cat .gitflow-autopilot.yml
cat .github/workflows/gitflow-autopilot.yml
✅ Done: Setup automation complete

DAY 8: Sync & Status Commands (1.5 hours)
Time: 90 minutes
File: src/cli/commands/sync.ts
Implements manual sync trigger.
File: src/cli/commands/status.ts
Shows:

Current branch
Uncommitted changes
Sync status (main ↔️ dev)
Potential conflicts

File: src/cli/utils/config.ts
YAML config loader/parser.
Test all commands:
bashcd ../test-repo
gitflow-autopilot status
gitflow-autopilot sync --source main --target dev
gitflow-autopilot status  # Should show updated status
✅ Done: CLI fully functional

DAY 9: GitHub Action (2 hours)
Time: 120 minutes
File: action.yml (root directory)
yamlname: 'GitFlow Autopilot'
description: 'Git branch syncing on autopilot'
author: 'Your Name'
branding:
  icon: 'git-merge'
  color: 'blue'

inputs:
  github-token:
    description: 'GitHub token for authentication'
    required: true
  config-path:
    description: 'Path to config file'
    required: false
    default: '.gitflow-autopilot.yml'
  slack-webhook:
    description: 'Slack webhook URL for notifications'
    required: false

outputs:
  sync-status:
    description: 'Status of sync operation'
  conflicts-detected:
    description: 'Whether conflicts were detected'

runs:
  using: 'node20'
  main: 'dist/action/index.js'
File: src/action/index.ts
Copy implementation with CRITICAL concurrency fix:
File: .github/workflows/gitflow-autopilot.yml (template)
yamlname: GitFlow Autopilot

on:
  push:
    branches:
      - main
      - dev

# CRITICAL: Prevent race conditions from multiple merges
concurrency:
  group: gitflow-autopilot-${{ github.ref }}
  cancel-in-progress: false

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: GitFlow Autopilot
        uses: yourusername/gitflow-autopilot@v0.1.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          slack-webhook: ${{ secrets.SLACK_WEBHOOK }}
Test GitHub Action:

Create a test repo on GitHub
Run gitflow-autopilot init
Push the workflow
Create a PR and merge to main
Watch GitHub Actions tab
Verify auto-merge to dev

✅ Done: GitHub Action working

DAY 10: Documentation & Polish (2 hours)
Time: 120 minutes
File: README.md
markdown# 🚀 GitFlow Autopilot

> Git branch syncing on autopilot

Stop manually syncing branches after every merge. GitFlow Autopilot automatically keeps your main and dev branches in sync with intelligent conflict prevention.

## ✨ Features

- 🔄 **Bi-directional sync** - main ↔️ dev stay synchronized automatically
- ⚠️ **Conflict prevention** - detects conflicts BEFORE they break your branch
- 🔔 **Smart notifications** - Slack alerts when manual intervention needed
- ⚡ **2-minute setup** - one command, one config file, done
- 🎯 **Zero manual pulls** - push once, everything syncs automatically

## 🚀 Quick Start

### Install CLI
```bash
npm install -g gitflow-autopilot
```

### Initialize in your repo
```bash
cd your-repo
gitflow-autopilot init
```

### Configure (optional)

Edit `.gitflow-autopilot.yml`:
```yaml
branches:
  main: main
  develop: dev
sync:
  enabled: true
  auto_sync: true
notifications:
  slack:
    enabled: true
    webhook_url: "https://hooks.slack.com/..."
```

### Done! 🎉

Commit and push. The GitHub Action is now active.

## 📖 How It Works

1. You merge a PR to `main`
2. GitFlow Autopilot detects the merge
3. Checks for conflicts with `dev` branch
4. **No conflicts?** Auto-merges back to `dev`
5. **Conflicts?** Sends Slack alert with details

## 🔧 Commands
```bash
# Initialize config
gitflow-autopilot init

# Check sync status
gitflow-autopilot status

# Manual sync
gitflow-autopilot sync --source main --target dev
```

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 License

MIT License - see [LICENSE](LICENSE)

## ⭐ Star History

If this tool saves you time, give it a star! ⭐
Create other docs:

 CONTRIBUTING.md - contribution guidelines
 CHANGELOG.md - version history
 LICENSE - MIT license
 .github/ISSUE_TEMPLATE/ - issue templates

Final checks:
bash# Build
npm run build

# Run tests
npm test

# Lint
npm run lint

# Test CLI
gitflow-autopilot --help

# Test in real repo
cd ../test-repo
gitflow-autopilot status
Commit everything:
bashgit add .
git commit -m "feat: Phase 1 MVP complete"
git tag v0.1.0
git push origin main --tags
✅ Done: Phase 1 Complete!

📋 Phase 1 Completion Checklist
Code

 All TypeScript files compile without errors
 Git operations work (tested manually)
 Conflict detection works
 CLI commands all function
 GitHub Action triggers correctly

Testing

 Tested in a real Git repository
 Tested conflict detection with real conflicts
 Tested auto-sync with no conflicts
 Tested skip patterns work
 CLI commands tested manually

Documentation

 README.md complete with examples
 All code files have comments
 Config file template created
 Installation instructions clear

Repository

 Project structure clean
 .gitignore configured
 package.json complete
 License added (MIT)
 GitHub repo created

Demo

 Record 3-minute demo video
 Create test repository showing it working
 Screenshot of Slack notification
 GIF of CLI in action


🚀 After Phase 1 Complete
Week 2, Day 10 - Launch Tasks:

Publish to NPM:

bashnpm login
npm publish

Create GitHub Release:


Go to Releases → New Release
Tag: v0.1.0
Title: "GitFlow Autopilot v0.1.0 - Initial Release"
Description: Feature list + demo video


Marketing (1 hour):


 Post on r/github
 Post on r/devops
 Tweet about it
 Email 5 dev friends


Success Metrics:


Get 5-10 people to test it
Get feedback from 3+ users
Fix any critical bugs


⏰ Time Breakdown Summary
Week 1: Core (6 hours)

Day 1: Setup (1h)
Day 2: Types (1h)
Day 3: Git ops (2h)
Day 4: Conflicts (1h)
Day 5: Sync (1h)

Week 2: Interface (6 hours)

Day 6: CLI framework (1h)
Day 7: Init command (1.5h)
Day 8: Other commands (1.5h)
Day 9: GitHub Action (2h)
Day 10: Docs + launch (2h)

Total: 12 hours over 2 weeks ✅
