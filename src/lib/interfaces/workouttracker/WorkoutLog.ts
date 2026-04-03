import { LogMetric } from "./LogMetric";

export interface WorkoutLog {
  logId: number;
  exerciseName: string;
  exerciseType: string;
  timestamp: string; // ISO string from backend
  logMetrics: LogMetric[];
}
