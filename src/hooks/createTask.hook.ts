import { useMutation } from "@tanstack/react-query";
import type { ITask } from "@/types/task.interface";
import type { IResponse } from "./../types/response.interface";

// Simulated function to post data to an API endpoint
const createTask = async (task: ITask) => {
  /* get the token */

  const response = await fetch(`${import.meta.env.VITE_API_URL}tasks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Custom hook for posting todos
export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
    onSuccess: (response: IResponse<ITask>) => {
      // This callback is triggered if the mutation is successful
      console.log(response);
    },
    onError: (error: unknown) => {
      // Handle error case
      console.error("Error creating task:", error);
    },
  });
}
