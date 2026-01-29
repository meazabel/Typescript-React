import type { FC, ReactElement } from "react";

import type { ITaskCounter } from "@/types/tasksCounter.interface";

export const TasksCounter: FC<ITaskCounter> = (props): ReactElement => {
  const { count, status } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`p-6 border-solid border-4 rounded-full mb-4 ${
          status === "todo" && "border-red-500"
        } ${status === "inProgress" && "border-yellow-500"} ${
          status === "completed" && "border-green-500"
        }`}
      >
        <div className="min-w-10 min-h-10 text-white text-3xl text-center flex justify-center leading-10">
          {count}
        </div>
      </div>
      <div className="text-white text-xl text-center">
        {status === "todo" && "Todo"}
        {status === "inProgress" && "In-Progress"}
        {status === "completed" && "Completed"}
      </div>
    </div>
  );
};
