import { Form, redirect } from "react-router-dom";
import { register } from "../things";

export async function action({ request, params }) {
  const formData = await request.formData();
  const jwt = await register(formData);
  localStorage.setItem("jwt", jwt);
  return redirect(`/`);
}

export default function Register() {
  return (
    <>
      <div id="sidebar">
        <div>Register</div>
      </div>
      <div id="detail">
        <Form method="post" id="thing-form">
          <p>
            <input
              placeholder="Username"
              aria-label="username"
              type="text"
              name="username"
            />
            <input
              placeholder="Password"
              aria-label="Password"
              type="password"
              name="password"
            />
            <button type="submit">Register</button>
          </p>
        </Form>
      </div>
    </>
  );
}
