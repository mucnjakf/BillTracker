import ListGroup from 'react-bootstrap/ListGroup'

const BtListGroup = ({ items, renderListItem, onClick }) => {
  return (
    <ListGroup>
      {items.length ? (
        items.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between fs-5" action
                          onClick={() => onClick(item.id)}>
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