import type { ReactNode } from "react";

type MainContainerProps = {
  children: ReactNode;
};

const MainContainer = ({ children }: MainContainerProps) => (
  <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
    {children}
  </div>
);

export default MainContainer;
