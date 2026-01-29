import type { FC, ReactElement } from "react";

import { Task } from "@/components/task/task";
import { TasksCounter } from "@/components/taskCounter/tasksCounter";
import { TaskSidebar } from "@/components/taskSidebar/taskSidebar";
import { useFetchTasks } from "@/hooks/useFetchTasks.hook";
import type { ITask } from "@/types/task.interface";

function todaysDate() {
  const today = new Date();

  // The Intl namespace is part of the ECMAScript Internationalization API, which provides language-sensitive string comparison, number formatting, and date and time formatting.
  // Define options for toLocaleDateString()
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // full name of the day
    day: "numeric", // numeric day
    month: "short", // abbreviated month
    year: "numeric", // numeric year
  };

  // Format the date
  const formattedDate = today.toLocaleDateString("en-GB", options);
  return formattedDate;
}

export const Tasks: FC = (): ReactElement => {
  /* Trigger the hook  */
  const { data } = useFetchTasks();
  // Custom type guard to check if the response data is an array
  console.log(data);

  return (
    <section className="flex flex-row w-full p-4 gap-8 ">
      <section className="flex basis-2/3 justify-center">
        <div className="flex flex-col w-4/5 p-4">
          <h1 className="text-white font-bold text-2xl mb-8">
            Tasks as on: {todaysDate()}
          </h1>
          <div className="flex justify-around mb-12">
            <TasksCounter
              status="todo"
              count={
                data && data.meta && "todoTasks" in data.meta
                  ? (data.meta.todoTasks as number)
                  : 0
              }
            />
            <TasksCounter
              status="inProgress"
              count={
                data && data.meta && "inProgressTasks" in data.meta
                  ? (data.meta.inProgressTasks as number)
                  : 0
              }
            />
            <TasksCounter
              status="completed"
              count={
                data && data.meta && "completedTasks" in data.meta
                  ? (data.meta.completedTasks as number)
                  : 0
              }
            />
          </div>

          {data &&
            Array.isArray(data.data) &&
            /* Every function returns a predicate if all conditions in the function are true and if this is true the Type is aserted as a consitional declared type if ITask */
            data.data.every(
              (item): item is ITask =>
                "_id" in item &&
                "title" in item &&
                "description" in item &&
                "status" in item &&
                "priority" in item &&
                "dueDate" in item
            ) &&
            data.data.map((task: ITask) => (
              <Task
                key={task["_id"]}
                dueDate={task.dueDate}
                description={task.description}
                status={task.status}
                priority={task.priority}
                title={task.title}
                _id={task._id}
              />
            ))}
        </div>
      </section>
      <section className="flex basis-1/3">
        <TaskSidebar />
      </section>
    </section>
  );
};
