/**
 * Default configuration template
 */
export const DEFAULT_CONFIG = {
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
//# sourceMappingURL=config.js.map