import { Form, Navigate, redirect } from "react-router-dom";
import { login } from "../things";

export async function action({ request, params }) {
  const formData = await request.formData();
  const jwt = await login(formData);
  localStorage.setItem("jwt", jwt);
  return redirect(`/`);
}

export default function Login() {
  if (localStorage.getItem("jwt")) {
    return <Navigate to={"/"} />;
  }
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
              type="text"
              name="password"
            />
            <button type="submit">Login</button>
          </p>
        </Form>
      </div>
    </>
  );
}
