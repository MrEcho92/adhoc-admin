import * as Api from "../../auth/api/api";

export function LandingPage() {
  const user = Api.getUser();
  return <div>Landing page</div>;
}
