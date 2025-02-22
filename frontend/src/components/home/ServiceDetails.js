import { product } from "prelude-ls"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { servicesApi } from "../api/servicesApi"

const ServiceDetails = () => {

    const [service, setService] = useState({})
    var {id} = useParams()

    useEffect(()=>{
        let isMounted = true
        const fetchData = async () => {
            const {success, service} = await servicesApi.getSingleData(id)
            if(success && isMounted){
                setService(service)
            }
        }
        fetchData()
        return () => isMounted = false
    }, [])

    return (
        <div>
        {service.images && service.images.map(image => <img src={image.path ? image.path : ''} className="img-fluid" /> )}
            {service.name}
            {service.category}
            {service.price}
        </div>
    )
}

export default ServiceDetails