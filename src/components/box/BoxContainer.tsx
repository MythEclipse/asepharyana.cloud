import { ReactNode } from "react";

const BoxContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-wrap justify-center px-4 dark:border-gray-700 dark:bg-gray-800 xl:mx-auto xl:w-10/12">
      {children}
    </div>
  );
};
export default BoxContainer;
