/*TODO:
   - Edit Product Modifications
*/


import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import {Cell} from "@blueprintjs/table";
import productData from "../constants/Product_mock.json";
import DataTable from "../components/Table/Table";
import services from "../service";
import DataGenerator from "../constants/dataGenerator";
import CustomForm from "../components/CustomForm/CustomForm";
import Button from "../components/CustomButton/CustomButton";

const service = new services();
const generator = new DataGenerator();
const Filters = ['All', 'NotAvailable', 'Available'];

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'All',
            searchText: '',
            loading: false,
            products: [],
            show: false,
            editForm: null
        }
    }

    column = [
        {
            id: 0,
            name: 'Index',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{rowIndex + 1}</Cell>
            }
        },
        {
            id: 1,
            name: 'Name',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.products[rowIndex].data.name}</Cell>
            }
        },
        {
            id: 2,
            name: 'manufacturer',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.products[rowIndex].data.manufacturer}</Cell>
            }
        },
        {
            id: 3,
            name: 'Price',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.products[rowIndex].data.price}</Cell>
            }
        },
        {
            id: 4,
            name: 'quantity',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.quantity.value} ${this.state.products[rowIndex].data.quantity.unit}`}</Cell>
            }
        },

        {
            id: 5,
            name: 'description',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.products[rowIndex].data.description}</Cell>
            }
        },
        {
            id: 6,
            name: 'image',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.products[rowIndex].data.images}</Cell>
            }
        },
        {
            id: 7,
            name: 'features',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.status === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{this.state.products[rowIndex].data.features}</Cell>
            }
        },
        {
            id: 8,
            name: 'otherNames',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.otherNames === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.otherNames}`}</Cell>
            }
        },
        {
            id: 9,
            name: 'life',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.life === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.life}`}</Cell>
            }
        },
        {
            id: 10,
            name: 'rating',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.rating === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.rating}`}</Cell>
            }
        },
        {
            id: 11,
            name: 'category',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.category === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.category}`}</Cell>
            }
        },
        {
            id: 12,
            name: 'status',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.status === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.status}`}</Cell>
            }
        },
        {
            id: 13,
            name: 'variants',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.variants === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.variants.length}`}</Cell>
            }
        },
        {
            id: 14,
            name: 'Sub Categories',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.subCategories === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.subCategories}`}</Cell>
            }
        },
        {
            id: 15,
            name: 'Stock',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0 || this.state.products[rowIndex].data.stock === undefined) {
                    return <Cell></Cell>
                }
                return <Cell>{`${this.state.products[rowIndex].data.stock}`}</Cell>
            }
        },
        {
            id: 16,
            name: 'Edit',
            cellRenderer: (rowIndex, name) => {
                if (this.state.products.length === 0) {
                    return <Cell></Cell>
                }
                return <Cell><Button style={'edit_button'} type="submit"
                                     onClick={() => this.toggleEdit(this.state.products[rowIndex])}>EDIT</Button></Cell>
            }
        }
    ];
    toggleEdit = (product) => {
        let newFormData = [];
        generator.productForm().map((el, index) => {
            const dataFormat = {
                id: product.id,
                value: product.data[el.key] ? typeof product.data[el.key] === "string" ? product.data[el.key] : product.data[el.key].address : 'NA',
                title: el.key,
                placeholder: ``,
                disable: false,
                key: el.key
            }
            if (el.key === 'manufacturer' || el.key === 'category') return
            newFormData.push(dataFormat)
        })
        this.setState({editForm: newFormData}, () => {
            this.setState({show: !this.state.show})
        });
    }
    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    }
    getProducts = async (lastProduct, firstProduct) => {
        this.setState({loading: true});
        const result = await service.getProducts(lastProduct, firstProduct);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert('ERROR: ' + result.message);
            return
        }
        if (result.status === 200) {
            this.setState({products: result.data});
        } else if (result.status !== 200) {
            alert('ERROR: ' + result.data);
            return
        }
    }
    createProduct = async (product) => {
        this.setState({loading: true});
        const result = await service.createProduct(product);
        console.log('product_created', result);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert('ERROR: ' + result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            // this.setState({show: !this.state.show})
            // await this.getProducts()
        } else {
            alert('ERROR: ' + result.data);
            return
        }
    }
    updateProduct = async (product) => {
        this.setState({loading: true});
        const result = await service.updateProduct(product);
        this.setState({loading: false});
        console.log('update_product', result);
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show});
            this.getProducts()
        } else {
            alert(result.data);
            return
        }
    }
    searchProducts = async (search) => {
        this.setState({loading: true});
        if (search.length === 0) {
            return this.getusers();
        }
        const response = await service.search(search,'products');
        console.log('search Products', response);
        this.setState({loading: false});
        if (response.status == 200) {
            this.setState({products: response.data});
        } else {
            alert(JSON.stringify(response.data));
        }
    };
    componentDidMount() {
        this.getProducts()
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
                            Create Product
                        </Button>
                    </Row>
                    <Row>
                        <Col md={12} className='table_Column'>
                            <DataTable
                                columnWidths={[80, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]}
                                columnSize={3}
                                title={'Filter Products'}
                                columns={this.column}
                                goToPreviousPage={product => this.getProducts(undefined, product)}
                                goToNextPage={product => this.getProducts(product, undefined)}
                                loading={this.state.loading}
                                list={this.state.products}
                                handleSearch={(e => {
                                    this.setState({searchText: e.target.value})
                                    this.searchProducts(e.target.value);
                                })}
                                searchvalue={this.state.searchText}
                                filters={Filters}
                                selected={this.state.selected}
                                handleToggle={label => {
                                    this.setState({selected: label})
                                    let y = [];
                                    if (label === 'All') return this.getProducts()
                                    this.state.products.map(value => {
                                        if (label.toUpperCase() === value.data.status) {
                                            y.push(value);
                                            return
                                        }
                                        return;
                                    });
                                    this.setState({products: y});
                                }
                                }/>
                        </Col>
                    </Row>
                </Grid>
                {/*Add Component to create product */}
                <CustomForm
                    getData={generator.productForm}
                    editForm={this.state.editForm}
                    show={this.state.show}
                    title={this.state.editForm ? 'Update Product' : 'Create Product'}
                    toggleShow={() => this.setState({show: !this.state.show})}
                    submit={(product) => this.state.editForm ? this.updateProduct(product) : this.createProduct(product)}
                />
            </div>
        );
    }
}

Products.propTypes = {};

export default Products;
