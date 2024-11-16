import { Task } from "@/utils/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterTasks = (tasks: Task[], priority: string) => {
  const filteredTasks = () =>{

    switch (priority) {
      case "low":
        return tasks.filter((tasks) => tasks.priority === "Low");
      case "medium":
        return tasks.filter((tasks) => tasks.priority === "Medium");
      case "high":
        return tasks.filter((tasks) => tasks.priority === "High");
      default:
        return tasks;
    };
  };

  return filteredTasks()
}
