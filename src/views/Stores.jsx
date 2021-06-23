/*TODO:
    - Store Component - Card
     - Name - text
     - Address - text
     - rating
     - status
     - OnDuty
     - Total stock
     - Total sales
     - Total Refunds
     - Products - List - name + size + sales(Calculate) + INSTOCK
     - Employee - List - name + contact + email + onDuty + status
    - AddStore / Edit Store
     -Name
     -Address
     -Status
     -Products - dropdown - name + size
     -Employee - name + contact
* */

import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import DataTable from '../components/Table/Table';
import services from "../service";
import DataGenerator from "../constants/dataGenerator";
import {Cell} from "@blueprintjs/table";
import CustomForm from "../components/CustomForm/CustomForm";
import Button from "../components/CustomButton/CustomButton";

const service = new services();
const generator = new DataGenerator();

// const Filters = ['All', 'ACTIVE', 'NOTACTIVE'];

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'All',
            searchText: '',
            loading: false,
            stores: [],
            show: false,
            editForm: null
        }
    }

    //Action Functions
    toggleEdit = (store) => {
        let newFormData = [];
        generator.storeForm().map((el, index) => {
            const dataFormat = {
                id: store.id,
                value: store.data[el.key],
                title: el.key,
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
    getStores = async () => {
        this.setState({loading: true});
        const result = await service.getStores();
        console.log('stores', result);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            this.setState({stores: result.data});
        } else if (result.status !== 200) {
            alert(result.data);
            return
        }
    }
    createStore = async (store) => {
        this.setState({loading: true});
        const result = await service.createStore(store);
        console.log('createStore', result);
        this.setState({loading: false});

        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show})
            await this.getStores()
        } else {
            alert(result.data);
            return
        }
    }
    updateStore = async (store) => {
        this.setState({loading: true});
        const result = await service.updateStore(store);
        this.setState({loading: false});
        console.log('update_store', result);
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show});
            await this.getStores()
        } else {
            alert(result.data);
            return
        }
    }
    searchStores = async (search) => {
        this.setState({loading: true});
        if (search.length === 0) {
            return this.getStores();
        }
        const response = await service.search(search, 'stores');
        this.setState({loading: false});
        if (response.status == 200) {
            this.setState({stores: response.data});
        } else {
            alert(JSON.stringify(response.data));
        }
    };

    componentDidMount() {
        this.getStores()
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
                            Create Store
                        </Button>
                    </Row>
                    <Row>
                        <Col md={12} className='table_Column'>
                        </Col>
                    </Row>
                </Grid>
                {/*TODO: Add Component to create store */}
                <CustomForm
                    getData={generator.storeForm}
                    editForm={this.state.editForm}
                    show={this.state.show}
                    title={this.state.editForm ? 'Update Store' : 'Create Store'}
                    toggleShow={() => this.setState({show: !this.state.show})}
                    submit={(store) => this.state.editForm ? this.updateStore(store) : this.createStore(store)}
                />
            </div>
        );
    }
}

Stores.propTypes = {};

export default Stores;
