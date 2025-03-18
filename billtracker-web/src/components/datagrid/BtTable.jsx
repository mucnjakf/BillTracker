import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useAuth } from '../auth/BtAuthProvider.jsx'

const BtTable = ({ columns, data, actions }) => {
  const { accessToken } = useAuth()

  return (
    <Table striped hover>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th style={{ width: '130px' }}>
            {accessToken &&
              actions.slice(0, 1).map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  className="w-100 pb-2"
                  onClick={action.onClick}
                >
                  {action.icon}
                </Button>
              ))}
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
                  {accessToken && (
                    <ButtonGroup>
                      {actions.slice(1).map((action) => (
                        <Button
                          className="pb-2"
                          key={action.label}
                          variant={action.variant}
                          onClick={() => action.onClick(item.id)}
                        >
                          {action.icon}
                        </Button>
                      ))}
                    </ButtonGroup>
                  )}
                </td>
              }
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="text-center p-4">
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default BtTable
