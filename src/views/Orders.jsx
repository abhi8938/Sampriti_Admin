/*TODO:
   -Title
   -Filters(Toggle - on/off)
      -All
      -Ongoing
      -Completed
      -Canceled by user
      -Rejected at doorstep
   -Search Text Input(Text Input + button)
   -Order Table (Create Random order Data (Atleast 100) and populate database with it)
   -Pagination for Order Table(Next, Previous)
*/
import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import {Cell} from "@blueprintjs/table";
import DataTable from "../components/Table/Table";
import services from "../service";
import DataGenerator from "../constants/dataGenerator";
import CustomForm from "../components/CustomForm/CustomForm";
import Button from "../components/CustomButton/CustomButton";

const service = new services();
const generator = new DataGenerator();
const Filters = ['All', 'Completed', 'Cancelled', 'Returned', 'Ongoing'];

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'All',
            searchText: '',
            loading: false,
            orders: [],
            show: false,
            editForm: null
        }
    }

    column = [
        {
            id: 0,
            name: 'Index',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{rowIndex + 1}</Cell>
            }
        },
        {
            id: 1,
            name: 'customer',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.orders[rowIndex].data.customer}</Cell>
            }
        },
        {
            id: 2,
            name: 'items',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.orders[rowIndex].data.items[0].name}</Cell>
            }
        },
        {
            id: 3,
            name: 'offer',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.orders[rowIndex].data.offer ? this.state.orders[rowIndex].data.offer : 'N/A'}</Cell>
            }
        },
        {
            id: 4,
            name: 'discount',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.orders[rowIndex].data.discount ? this.state.orders[rowIndex].data.discount : 'N/A'}</Cell>
            }
        },
        {
            id: 6,
            name: 'final cost',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0 || this.state.orders[rowIndex].data.status === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.orders[rowIndex].data.finalCost ? this.state.orders[rowIndex].data.finalCost : 'N/A'}</Cell>
            }
        },
        {
            id: 7,
            name: 'order rating',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0 || this.state.orders[rowIndex].data.status === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.orders[rowIndex].data.orderRating ? this.state.orders[rowIndex].data.orderRating : 'N/A'}</Cell>
            }
        },
        {
            id: 8,
            name: 'delivery rating',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.deliveryRating ? this.state.orders[rowIndex].data.deliveryRating : 'N/A'}`}</Cell>
            }
        },
        {
            id: 9,
            name: 'vendorRating',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.vendorRating ? this.state.orders[rowIndex].data.vendorRating : 'N/A'}`}</Cell>
            }
        },
        {
            id: 10,
            name: 'rating',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.rating ? this.state.orders[rowIndex].data.rating : 'N/A'}`}</Cell>
            }
        },
        {
            id: 12,
            name: 'status',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.status}`}</Cell>
            }
        },
        {
            id: 14,
            name: 'payment status',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.paymentStatus ? this.state.orders[rowIndex].data.paymentStatus : 'N/A'}`}</Cell>
            }
        },
        {
            id: 15,
            name: 'payment type',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.paymentType ? this.state.orders[rowIndex].data.paymentType : 'N/A'}`}</Cell>
            }
        },
        {
            id: 16,
            name: 'time assigned',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.timeAssigned ? this.state.orders[rowIndex].data.timeAssigned : 'N/A'}`}</Cell>
            }
        },
        {
            id: 17,
            name: 'time delivered',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.timeDelivered ? this.state.orders[rowIndex].data.timeDelivered : 'N/A'}`}</Cell>
            }
        },
        {
            id: 18,
            name: 'delivery boy',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.deliveryBoy ? this.state.orders[rowIndex].data.deliveryBoy : 'N/A'}`}</Cell>
            }
        },
        {
            id: 19,
            name: 'vendor',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.vendor ? this.state.orders[rowIndex].data.vendor.contact : 'N/A'}`}</Cell>
            }
        },
        {
            id: 20,
            name: 'vendor name',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.orders[rowIndex].data.vendorName ? this.state.orders[rowIndex].data.vendorName : 'N/A'}`}</Cell>
            }
        },
        {
            id: 21,
            name: 'Edit',
            cellRenderer: (rowIndex, name) => {
                if (this.state.orders.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell><Button style={'edit_button'} type="submit"
                                     onClick={() => this.toggleEdit(this.state.orders[rowIndex])}>Update</Button></Cell>
            }
        }
    ];
    toggleEdit = (order) => {
        let newFormData = [];
        generator.orderForm().map((el, index) => {
            const dataFormat = {
                id: order.id,
                value: order.data[el.key] ? typeof order.data[el.key] === "string" ? order.data[el.key] : order.data[el.key].address : 'NA',
                title: el.key,
                placeholder: ``,
                disable: false,
                key: el.key
            }
            if (el.key === 'manufacturer' || el.key === 'brand' || el.key === 'category') return
            newFormData.push(dataFormat)
        })
        newFormData.push({
            id: order.id,
            value: order.data['status'],
            title: 'status',
            placeholder: `status`,
            disable: false,
            key: 'status'
        })
        this.setState({editForm: newFormData}, () => {
            this.setState({show: !this.state.show})
        });
    }
    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    }
    getOrders = async (lastorder, firstorder) => {
        this.setState({loading: true});
        const result = await service.getOrders(lastorder, firstorder);
        console.log('orders', result);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            this.setState({orders: result.data});
        } else if (result.status !== 200) {
            alert(result.data);
            return
        }
    }
    createOrder = async (order) => {
        this.setState({loading: true});
        const result = await service.createOrder(order);
        console.log('order_created', result);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show})
            this.getorders()
        } else {
            alert(result.data);
            return
        }
    }
    updateOrder = async (order) => {
        this.setState({loading: true});
        const result = await service.updateOrder(order);
        this.setState({loading: false});
        console.log('update_order', result);
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show});
            this.getorders()
        } else {
            alert(result.data);
            return
        }
    }
    searchOrders = async (search) => {
        this.setState({loading: true});
        if (search.length === 0) {
            return this.getusers();
        }
        const response = await service.search(search, 'orders');
        console.log('search orders', response);
        this.setState({loading: false});
        if (response.status == 200) {
            this.setState({users: response.data});
        } else {
            alert(JSON.stringify(response.data));
        }
    };

    componentDidMount() {
        this.getOrders()
    }

    componentWillUnmount() {

    }

    render() {
        const columnWidth = () => {
            const width = []
            this.column.map(el => {
                width.push(null)
            })
            return width
        }
        return (
            <div className="content">
                <Grid fluid>

                    <Row>
                        <Col md={12} className='table_Column'>
                            <DataTable
                                columnWidths={columnWidth()}
                                columnSize={2}
                                title={'Filter orders'}
                                columns={this.column}
                                goToPreviousPage={order => this.getOrders(undefined, order)}
                                goToNextPage={order => this.getOrders(order, undefined)}
                                loading={this.state.loading}
                                list={this.state.orders}
                                handleSearch={(e => {
                                    this.setState({searchText: e.target.value})
                                    this.searchOrders(e.target.value);
                                })}
                                searchvalue={this.state.searchText}
                                filters={Filters}
                                selected={this.state.selected}
                                handleToggle={label => {
                                    this.setState({selected: label})
                                    let y = [];
                                    if (label === 'All') return this.getOrders()
                                    this.state.orders.map(value => {
                                        if (label.toUpperCase() === value.data.status) {
                                            y.push(value);
                                            return
                                        }
                                        return;
                                    });
                                    this.setState({orders: y});
                                }
                                }/>
                        </Col>
                    </Row>
                </Grid>
                {/*TODO: Add Component to create order -Grocery */}
                <CustomForm
                    getData={generator.orderForm}
                    editForm={this.state.editForm}
                    show={this.state.show}
                    title={this.state.editForm ? 'Update order' : 'Create order'}
                    toggleShow={() => this.setState({show: !this.state.show})}
                    submit={(order) => this.state.editForm ? this.updateOrder(order) : this.createOrder(order)}
                />
            </div>
        );
    }
}

Orders.propTypes = {};

export default Orders;
