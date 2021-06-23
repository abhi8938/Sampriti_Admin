/* -Filters(Toggle - on/off)(DONE)
      -All(DONE)
      -Customers(DONE)
      -Valet/Delivery(DONE)
      -Search Text Input(Text Input)(DONE)
   -User Table (List containing users like in COCOCARS or better) (Create Random user Data (Atleast 100) and populate database with it)(DONE)
   -Pagination for User Table(Next, Previous)
      - create 10 users(DONE)
      - set limit 20 (DONE)
      - send last user value when clicked next or first user when clicked previous (DONE)
   - Create Component to create/Edit User or product(DONE)
   - Update Password for user(DONE)
   - Button to disable/ban user(DONE)
   - After Finishing Copy Code to Products and Orders(DOne)
 TODO:
   - if (role = storemanager or delvery) add another field to add store name and id
   - take address as well
   - store - dropdown
*/

import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import DataTable from '../components/Table/Table';
import services from "../service";
import DataGenerator from "../constants/dataGenerator";
import {Cell} from "@blueprintjs/table";
import CustomForm from "../components/CustomForm/CustomForm";
import Button from "../components/CustomButton/CustomButton";

const service = new services();
const generator = new DataGenerator()
const Filters = ['All', 'Store', 'Customer', 'Delivery', 'SubAdmin'];

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'All',
            searchText: '',
            loading: false,
            users: [],
            show: false,
            editForm: null
        }
    }

    //Action Functions
    column = [
        {
            id: 0,
            name: 'Index',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{rowIndex + 1}</Cell>
            }
        },
        {
            id: 1,
            name: 'Full Name',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0 || this.state.users[rowIndex].data.fullName === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.users[rowIndex].data.fullName}</Cell>
            }
        },
        {
            id: 2,
            name: 'Contact',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0 || this.state.users[rowIndex].data.contactNumber === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.users[rowIndex].data.contactNumber}</Cell>
            }
        },
        {
            id: 3,
            name: 'Email',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0 || this.state.users[rowIndex].data.email === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.users[rowIndex].data.email}</Cell>
            }
        },
        {
            id: 4,
            name: 'Role',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0 || this.state.users[rowIndex].data.role === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.users[rowIndex].data.role}</Cell>
            }
        },
        {
            id: 5,
            name: 'Address',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0 || this.state.users[rowIndex].data.location === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.users[rowIndex].data.location.address ? this.state.users[rowIndex].data.location.address : this.state.users[rowIndex].data.location}</Cell>
            }
        },
        {
            id: 7,
            name: 'Status',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0 || this.state.users[rowIndex].data.status === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.users[rowIndex].data.status}</Cell>
            }
        },
        {
            id: 8,
            name: 'On Duty',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0 || this.state.users[rowIndex].data.onDuty === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.users[rowIndex].data.onDuty}`}</Cell>
            }
        },
        {
            id: 9,
            name: 'Edit',
            cellRenderer: (rowIndex, name) => {
                if (this.state.users.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell><Button style={'edit_button'} type="submit"
                                     onClick={() => this.toggleEdit(this.state.users[rowIndex])}>EDIT</Button></Cell>
            }
        }
    ];
    toggleEdit = (user) => {
        let newFormData = [];
        generator.userForm().map((el, index) => {
            const dataFormat = {
                id: user.id,
                value: user.data[el.key] ? typeof user.data[el.key] === "string" ? user.data[el.key] : user.data[el.key].address : 'NA',
                title: el.key === 'location' ? 'address' : el.key,
                placeholder: ``,
                disable: false,
                key: el.key
            }
            if (el.key === 'password' || el.key === 'role' || el.key === 'serviceType') return
            newFormData.push(dataFormat)
        })
        this.setState({editForm: newFormData}, () => {
            this.setState({show: !this.state.show})
        });
    }
    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };
    getusers = async (lastUser, firstUser) => {
        this.setState({loading: true});
        const result = await service.getUsers(lastUser, firstUser);
        console.log('users', result);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            this.setState({users: result.data});
        } else if (result.status !== 200) {
            alert(result.data);
            return
        }
    }
    createUser = async (user) => {
        this.setState({loading: true});
        const result = await service.createUser(user);
        console.log('create_user', result);
        this.setState({loading: false});

        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show})
            this.getusers()
        } else {
            alert(result.data);
            return
        }
    }
    updateUser = async (user) => {
        this.setState({loading: true});
        const result = await service.updateUser(user);
        this.setState({loading: false});
        console.log('update_user', result);
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show});
            this.getusers()
        } else {
            alert(result.data);
            return
        }
    }
    searchUsers = async (search) => {
        this.setState({loading: true});
        if (search.length === 0) {
            return this.getusers();
        }
        const response = await service.search(search,'userx');
        console.log('search', response);
        this.setState({loading: false});
        if (response.status == 200) {
            this.setState({users: response.data});
        } else {
            alert(JSON.stringify(response.data));
        }
    };

    //Event handler
    componentDidMount() {
        this.getusers()
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row style={{marginBottom: '3%'}}>
                        <Button fill type="submit" onClick={() => {
                            this.setState({editForm: null}, () => {
                                this.setState({show: !this.state.show})
                            })
                        }}>
                            Create user
                        </Button>
                    </Row>
                    <Row>
                        <Col md={12} className='table_Column'>
                            <DataTable
                                columnWidths={[80, null, null, null, null, 300, null, null, null]}
                                columnSize={2}
                                title={'Filter Users'}
                                columns={this.column}
                                goToPreviousPage={user => this.getusers(undefined, user)}
                                goToNextPage={user => this.getusers(user, undefined)}
                                loading={this.state.loading}
                                list={this.state.users}
                                handleSearch={(e => {
                                    this.setState({searchText: e.target.value})
                                    this.searchUsers(e.target.value);
                                })}
                                searchvalue={this.state.searchText}
                                filters={Filters}
                                selected={this.state.selected}
                                handleToggle={label => {
                                    this.setState({selected: label})
                                    let y = [];
                                    if (label === 'All') return this.getusers()
                                    this.state.users.map(value => {
                                        if (label.toUpperCase() === value.data.role) {
                                            y.push(value);
                                            return
                                        }
                                        return;
                                    });
                                    this.setState({users: y});
                                }
                                }/>
                        </Col>
                    </Row>
                </Grid>
                {/*TODO: Add Component to create User -Grocery */}
                <CustomForm
                    getData={generator.userForm}
                    editForm={this.state.editForm}
                    show={this.state.show}
                    title={this.state.editForm ? 'Update User' : 'Create User'}
                    toggleShow={() => this.setState({show: !this.state.show})}
                    submit={(user) => this.state.editForm ? this.updateUser(user) : this.createUser(user)}
                />
            </div>
        );
    }
}

Users.propTypes = {};

export default Users;
