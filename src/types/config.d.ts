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
    riskScore: number;
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
export declare const DEFAULT_CONFIG: GitFlowConfig;
//# sourceMappingURL=config.d.ts.map