"use client";

import { WorkoutLog } from "@/lib/interfaces/workouttracker/WorkoutLog";

interface Props {
  logs: WorkoutLog[];
}

export default function WorkoutLogsList({ logs }: Props) {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        No workouts logged yet.
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-6">
      {logs.map((log) => {
        const metricsText = log.logMetrics
          .map((metric) => `${metric.metricValue} ${metric.metricUnit}`)
          .join(", ");

        return (
          <div
            key={log.logId}
            className="bg-white shadow-sm rounded-lg px-4 py-3 border flex justify-between items-center"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">{log.exerciseName}</span>

              <span className="text-sm text-gray-400">
                ({log.exerciseType})
              </span>

              {metricsText && (
                <span className="text-gray-600">• {metricsText}</span>
              )}
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
