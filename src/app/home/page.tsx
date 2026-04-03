"use client";

import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import { Exercise } from "@/lib/interfaces/workouttracker/Exercise";
import axios from "@/api/axios";
import Navbar from "@/components/Navbar";
import { AuthStorageService } from "@/lib/services/AuthStorageService";
import { ExerciseDetails } from "@/lib/interfaces/workouttracker/ExerciseDetails";
import { Metrics } from "@/lib/interfaces/workouttracker/Metrics";
import { toast, ToastContainer } from "react-toastify";
import WorkoutLogsList from "@/components/WorkoutLogsList";
import { WorkoutLog } from "@/lib/interfaces/workouttracker/WorkoutLog";

export default function WorkoutTracker() {
  const token = AuthStorageService.getToken();

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [formValues, setFormValues] = useState<Record<number, string>>({});
  const [logs, setLogs] = useState<WorkoutLog[]>([]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get<Exercise[]>(
        "/workout-tracker/exerciseNames",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExerciseDetails = async (exerciseId: number) => {
    try {
      const response = await axios.get<ExerciseDetails>(
        `/workout-tracker/exerciseDetails/${exerciseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching exercise details:", error);
      return null;
    }
  };

  const fetchWorkoutLogs = async () => {
    try {
      const response = await axios.get<WorkoutLog[]>("/workout-tracker/logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching workout logs:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutLogs();
  }, []);

  const handleExerciseChange = async (_: any, value: Exercise | null) => {
    setSelectedExercise(value);

    if (value) {
      const exerciseDetails = await fetchExerciseDetails(value.id);
      if (!exerciseDetails) return;

      setMetrics(exerciseDetails.metrics);

      const initialValues: Record<number, string> = {};
      exerciseDetails.metrics.forEach((m) => {
        initialValues[m.id] = "";
      });
      setFormValues(initialValues);
    } else {
      setMetrics([]);
      setFormValues({});
    }
  };

  const handleChange = (metricId: number, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [metricId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedExercise) return;

    try {
      const payload = {
        exerciseId: selectedExercise.id,
        loggedAt: new Date().toISOString(),
        metrics: Object.entries(formValues).map(([metricId, value]) => ({
          metricId: Number(metricId),
          value: Number(value),
        })),
      };

      const response = await axios.post("/workout-tracker/log", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Workout logged successfully:", response.data);
      setSelectedExercise(null);
      setMetrics([]);
      setFormValues({});
      toast.success("Workout logged successfully!");
    } catch (error) {
      console.error("Error saving workout:", error);
      toast.error("Failed to log workout. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Workout Tracker
          </h1>

          {/* Exercise Dropdown */}
          <Autocomplete
            options={exercises}
            getOptionLabel={(option) => option.exerciseName}
            value={selectedExercise}
            onChange={handleExerciseChange}
            renderOption={(props, option) => {
              const { key, ...rest } = props;

              return (
                <li key={key} {...rest} className="flex items-center gap-2">
                  <span className="font-medium">{option.exerciseName}</span>
                  <span className="text-sm text-gray-400">
                    ({option.exerciseType})
                  </span>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Exercise" fullWidth />
            )}
          />

          {/* Metrics Form */}
          {metrics.length > 0 && (
            <div className="space-y-4">
              {metrics.map((metric) => (
                <TextField
                  key={metric.id}
                  type="number"
                  fullWidth
                  label={`${metric.name} (${metric.units})`}
                  value={formValues[metric.id] || ""}
                  onChange={(e) => handleChange(metric.id, e.target.value)}
                />
              ))}
            </div>
          )}

          {/* Submit */}
          <Button
            variant="contained"
            fullWidth
            disabled={!selectedExercise}
            onClick={handleSubmit}
          >
            Add Workout
          </Button>
        </div>
      </div>
      <WorkoutLogsList logs={logs} />
    </div>
  );
}
