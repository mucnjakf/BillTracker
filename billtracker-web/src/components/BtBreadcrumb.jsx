import Breadcrumb from "react-bootstrap/Breadcrumb";

const BtBreadcrumb = ({ paths }) => {
  return (
    <Breadcrumb>
      {paths.map((path, index) => {
        if (index === paths.length - 1) {
          return (
            <Breadcrumb.Item active key={index}>
              {path.label}
            </Breadcrumb.Item>
          );
        }

        return (
          <Breadcrumb.Item href={path.href} key={index}>
            {path.label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BtBreadcrumb;
