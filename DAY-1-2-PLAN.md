# GitFlow Autopilot - Days 1-2 Implementation Plan

## 📅 DAY 1: Repository Setup (1 hour)

### ✅ Checklist
- [ ] GitHub repository created
- [ ] Dependencies installed
- [ ] Folder structure created
- [ ] Files initialized
- [ ] TypeScript configured
- [ ] Initial commit pushed

---

### Step 1: Install Dependencies (5 minutes)

```bash
npm install @actions/core @actions/github commander simple-git chalk yaml axios ora prompts
```

```bash
npm install -D typescript @types/node @types/prompts jest @types/jest ts-jest eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

---

### Step 2: Create Folder Structure (3 minutes)

**For Windows CMD:**
```cmd
mkdir src\cli\commands
mkdir src\cli\utils
mkdir src\core
mkdir src\action
mkdir src\types
mkdir tests
mkdir templates
mkdir .github\workflows
```

**For PowerShell:**
```powershell
New-Item -ItemType Directory -Force -Path src\cli\commands
New-Item -ItemType Directory -Force -Path src\cli\utils
New-Item -ItemType Directory -Force -Path src\core
New-Item -ItemType Directory -Force -Path src\action
New-Item -ItemType Directory -Force -Path src\types
New-Item -ItemType Directory -Force -Path tests
New-Item -ItemType Directory -Force -Path templates
New-Item -ItemType Directory -Force -Path .github\workflows
```

---

### Step 3: Create Empty Files (5 minutes)

**For Windows CMD:**
```cmd
type nul > src\types\config.ts
type nul > src\core\git-operations.ts
type nul > src\core\conflict-detector.ts
type nul > src\core\branch-sync.ts
type nul > src\core\notifications.ts
type nul > src\cli\index.ts
type nul > src\cli\commands\init.ts
type nul > src\cli\commands\sync.ts
type nul > src\cli\commands\status.ts
type nul > src\cli\utils\config.ts
type nul > src\cli\utils\logger.ts
type nul > src\action\index.ts
type nul > templates\.gitflow-autopilot.yml
type nul > action.yml
type nul > .npmignore
```

**For PowerShell:**
```powershell
New-Item -ItemType File -Path src\types\config.ts
New-Item -ItemType File -Path src\core\git-operations.ts
New-Item -ItemType File -Path src\core\conflict-detector.ts
New-Item -ItemType File -Path src\core\branch-sync.ts
New-Item -ItemType File -Path src\core\notifications.ts
New-Item -ItemType File -Path src\cli\index.ts
New-Item -ItemType File -Path src\cli\commands\init.ts
New-Item -ItemType File -Path src\cli\commands\sync.ts
New-Item -ItemType File -Path src\cli\commands\status.ts
New-Item -ItemType File -Path src\cli\utils\config.ts
New-Item -ItemType File -Path src\cli\utils\logger.ts
New-Item -ItemType File -Path src\action\index.ts
New-Item -ItemType File -Path templates\.gitflow-autopilot.yml
New-Item -ItemType File -Path action.yml
New-Item -ItemType File -Path .npmignore
```

---

### Step 4: Update package.json (5 minutes)

Replace the content of `package.json` with:

```json
{
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
    "url": "https://github.com/24andup/gitflow-autopilot.git"
  },
  "dependencies": {
    "@actions/core": "^1.10.1",
    "@actions/github": "^6.0.0",
    "axios": "^1.6.0",
    "chalk": "^4.1.2",
    "commander": "^11.1.0",
    "ora": "^5.4.1",
    "prompts": "^2.4.2",
    "simple-git": "^3.20.0",
    "yaml": "^2.3.4"
  },
  "devDependencies": {
    "@types/jest": "^29.5.8",
    "@types/node": "^20.9.0",
    "@types/prompts": "^2.4.9",
    "@typescript-eslint/eslint-plugin": "^6.11.0",
    "@typescript-eslint/parser": "^6.11.0",
    "eslint": "^8.54.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "typescript": "^5.2.2"
  }
}
```

---

### Step 5: Update .gitignore (2 minutes)

```
node_modules/
dist/
*.log
.env
.DS_Store
coverage/
.vscode/
*.tsbuildinfo
```

---

### Step 6: Create .npmignore (2 minutes)

```
src/
tests/
*.test.ts
*.spec.ts
tsconfig.json
.eslintrc.js
.gitignore
.github/
coverage/
*.md
!README.md
```

---

### Step 7: Update tsconfig.json (3 minutes)

Replace the content of `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

---

### Step 8: Create ESLint Config (3 minutes)

Create `.eslintrc.js`:

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
```

---

### Step 9: Create Jest Config (3 minutes)

Create `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ]
};
```

---

### Step 10: Test Build (5 minutes)

```bash
npm run build
```

Should compile successfully (even with empty files).

---

### Step 11: Initial Commit (5 minutes)

```bash
git add .
git commit -m "chore: initial project setup - Day 1 complete"
git push origin main
```

---

### ✅ Day 1 Complete!
**Time spent:** ~60 minutes  
**What's ready:** Project structure, dependencies, configuration files

---

## 📅 DAY 2: Core Type Definitions (1 hour)

### ✅ Checklist
- [ ] Type interfaces created
- [ ] Build successful
- [ ] No TypeScript errors

---

### Step 1: Create Type Definitions (45 minutes)

**File:** `src/types/config.ts`

```typescript
/**
 * Configuration structure for GitFlow Autopilot
 */
