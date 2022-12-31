import { Form, useLoaderData } from "react-router-dom";
import { getThing } from "../things";

export async function loader({ params }) {
  return await getThing(params.thingId);
}

export default function Thing() {
  const thing = useLoaderData();
  console.log(thing);
  return (
    <div id="thing">
      <div>
        <h1>{thing.title}</h1>

        {thing.price && <p class="price">${thing.price}</p>}

        {thing.description && <p>{thing.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ thing }) {
  // yes, this is a `let` for later
  let favorite = thing.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
