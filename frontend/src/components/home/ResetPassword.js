import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, InputGroup } from 'react-bootstrap'
import { userActions, clearErrors } from '../../actions'
import { userConstants } from '../../constants'
import Metadata from './../layout/Metadata'

const ResetPassword = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()

    const { error, success, loading } = useSelector(state => state.forgotPassword)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState('false')
    const [showConfirm, setShowConfirm] = useState('false')

    const showPasswordToggle = () => setShowPassword(!showPassword)
    const showConfirmToggle = () => setShowConfirm(!showConfirm)

    useEffect(() => {
        if (success) {
            navigate('/login')
            alert.success('Password updated successfully')
            dispatch({ type: userConstants.NEW_PASSWORD_RESET })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            dispatch({ type: userConstants.NEW_PASSWORD_RESET })
        }
    }, [dispatch, alert, error, success, navigate])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(userActions.resetPassword(token, { password, confirmPassword }))
    }

    return (
        <>
            <Metadata title={'Reset Password'} />
            <Container fluid>
                <Row className='justify-content-md-center'>
                    <Card style={{ maxWidth: '30rem', margin: '50px auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '50px 0 20px 0' }}>Update Password</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Form.Group style={{ marginTop: '5px' }}>
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showPassword ? "password" : "text"}
                                            placeholder="••••••"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            minlength="6"
                                            required
                                        />
                                        <Button variant="secondary" onClick={showPasswordToggle}>
                                            <span className="fa-sm">
                                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </span>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group style={{ marginTop: '5px' }}>
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showConfirm ? "password" : "text"}
                                            placeholder="••••••"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            minlength="6"
                                            required
                                        />
                                        <Button variant="secondary" onClick={showConfirmToggle}>
                                            <span className="fa-sm">
                                                <i className={showConfirm ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </span>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <center>
                                    <Button
                                        type='submit'
                                        style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}>
                                        {loading ? (
                                            <span>
                                                <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                            </span>
                                        ) : (
                                            <span>Change Password</span>
                                        )}
                                    </Button>
                                </center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default ResetPassword
