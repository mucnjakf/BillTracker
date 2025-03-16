import { BsExclamationCircle } from 'react-icons/bs'

const NotFound = () => {
  return (
    <>
      <h1 className="mb-3">
        <BsExclamationCircle/>
        <span className="ms-3">Page not found</span>
      </h1>

      <p className="text-muted small">HTTP status: 404</p>

      <p>
        The page you are looking for may have been moved, renamed, or no longer exists.
      </p>
      <p>
        Please check the URL and try again, or return to <a href="/"
                                                            className="text-decoration-none fw-bold">dashboard</a>.
      </p>
    </>
  )
}

export default NotFound
