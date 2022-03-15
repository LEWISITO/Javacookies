import React from 'react'
import { useSelector } from 'react-redux'
import LogoutButton from "../layout/LogoutButton"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const Header = () => {
    //get the user object from the store
    const { user } = useSelector(state => state.auth)

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="#home">
                            <img
                                src="logo513.png"
                                width="100"
                                height=""
                                className=""
                                alt="error"
                            /> RCPD Fabrication Co.
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/products">Products</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/services">Services</Nav.Link>
                            <Nav.Link href="/contacts">Contacts</Nav.Link>
                            <Nav.Link href="/faqs">FAQs</Nav.Link>
                    
                            {user ? <>  {/* checking if user is logged in */}
                                {/* if user is logged in, display the dropdown title as the username */}
                                <NavDropdown title={user.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/password/update">Update Password</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item><LogoutButton /></NavDropdown.Item>
                                </NavDropdown>
                                {user.role === 'Admin' ? 
                                    <>  {/** if user is logged in and role is Admin, display these links */}
                                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/admin/new/user">Register user (Admin)</NavDropdown.Item>
                                            <NavDropdown.Item href="/admin/users">All users (Admin)</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/admin/product/new">Create Product</NavDropdown.Item>
                                            <NavDropdown.Item href="/admin/products">Get All Products</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/admin/service/new">Create Service</NavDropdown.Item>
                                            <NavDropdown.Item href="/admin/services">Get All Services</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/admin/category/new">Create Category</NavDropdown.Item>
                                            <NavDropdown.Item href="/admin/categories">Get All Categories</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/admin/audits">Get All Audits</NavDropdown.Item>
                                        </NavDropdown>
                                    </> :
                                    <> {/** if user is logged in and role is Staff, display these links */}
                                        <NavDropdown title="Staff" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/admin/product/new">Create Product</NavDropdown.Item>
                                            <NavDropdown.Item href="/admin/products">Get All Products</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/admin/service/new">Create Service</NavDropdown.Item>
                                            <NavDropdown.Item href="/admin/services">Get All Services</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/admin/category/new">Create Category</NavDropdown.Item>
                                            <NavDropdown.Item href="/admin/categories">Get All Categories</NavDropdown.Item>
                                        </NavDropdown>
                                    </>}
                            </> : <> {/** else, user is NOT logged in, display the login button */}
                                <Nav.Link href='/login'>Login</Nav.Link>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header