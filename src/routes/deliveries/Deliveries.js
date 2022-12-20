// Stylesheet
import './Deliveries.css';
// Navbar
import Navbar from '../../common/navbar/Navbar'
// React hooks
import { useEffect, useState } from "react";
// API calls
import { get } from "../../api/api-calls";
// Structure and dialogs
import DeliveryCard from "./structure/DeliveryCard"
import AddDelivery from './dialogs/AddDelivery';

export default function Deliveries() {

    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        get("deliveries", setDeliveries);
      }, []);

    return (
        <>
            <Navbar />
            {deliveries.length > 0 
                ? deliveries.map((delivery) => (
                    <DeliveryCard
                        delivery = {delivery}
                        deliveries = {deliveries}
                        setDeliveries = {setDeliveries}
                        key = {delivery.id}
                    />
                ))
                : <p>No deliveries yet</p>
            }
            <AddDelivery setDeliveries={setDeliveries}/>
        </>
    )
}