"use client";

import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Button, MenuItem } from "@mui/material";
import { Exercise } from "@/lib/interfaces/workouttracker/Exercise";
import axios from "@/api/axios";
import Navbar from "@/components/Navbar";
import { AuthStorageService } from "@/lib/services/AuthStorageService";
import { ExerciseDetails } from "@/lib/interfaces/workouttracker/ExerciseDetails";

type MetricType = "number" | "text" | "select";

interface Metric {
  id: string;
  name: string;
  type: MetricType;
  unit?: string;
  options?: string[];
}

const mockExercises: Exercise[] = [
  { id: 1, exerciseName: "Running", exerciseType: "Cardio" },
  { id: 2, exerciseName: "Weight Lifting", exerciseType: "Strength" },
  { id: 3, exerciseName: "Cycling", exerciseType: "Cardio" },
];

const mockMetricsByExercise: Record<number, Metric[]> = {
  1: [
    { id: "distance", name: "Distance", type: "number", unit: "km" },
    { id: "duration", name: "Duration", type: "number", unit: "min" },
  ],
  2: [
    { id: "weight", name: "Weight", type: "number", unit: "kg" },
    { id: "reps", name: "Reps", type: "number" },
    {
      id: "muscleGroup",
      name: "Muscle Group",
      type: "select",
      options: ["Chest", "Back", "Legs"],
    },
  ],
  "3": [
    { id: "distance", name: "Distance", type: "number", unit: "km" },
    { id: "speed", name: "Avg Speed", type: "number", unit: "km/h" },
  ],
};

export default function WorkoutTracker() {
  const token = AuthStorageService.getToken();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

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

  const fetchMetrics = (exerciseId: number) => {
    return mockMetricsByExercise[exerciseId] || [];
  };

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

  const handleExerciseChange = async (_: any, value: Exercise | null) => {
    setSelectedExercise(value);

    if (value) {
      const exerciseDetails = await fetchExerciseDetails(value.id);

      if (!exerciseDetails) return;

      // Convert backend metrics → UI metrics
      const transformedMetrics: Metric[] = exerciseDetails.metrics.map((m) => ({
        id: m.id.toString(),
        name: m.name,
        type: "number", // assuming all numeric for now
        unit: m.units,
      }));

      setMetrics(transformedMetrics);

      // Initialize form values
      const initialValues: Record<string, any> = {};
      transformedMetrics.forEach((m) => {
        initialValues[m.id] = "";
      });
      setFormValues(initialValues);
    } else {
      setMetrics([]);
      setFormValues({});
    }
  };

  const handleChange = (metricId: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [metricId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log({
      exercise: selectedExercise,
      metrics: formValues,
    });
  };

  return (
    <div>
      <Navbar />
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
            renderInput={(params) => (
              <TextField {...params} label="Select Exercise" fullWidth />
            )}
          />

          {/* Dynamic Metrics Form */}
          {metrics.length > 0 && (
            <div className="space-y-4">
              {metrics.map((metric) => {
                if (metric.type === "select") {
                  return (
                    <TextField
                      key={metric.id}
                      select
                      fullWidth
                      label={metric.name}
                      value={formValues[metric.id] || ""}
                      onChange={(e) => handleChange(metric.id, e.target.value)}
                    >
                      {metric.options?.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }

                return (
                  <TextField
                    key={metric.id}
                    type={metric.type}
                    fullWidth
                    label={`${metric.name} ${
                      metric.unit ? `(${metric.unit})` : ""
                    }`}
                    value={formValues[metric.id] || ""}
                    onChange={(e) => handleChange(metric.id, e.target.value)}
                  />
                );
              })}
            </div>
          )}

          {/* Submit Button */}
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
    </div>
  );
}
