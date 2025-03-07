import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BtTopBar from './components/BtTopBar.jsx'
import BtAuthProvider from './components/BtAuthProvider'
import BtRoutes from './routes/BtRoutes'
import BtSideBar from './components/BtSideBar.jsx'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <BtAuthProvider>
    <Container fluid className="d-flex flex-column vh-100">
      <Row className="border-bottom">
        <Col>
          <BtTopBar/>
        </Col>
      </Row>

      <Row className="flex-fill px-3 ps-0">
        <Col className="col-2 p-1 border-end">
          <BtSideBar/>
        </Col>

        <Col className="col-10 my-2">
          <BtRoutes/>
        </Col>
      </Row>
    </Container>
  </BtAuthProvider>,
)
