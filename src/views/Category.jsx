/* -Category:(DONE)
     - TextInput(DONE)
     - button(DONE)
     - list of name - delete(DONE)
   -Sub Category(DONE)
     - Category DropDown
     - Input
     - button
     -list of name - parent - delete
   -Sub Categories Item(DONE)
     - Sub Category DropDown
     - Text Input
     - button
     -list of name - parent - delete
*
* */

import React, {Component} from 'react';
import services from "../service";
import DataGenerator from "../constants/dataGenerator";
import CustomForm from "../components/CustomForm/CustomForm";
import SmallTable from "../components/SmallTable/SmallTable";

const service = new services();
const generator = new DataGenerator();

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            show: false,
            categories: [],
            subCategories: [],
            subCategoryItems: [],
            editForm: null,
            searchCategories: '',
            searchSubCategories: '',
            searchSubCategoryItems: '',
            type: 'NONE',
        }
    }

    //Action Functions
    getGories = async (key, parent) => {
        this.setState({loading: true});
        const result = await service.getGories(key, parent);
        console.log('result',result);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            this.setState({[key]: result.data});
        } else if (result.status !== 200) {
            alert(result.data);
            return
        }
    }
    createGory = async (doc) => {
        this.setState({loading: true});
        const result = await service.createGory(doc);
        console.log('create_gory', result);
        this.setState({loading: false});

        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show})
            await this.getGories(doc.key)
        } else {
            alert(result.data);
            return
        }
    }
    updateGory = async (doc) => {
        this.setState({loading: true});
        const result = await service.updateGory(doc);
        this.setState({loading: false});
        console.log('update_Gory', result);
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show});
            await this.getGories(doc.key)
        } else {
            alert(result.data);
            return
        }
    }
    deleteGory = async (doc) => {
        this.setState({loading: true});
        const result = await service.deleteGory(doc);
        this.setState({loading: false});
        console.log('delete_Gory', result);
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            await this.getGories(doc.key)
        } else {
            alert(result.data);
            return
        }
    }
    searchGories = async (search, key) => {
        this.setState({loading: true});
        if (search.length === 0) {
            return this.getGories(key);
        }
        const response = await service.search(search, key);
        console.log('search Gories', response);
        this.setState({loading: false});
        if (response.status == 200) {
            this.setState({[key]: response.data});
        } else {
            alert(JSON.stringify(response.data));
        }
    };

    //Event handler
    componentDidMount() {
        this.getGories('categories');
        this.getGories('subCategories');
        this.getGories('subCategoryItems');
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'category_parent'}>
                <div>
                    {/*TODO:Create Table for category, subCategory, subCategoryItem, Products, Employees */}
                    <SmallTable
                        loading={this.state.loading}
                        listHeader={generator.listHeaders('Gories')}
                        handleClick={() => {
                            this.setState({editForm: null, type: 'categories'}, () => {
                                this.setState({show: !this.state.show})
                            })
                        }}
                        list={this.state.categories}
                        title={'categories'}
                        handleSearch={(e => {
                            this.setState({searchCategories: e.target.value})
                            this.searchGories(e.target.value, 'categories');
                        })}
                        handleDelete={doc => this.deleteGory(doc)}
                        searchvalue={this.state.searchCategories}/>
                    <SmallTable
                        loading={this.state.loading}
                        listHeader={generator.listHeaders('Gories')}
                        handleClick={() => {
                            this.setState({editForm: null, type: 'subCategories'}, () => {
                                this.setState({show: !this.state.show})
                            })
                        }}
                        list={this.state.subCategories}
                        title={'subCategories'}
                        handleSearch={(e => {
                            this.setState({searchSubCategories: e.target.value})
                            this.searchGories(e.target.value, 'subCategories');
                        })}
                        handleDelete={doc => this.deleteGory(doc)}
                        searchvalue={this.state.searchSubCategories}
                    />
                    <SmallTable
                        loading={this.state.loading}
                        listHeader={generator.listHeaders('Gories')}
                        handleClick={() => {
                            this.setState({editForm: null, type: 'subCategoryItems'}, () => {
                                this.setState({show: !this.state.show})
                            })
                        }}
                        list={this.state.subCategoryItems}
                        title={'subCategoryItems'}
                        handleSearch={(e => {
                            this.setState({searchSubCategoryItems: e.target.value})
                            this.searchGories(e.target.value, 'subCategoryItems');
                        })}
                        handleDelete={doc => this.deleteGory(doc)}
                        searchvalue={this.state.searchSubCategoryItems}
                    />
                </div>
                {/*Add Component to create category */}
                <CustomForm
                    type={this.state.type}
                    getData={generator.goryForm}
                    editForm={this.state.editForm}
                    show={this.state.show}
                    title={this.state.editForm ? 'Update' : 'Create'}
                    toggleShow={() => this.setState({show: !this.state.show})}
                    submit={(gory) => this.state.editForm ? this.updateGory(gory) : this.createGory(gory)}
                />
            </div>
        );
    }
}

Category.propTypes = {};

export default Category;
