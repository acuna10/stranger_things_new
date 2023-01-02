import { Form, redirect, useLoaderData } from "react-router-dom";
import { updateThing } from "../things";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateThing(params.thingId, updates);
  return redirect(`/things/${params.thingId}`);
}

export default function EditThing() {
  const thing = useLoaderData();

  return (
    <Form method="post" id="thing-form">
      <p>
        <span>Name Of Item</span>
        <input
          placeholder="Enter Here"
          aria-label=""
          type="text"
          name="name"
          defaultValue={thing.first}
        />
      </p>
      <label>
        <span>Price</span>
        <input
          type="text "
          name="price"
          placeholder="How Much $$"
          defaultValue={thing.price}
        />
      </label>
      <label>
        <span>Description</span>
        <textarea name="Describe Your Item As Best As You Can" defaultValue={thing.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
