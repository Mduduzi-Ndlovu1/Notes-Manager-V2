"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";

export default function Home() {
  useRedirect("/login");

  const { tasks } = useTasks()?.tasks;
  
  console.log(tasks)
  return (
    <main className="m-6 h-full">
      <div className="flex justify-between container">
        <h1 className="text-2xl font-bold">
          All Tasks
        </h1>
        <Filters/>

      <div></div>

        </div>
        <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
          {
            tasks?.map((task: Task, i: number) => (
              <TaskItem key={i} task={task}/>
            )
            )
            
          }

        </div>
    </main>
  );
}
