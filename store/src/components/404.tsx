import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for could not be found.</p>
      <p>
        <Link to="/">Go back to the home page</Link>
      </p>
    </div>
  )
}

export default NotFound
