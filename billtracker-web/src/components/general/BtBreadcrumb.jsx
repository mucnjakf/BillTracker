import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BtBreadcrumb = ({ paths }) => {
  return (
    <Breadcrumb>
      {paths.map((path, index) => {
        return (
          path.isActive !== true ? (
            <Breadcrumb.Item active key={index}>
              {path.label}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item href={path.href} key={index}>
              {path.label}
            </Breadcrumb.Item>
          )
        )
      })}
    </Breadcrumb>
  )
}

export default BtBreadcrumb
