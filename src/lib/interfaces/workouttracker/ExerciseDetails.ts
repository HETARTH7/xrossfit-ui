import { Metrics } from "./Metrics";

export interface ExerciseDetails {
  exerciseName: string;
  exerciseType: string;
  metrics: Metrics[];
}
