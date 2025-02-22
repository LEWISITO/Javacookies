import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { servicesApi } from '../../api/servicesApi';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from '../../../actions';

const CreateService = () => {

    const [service, setService] = useState({
        name: '',
        price: '',
        category: ''
    })
    const [images, setImages] = useState([])

    const { loading, categories, error } = useSelector(state => state.categories)
    const [categoryList, setCategoryList] = useState(categories)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoryActions.getCategories())
    }, [])

    const alert = useAlert()
    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault(); 

        var formData = new FormData()

        Object.keys(service).forEach(key => {
            formData.set(key, service[key])
        });

        images.map(image => formData.append('images', image))

        const {name, price, category} = service

        if(name && price && category){
            try{
                const data = await servicesApi.createData(formData)
                if(data.success){
                    alert.success('Service created!')
                    navigate('/services')
                }
            }
            catch(error){
                alert.error('Enter service details')
            }
        }
        else{
            alert.error('Enter service details')
        }
    }

    return (
        categoryList ?
        <Fragment>
            <Form  onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={service.name} onChange={(e) => setService({...service, name: e.target.value}) } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price" value={service.price} onChange={(e) => setService({...service, price: e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={service.category} onChange={(e) => setService({ ...service, category: e.target.value })}>
                        <option selected>-</option>
                        {categoryList && categoryList.map(category => (
                             category?.type !== 'Product' && <option value={category.name}>{category.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Multiple files input example</Form.Label>
                    <Form.Control type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment >
        : <>Loading</>
    )
}

export default CreateService
