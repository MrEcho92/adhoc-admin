import { Outlet } from "react-router-dom";

export function RootPage() {
  return (
    <div>
      <div>Root page</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
