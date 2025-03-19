import type { Route } from "./+types/personal-info";

export async function loader({ params }: Route.LoaderArgs) {
  const name = params.name;
  return { name };
}
export async function action() {}
export default function PersonalInfo({ loaderData }: Route.ComponentProps) {
  return <p>Name : {loaderData.name}</p>;
}
