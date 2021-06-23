/* TODO:
   1.Create Login Screen:
     - Brand Logo(DONE)
     - Brand Name(DONE)
     - Input Email(DONE)
     - Input Password(DONE)
   2.Connect with backend(DONE)
   3.save token in session storage(DONE)
   4.navigate to /admin/overview(DONE)
* */
import React, {Component} from 'react';
import ROUTES from '../constants/routes';
import FormInputs from "../components/FormInputs/FormInputs";
import services from '../service';
import Button from "../components/CustomButton/CustomButton.jsx";
import Card from "../components/Card/Card";

const service = new services();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            error: '',
        }
    }


    handleChange = (name) => (event) => {
        this.setState({error: false});
        this.setState({[name]: event.target.value});
    };

    loginUser = async () => {
        if (this.state.email.length < 4) {
            alert('Invalid email');
            this.setState({error: true});
            return
        }
        if (this.state.password.length < 4) {
            alert('Invalid password');
            this.setState({error: true});
            return
        }
        this.setState({loading: true});
        const result = await service.Authorize(this.state.email, this.state.password);
        this.setState({loading: false});
        if (result.name === 'Error') {
            alert(result.message);
            return
        }
        if (result.status === 200) {
            localStorage.setItem('TOKEN', result.data);
            console.log('TOKEN',result);
            this.props.navigation.history.replace(ROUTES[0].layout + ROUTES[0].path);
        } else if (result.status !== 200) {
            alert(result.data);
            return
        }

    };

    componentDidMount() {
        console.log('navigation', this.props.navigation)
        if (localStorage.getItem('TOKEN') !== null) {
            return this.props.navigation.history.replace(ROUTES[0].layout + ROUTES[0].path);
        }
        return
    }

    // componentWillReceiveProps(nextProps) {
    //
    // }
    //
    //
    // componentWillUpdate(nextProps, nextState) {
    //
    // }
    //
    // componentDidUpdate(prevProps, prevState) {
    //
    // }
    //
    // componentWillUnmount() {
    //
    // }

    render() {

        const site = 'http://sampritionline.com';
        return (
            <div className='content login_parent'>
                <a
                    href={site}
                >
                    <div>
                        <img className="img" src={require("../assets/sampriti.jpeg")} alt="logo_image"/>
                    </div>
                </a>
                <Card
                    customClass='card_custom'
                    title="Login Admin"
                    content={
                        <form className='form_custom'>
                            <FormInputs
                                ncols={["col-md-10", "col-md-10"]}
                                properties={[
                                    {
                                        label: "Email",
                                        type: "email",
                                        bsClass: "form-control ",
                                        placeholder: "Ex:John@masalaStory.com",
                                        value: this.state.email,
                                        labelStyle: 'input_label',
                                        onChange: this.handleChange("email")
                                    },{
                                        label: "Password",
                                        type: "password",
                                        bsClass: "form-control input_password",
                                        placeholder: "XXXXXXXXXX",
                                        value: this.state.password,
                                        labelStyle: 'input_label_password',
                                        onChange: this.handleChange("password")
                                    }
                                ]}
                            />
                        </form>}/>
                <Button bsStyle="" fill type="submit" onClick={() => this.loginUser()}>
                    Login
                </Button>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
