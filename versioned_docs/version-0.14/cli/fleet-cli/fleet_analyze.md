---
title: ""
sidebar_label: "fleet analyze"
---
## fleet analyze

Analyze snapshots created by `fleet monitor`

```
fleet analyze [flags] MONITOR_FILE
```

### Options

```
    --compare      Show comparison between snapshots living in different files
    --detailed     Show detailed analysis with all information
    --diff         Show changes over time, comparing consecutive snapshot from the same file
    --issues       Show only resources with issues (useful for quick health checks)
    --json         Format output as JSON
    --no-color     Disable color in output
```

### Usage

```bash
# Analyze latest snapshot
fleet analyze monitor.json

# Analyze from stdin
fleet monitor | fleet analyze

# Show all snapshots in file
fleet analyze --all monitor.json

# Show changes between consecutive snapshots
fleet analyze --diff monitor.json

fleet analyze --issues monitor.json

# Detailed analysis with controller info and events
fleet analyze --detailed monitor.json

# Compare two specific snapshot files
fleet analyze --compare before.json after.json

# JSON output for programmatic use
fleet analyze --json monitor.json

# Disable colored output
fleet analyze --no-color monitor.json
```

### Output Modes

- **Summary (default)**: High-level overview of resources and diagnostics
- **All**: Summary of all snapshots in a multi-snapshot file
- **Diff**: Shows changes between consecutive snapshots
- **Issues**: Shows only resources with detected problems
- **Detailed**: Complete analysis including controller info, API consistency, and events
- **JSON**: Machine-readable output for scripts and automation

### Multi-Snapshot Analysis

When your monitor.json file contains multiple snapshots (one JSON object per line):

```bash
# Show summary of latest snapshot only
fleet analyze monitor.json

# Show differences between consecutive snapshots
fleet analyze --diff monitor.json

# Show summary of all snapshots
fleet analyze --all monitor.json

# Compare two specific snapshot files
fleet analyze --compare snapshot2.json snapshot1.json
```

### SEE ALSO

* [fleet](./fleet)
* [fleet monitor](./fleet_monitor)