export interface GitFlowConfig {
  branches: {
    main: string;
    develop: string;
  };
  sync: {
    enabled: boolean;
    auto_sync: boolean;
    skip_patterns: string[];
    conflict_strategy: 'notify' | 'auto-resolve' | 'skip';
  };
  notifications: {
    slack?: {
      enabled: boolean;
      webhook_url: string;
      channel?: string;
      mention_users?: string[];
    };
    email?: {
      enabled: boolean;
      recipients: string[];
      smtp_config?: {
        host: string;
        port: number;
        username: string;
        password: string;
      };
    };
  };
  conflict_detection: {
    enabled: boolean;
    file_patterns?: string[];
    ignore_patterns?: string[];
  };
  github_action?: {
    run_on_schedule?: boolean;
    schedule_cron?: string;
  };
}

/**
 * Result of a sync operation
 */
export interface SyncResult {
  success: boolean;
  message: string;
  sourceBranch: string;
  targetBranch: string;
  conflictFiles?: string[];
  skipped: boolean;
  skipReason?: string;
  timestamp: Date;
  commitHash?: string;
}

/**
 * Information about detected conflicts
 */
export interface ConflictInfo {
  hasConflicts: boolean;
  conflicts: Array<{
    file: string;
    type: 'content' | 'deletion' | 'modification';
    severity: 'low' | 'medium' | 'high';
  }>;
  riskScore: number; // 0-100
  recommendation: 'safe' | 'caution' | 'manual-review-required';
}

/**
 * Branch status information
 */
export interface BranchStatus {
  name: string;
  exists: boolean;
  ahead: number;
  behind: number;
  lastCommit?: {
    hash: string;
    message: string;
    author: string;
    date: Date;
  };
}

/**
 * Notification payload
 */
export interface NotificationPayload {
  type: 'conflict' | 'success' | 'error' | 'skip';
  title: string;
  message: string;
  details?: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error';
  timestamp: Date;
}

/**
 * CLI command options
 */
export interface CLIOptions {
  source?: string;
  target?: string;
  configPath?: string;
  dryRun?: boolean;
  verbose?: boolean;
  force?: boolean;
}

/**
 * GitHub Action inputs
 */
export interface ActionInputs {
  githubToken: string;
  configPath: string;
  slackWebhook?: string;
  dryRun: boolean;
}

/**
 * Default configuration template
 */
export const DEFAULT_CONFIG: GitFlowConfig = {
  branches: {
    main: 'main',
    develop: 'dev'
  },
  sync: {
    enabled: true,
    auto_sync: true,
    skip_patterns: [
      '*[skip ci]*',
      '*[no sync]*',
      '*WIP*'
    ],
    conflict_strategy: 'notify'
  },
  notifications: {
    slack: {
      enabled: false,
      webhook_url: ''
    }
  },
  conflict_detection: {
    enabled: true,
    ignore_patterns: [
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml'
    ]
  }
};
```

---

### Step 2: Test Build (10 minutes)

```bash
npm run build
```

**Expected output:**
- No TypeScript errors
- `dist/` folder created
- `dist/types/config.js` exists
- `dist/types/config.d.ts` exists

**Verify files:**
```bash
dir dist\types
```

Should show:
```
config.js
config.d.ts
config.js.map
```

---

### Step 3: Quick Type Check (5 minutes)

Create a test file to verify types work:

**File:** `tests/types.test.ts`

```typescript
import { GitFlowConfig, SyncResult, DEFAULT_CONFIG } from '../src/types/config';

describe('Type Definitions', () => {
  it('should use default config', () => {
    const config: GitFlowConfig = DEFAULT_CONFIG;
    expect(config.branches.main).toBe('main');
    expect(config.branches.develop).toBe('dev');
    expect(config.sync.enabled).toBe(true);
  });

  it('should create sync result', () => {
    const result: SyncResult = {
      success: true,
      message: 'Sync completed',
      sourceBranch: 'main',
      targetBranch: 'dev',
      skipped: false,
      timestamp: new Date()
    };
    expect(result.success).toBe(true);
  });
});
```

**Run test:**
```bash
npm test
```

---

### Step 4: Commit Day 2 Work (5 minutes)

```bash
git add .
git commit -m "feat: add core type definitions - Day 2 complete"
git push origin main
```

---

### ✅ Day 2 Complete!
**Time spent:** ~60 minutes  
**What's ready:** Complete type system with interfaces for all core functionality

---

## 🎯 Days 1-2 Summary

### What You Built:
1. ✅ Complete project structure
2. ✅ All dependencies installed
3. ✅ TypeScript configured and working
4. ✅ Type definitions for entire application
5. ✅ Build system functional
6. ✅ Testing framework ready

### What's Next:
- Day 3: Git Operations Module
- Day 4: Conflict Detection
- Day 5: Branch Sync Service

### Ready to Continue?
You now have a solid foundation! The hardest setup work is done. Days 3-5 will implement the core logic using these types.

---

## 💡 Quick Reference

### Build Commands:
```bash
npm run build      # Compile TypeScript
npm run dev        # Watch mode
npm test          # Run tests
npm run lint      # Check code style
```

### Project Structure:
```
gitflow-autopilot/
├── src/
│   ├── types/          ✅ DONE
│   ├── core/           → Next
│   ├── cli/            → Week 2
│   └── action/         → Week 2
├── tests/              ✅ Setup done
├── dist/               ✅ Generated on build
└── package.json        ✅ DONE
```

---

## 🚀 Motivation

You've completed the foundation in just 2 hours! This is the boring part - it gets more fun from here as you implement actual Git logic and see things work.

**Keep going! 💪**
