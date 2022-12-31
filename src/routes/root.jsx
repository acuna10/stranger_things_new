import { useState } from "react";
import { Form, Link, Outlet, useLoaderData } from "react-router-dom";
import { createThing, getThings, getMe } from "../things";

export async function loader() {
  const things = await getThings();
  const me = await getMe();
  return { things, me };
}

export async function action() {
  const thing = await createThing();
  return { thing };
}

export default function Root() {
  const { things, me } = useLoaderData();
  console.log("ME:", me);
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("jwt"));

  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem("jwt");
    setisLoggedIn(false);
  };
  return (
    <>
      <div id="sidebar">
        <div>
          {" "}
          <Form method="post">
            <button type="submit">New Thing</button>
          </Form>
          {isLoggedIn ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        <div>
          {things.length ? (
            <ul>
              {things.map((thing) => (
                <li key={thing._id}>
                  <Link to={`things/${thing._id}`}>
                    {thing.title}
                    {thing.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No things</i>
            </p>
          )}
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}