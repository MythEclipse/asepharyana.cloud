import { ReactNode } from "react";

const Box = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-12 bg-slate-200 p-4 dark:border-gray-700 dark:bg-gray-800 md:w-1/2">
      <div className="overflow-hidden rounded-lg shadow-lg">{children}</div>
    </div>
  );
};

export default Box;
