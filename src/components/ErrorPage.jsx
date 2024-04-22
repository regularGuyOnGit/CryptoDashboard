import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      Page Does Not Exist.
      <Link to={"/"}>Return to Dashboard</Link>
    </div>
  );
}

export default ErrorPage;
