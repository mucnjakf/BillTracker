import {useLocation, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import BillService from "../../services/BillService.js";
import BtBreadcrumb from "../../components/BtBreadcrumb.jsx";
import BtPageTitle from "../../components/BtPageTitle.jsx";
import BtCard from "../../components/BtCard.jsx";
import BtAlert from "../../components/BtAlert.jsx";
import BtIconButton from "../../components/BtIconButton.jsx";
import {BsTrash, BsXCircle} from "react-icons/bs";

const CustomerBillDelete = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const {customerId, billId} = useParams()

    const [bill, setBill] = useState({})
    const [error, setError] = useState(null)

    const returnUrl =
        new URLSearchParams(location.search).get('returnUrl') || `/customers/${customerId}/bills`

    useEffect(() => {
        const getBill = async () => {
            const {data, error} = await BillService.get(customerId, billId)

            if (error) {
                setError(error)
                return
            }

            console.log(data)
            setBill(data)
        }
        getBill()
    }, [customerId, billId])

    const handleDelete = async (e) => {
        e.preventDefault()
        setError(null)

        const {error} = await BillService.delete(customerId, billId)

        if (error) {
            setError(error)
            return
        }

        navigate(`/customers/${customerId}/bills`)
    }

    return (
        <>
            <BtBreadcrumb
                paths={[
                    {label: 'Home', href: '/'},
                    {label: 'Customers', href: '/customers'},
                    returnUrl.startsWith('/customers/')
                        ? {label: 'Details', href: `/customers/${customerId}`}
                        : null,
                    {label: 'Delete'},
                ].filter(Boolean)}
            />

            <BtPageTitle text={`${bill.billNumber} bill delete`}/>

            <BtCard width="500px">
                <BtCard.Body>
                    {error && <BtAlert variant="danger" text={error}/>}

                    <p>Are you sure you want to permanently delete bill?</p>

                    <div>
                        <label className="text-muted small">Customer name</label>
                        <h5>{bill.customer.name} {bill.customer.surname}</h5>
                    </div>
                </BtCard.Body>

                <BtCard.Footer>
                    <div className="d-flex w-100">
                        <BtIconButton
                            variant="danger"
                            onClick={handleDelete}
                            className="me-2 w-100"
                            icon={BsTrash}
                            label="Confirm"
                        />

                        <BtIconButton
                            variant="secondary"
                            onClick={() => navigate(returnUrl)}
                            className="w-100"
                            icon={BsXCircle}
                            label="Cancel"
                        />
                    </div>
                </BtCard.Footer>
            </BtCard>
        </>)
}

export default CustomerBillDelete