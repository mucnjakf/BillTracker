import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BtTopMenu from './components/navigation/BtTopMenu.jsx'
import BtAuthProvider from './components/auth/BtAuthProvider.jsx'
import BtRoutes from './components/routes/BtRoutes'
import BtSideMenu from './components/navigation/BtSideMenu.jsx'
import { createRoot } from 'react-dom/client'
import { BsArrowLeft } from 'react-icons/bs'

createRoot(document.getElementById('root')).render(
  <BtAuthProvider>
    <Container fluid className="d-flex flex-column vh-100">
      <Row className="border-bottom">
        <Col>
          <BtTopMenu/>
        </Col>
      </Row>

      <Row className="flex-fill">
        <Col className="col-2 p-1 border-end">
          <BtSideMenu/>
        </Col>

        <Col className="col-10 my-2">
          <button className="btn btn-sm mb-3" onClick={() => history.back()}>
            {<BsArrowLeft/>}
            &nbsp; Back
          </button>

          <BtRoutes/>
        </Col>
      </Row>
    </Container>
  </BtAuthProvider>,
)
