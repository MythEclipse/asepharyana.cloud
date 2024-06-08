import { Spinner } from "flowbite-react";
import ModalWraper from "./../components/core/modal/index";

export default function Loading() {
  return (
    <ModalWraper>
      <div className="flex flex-wrap gap-2">
        <div className="text-center">
          <h1>Loading</h1>
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      </div>
    </ModalWraper>
  );
}
