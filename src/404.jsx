import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oh No!</h1>
      <p>We hit a snag. This is us, not you. Sorry about that.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
