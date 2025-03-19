import type { Route } from "./+types/account";

export async function loader({ params }: Route.LoaderArgs) {
  const accountState = params.state;
  return { accountState };
}
export async function action() {}
export default function Account({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <p>Account state : {loaderData.accountState}</p>
    </>
  );
}
