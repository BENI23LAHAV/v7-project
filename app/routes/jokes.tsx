import { useFetcher } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/jokes";

interface jokeAPI {
  setup: string;
  punchline: string;
  isDeleted?: boolean;
}

export async function clientLoader() {
  try {
    let jokes: jokeAPI[] = await fetch(
      "https://official-joke-api.appspot.com/random_ten"
    ).then((res) => res.json());
    return { jokes };
  } catch (e) {
    console.log("couldn't fetch ", e);
    return { jokes: [] };
  }
}

export async function clientAction({ request }: { request: Request }) {
  const jokeIndex = new URLSearchParams(await request.text()).get("jokeIndex");

  try {
    fetch("https://official-joke-api.appspot.com/random_ten", {
      method: "DELETE",
    });
  } catch (e) {
    console.log("coudn't delete");
  }

  console.log(`Deleting joke at index: ${jokeIndex}`);
  return { isDeleted: true, jokeIndex };
}

export default function Jokes({ loaderData }: Route.ComponentProps) {
  const [jokes, setJokes] = useState<jokeAPI[]>(loaderData?.jokes || []);
  const fetcher = useFetcher();

  const handleDelete = (index: number) => {
    fetcher.submit({ jokeIndex: index.toString() }, { method: "DELETE" });

    const updatedJokes = [...jokes];
    updatedJokes[index].isDeleted = true;
    setJokes(updatedJokes);
  };

  return (
    <ul>
      {jokes.map((item, index) => (
        <li key={index}>
          {!item.isDeleted ? (
            <>
              {index + 1}: {item.setup}, {item.punchline}
              <fetcher.Form method="DELETE">
                <button type="submit" onClick={() => handleDelete(index)}>
                  Delete joke number {index + 1}
                </button>
              </fetcher.Form>
            </>
          ) : (
            <p>Joke deleted</p>
          )}
        </li>
      ))}
    </ul>
  );
}
