/*TODO:
    -Banner
     - Image Input
     - Text Input - label
     - button upload
* */

import React, {Component} from 'react';
import services from "../service";
import DataGenerator from "../constants/dataGenerator";
import CustomForm from "../components/CustomForm/CustomForm";
import SmallTable from "../components/SmallTable/SmallTable";

const service = new services();
const generator = new DataGenerator();

class Advertisement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            show: false,
            banners: [],
        }
    }

    //Action Functions
    getBanners = async () => {
        this.setState({loading: true});
        const result = await service.getBanners();
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            this.setState({banners: result.data});
        } else if (result.status !== 200) {
            alert(result.data);
            return
        }
    }
    createBanner = async (doc) => {
        this.setState({loading: true});
        const result = await service.createGory(doc);
        this.setState({loading: false});

        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            this.setState({show: !this.state.show})
            await this.getBanners()
        } else {
            alert(result.data);
            return
        }
    }
    deleteBanner = async (doc) => {
        this.setState({loading: true});
        const result = await service.deleteBanner(doc);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            alert(result.data);
            await this.getBanners()
        } else {
            alert(result.data);
            return
        }
    }
    //Event handler

    componentDidMount() {
        this.getBanners();

    }

    componentWillUnmount() {

    }
    render() {
        return (
            <div className="content">
                <SmallTable
                    loading={this.state.loading}
                    listHeader={generator.listHeaders('Banners')}
                    handleClick={() => {
                        this.setState({editForm: null}, () => {
                            this.setState({show: !this.state.show})
                        })
                    }}
                    list={this.state.banners}
                    title={'Banners'}
                    handleDelete={doc => this.deleteBanner(doc)}
                    />
                {/*TODO: Add Component to create Banner */}
                <CustomForm
                    getData={generator.bannerForm}
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

Advertisement.propTypes = {};

export default Advertisement;
