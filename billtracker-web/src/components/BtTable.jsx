import { Table, Button, ButtonGroup } from "react-bootstrap";

function BtTable({ columns, data, actions }) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th style={{ width: "0px" }}></th>
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
                  <ButtonGroup>
                    {actions.map((action) => (
                      <Button
                        key={action.label}
                        variant={action.variant}
                        onClick={() => action.onClick(item.id)}
                      >
                        {action.icon}
                      </Button>
                    ))}
                  </ButtonGroup>
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
}

export default BtTable;
