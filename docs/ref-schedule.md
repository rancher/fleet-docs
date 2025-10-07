# Schedule Resource

The `Schedule` resource defines time windows during which Fleet accepts changes to `Clusters`.

For more information on how to use `Schedule` resource, see [Scheduling](./scheduling.md).

```yaml
apiVersion: fleet.cattle.io/v1alpha1
kind: Schedule
metadata:
  # Name of the schedule resource.
  # Any name can be used here.
  name: my-schedule

  # Namespace of the schedule resource.
  # Targets of this Schedule are also located in this same namespace.
  namespace: fleet-local
spec:

  # Any cron expression can be used here (with up to second resolution)
  # 
  # Examples:
  #
  #	Expression               Meaning
  #	"0 0 12 * * ?"           Fire at 12pm (noon) every day
  #	"0 15 10 ? * *"          Fire at 10:15am every day
  #	"0 15 10 * * ?"          Fire at 10:15am every day
  #	"0 15 10 * * ? *"        Fire at 10:15am every day
  #	"0 * 14 * * ?"           Fire every minute starting at 2pm and ending at 2:59pm, every day
  #	"0 0/5 14 * * ?"         Fire every 5 minutes starting at 2pm and ending at 2:55pm, every day
  #	"0 0/5 14,18 * * ?"      Fire every 5 minutes starting at 2pm and ending at 2:55pm,
  #	                         AND fire every 5 minutes starting at 6pm and ending at 6:55pm, every day
  #	"0 0-5 14 * * ?"         Fire every minute starting at 2pm and ending at 2:05pm, every day
  #	"0 10,44 14 ? 3 WED"     Fire at 2:10pm and at 2:44pm every Wednesday in the month of March.
  #	"0 15 10 ? * MON-FRI"    Fire at 10:15am every Monday, Tuesday, Wednesday, Thursday and Friday
  #	"0 15 10 15 * ?"         Fire at 10:15am on the 15th day of every month
  #	"0 15 10 ? * 6L"         Fire at 10:15am on the last Friday of every month
  #	"0 15 10 ? * 6#3"        Fire at 10:15am on the third Friday of every month
  #	"0 15 10 L * ?"          Fire at 10:15am on the last day of every month
  #	"0 15 10 L-2 * ?"        Fire at 10:15am on the 2nd-to-last last day of every month
  schedule: "0 0 * * * *"

  # Duration in which the Schedule will be active.
  duration: 1h

  # Target resources handled by the Schedule (clusters only for now)
  targets:
  # Target clusters handled by the Schedule.
  # Refer to the "Mapping to Downstream Clusters" docs for
  # more information as the format of targets is the same.
  # If empty, no clusters will be targeted.
    clusters:
