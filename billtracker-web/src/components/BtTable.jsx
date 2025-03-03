import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useAuth } from "./BtAuthProvider";
import { BsPlusCircle } from "react-icons/bs";

const BtTable = ({ columns, data, actions }) => {
  const { accessToken } = useAuth();

  return (
    <Table striped hover>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th style={{ width: "0px" }}>
            {accessToken ? (
              actions.slice(0, 1).map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  className="w-100"
                  onClick={action.onClick}
                >
                  <BsPlusCircle />
                </Button>
              ))
            ) : (
              <></>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item) => (
            <tr key={item.id} className="align-middle">
              {columns.map((col) => (
                <td key={col.key}>{item[col.key]}</td>
              ))}
              {
                <td>
                  {accessToken ? (
                    <ButtonGroup>
                      {actions.slice(1).map((action) => (
                        <Button
                          key={action.label}
                          variant={action.variant}
                          onClick={() => action.onClick(item.id)}
                        >
                          {action.icon}
                        </Button>
                      ))}
                    </ButtonGroup>
                  ) : (
                    <></>
                  )}
                </td>
              }
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="text-center">
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BtTable;
