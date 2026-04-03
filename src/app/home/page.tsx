"use client";

import React, { useState } from "react";
import { TextField, Autocomplete, Button, MenuItem } from "@mui/material";

// ---------------- TYPES ----------------
type MetricType = "number" | "text" | "select";

interface Metric {
  id: string;
  name: string;
  type: MetricType;
  unit?: string;
  options?: string[];
}

interface Exercise {
  id: string;
  name: string;
}

// ---------------- MOCK DATA ----------------
const mockExercises: Exercise[] = [
  { id: "1", name: "Running" },
  { id: "2", name: "Weight Lifting" },
  { id: "3", name: "Cycling" },
];

const mockMetricsByExercise: Record<string, Metric[]> = {
  "1": [
    { id: "distance", name: "Distance", type: "number", unit: "km" },
    { id: "duration", name: "Duration", type: "number", unit: "min" },
  ],
  "2": [
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
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const fetchMetrics = (exerciseId: string) => {
    return mockMetricsByExercise[exerciseId] || [];
  };

  const handleExerciseChange = (_: any, value: Exercise | null) => {
    setSelectedExercise(value);

    if (value) {
      const fetchedMetrics = fetchMetrics(value.id);
      setMetrics(fetchedMetrics);

      const initialValues: Record<string, any> = {};
      fetchedMetrics.forEach((m) => {
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
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Workout Tracker
        </h1>

        {/* Exercise Dropdown */}
        <Autocomplete
          options={mockExercises}
          getOptionLabel={(option) => option.name}
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
  );
}
