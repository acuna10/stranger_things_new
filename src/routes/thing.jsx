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
        <h1>Comments</h1>
        <input id="comment" type="text"></input>
        <div>
          <Form action="post">
            <button type="submit">Post Commment</button>
          </Form>
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
