import ListGroup from 'react-bootstrap/ListGroup'

const BtListGroup = ({ items, renderListItem }) => {
  return (
    <ListGroup>
      {items.length ? (
        items.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between fs-5 list-group-item-action">
            {renderListItem(item)}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item className="text-center p-4">
          No records found
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default BtListGroup