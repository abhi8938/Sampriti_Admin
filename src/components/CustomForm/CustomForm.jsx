/*TODO
   - get Array of objects containing inputData
   - render Inputs(DONE)
   - action button - submit(DONE)
   - create array of data for each form(DONE)
   - map over array and render inputs(DONE)
   - post request to server(DONE)
   - handle response(DONE)
   - handle error(DONE)
* */
import React, {useEffect, useState} from "react";
import close_logo from "../../assets/img/CLOSE.svg";
import './customForm.css';
import PropTypes from 'prop-types';
import CustomTextInput from "../CustomTextInput";
import PlainListDropDown from "../PlainListDropDown/PlainListDropDown";
import Button from "../CustomButton/CustomButton";
import Variant from "../VariantComponent/Variant";
import upload_img from "../../assets/Upload_icon.svg";

const dropdownList = ["role", "subCategory", 'subCategoryItem', "taxable", "category", "status", "rating", 'parent']
const CustomForm =
    ({
         type, getData, show, toggleShow, title, submit, editForm, variantsList = {
            set: [{
                quantity: {value: 'Enter', unit: 'Select'},
                images: upload_img,
                price: 'Enter',
                stock: 'Enter',
                status: 'Select'
            }]
        }
     }) => {
        const [list, setList] = useState({});
        const [err, setErr] = useState('');
        const [variants, setVariants] = useState(variantsList);
        const [parentSubCategory, setParentSubCategory] = useState('');
        const [parentSubCategoryItem, setParentSubCategoryItem] = useState('');

        useEffect(() => {
            if (editForm) return setList({set: editForm})
            setList({set: getData()})
        }, [editForm])
        useEffect(() => {
            if (err.length > 0) {
                alert('Error: ' + err);
            }
        }, [err])

        const handleSubmit = () => {
            setErr('');
            let data = {}
            list.set.map((el, index) => {
                if (type === 'categories' && el.key === 'parent') return
                if (el.value.length === 0 || el.key === undefined) return setErr('Invalid ' + el.title)
                if (el.value !== 'NA') {
                    if (type) data['key'] = type
                    data[el.key] = el.value
                }
                return
            });
            if (editForm) data['id'] = list.set[0].id
            console.log('data_inputs', data, err);
            if (err.length > 0 || data === {}) return
            submit(data);
            setList({set: getData()})
        }
        const handleVariants = (index, el, value) => {
            setVariants(value)
            setErr('');
            let dataX = list.set;
            dataX[index] = {
                id: el.id,
                title: el.title,
                value: value.set,
                placeholder: el.placeholder,
                key: el.key
            };
            setList({set: dataX});
        }
        const listType = (key) => {
            let listType = '';
            if (type === 'subCategories') {
                listType = 'categories'
            } else if (type === 'subCategoryItems') {
                listType = 'subCategories'
            } else if (key === 'category') {
                listType = 'categories'
            } else if (key === 'subCategory') {
                listType = 'subCategories'
            } else if (key === 'subCategoryItem') {
                listType = 'subCategoryItems'
            } else {
                listType = key
            }
            return listType
        }
        return show ? (
            <div className={'editModal'}>
                <div>
                    <div>
                        <img onClick={toggleShow} src={close_logo} alt={'close'}/>
                        <h4 style={{fontWeight: 'bold'}}>{title}</h4>
                        <div>
                            {list && list.set.map((el, index) => {
                                if (type === 'categories' && el.title === 'parent') return
                                if (el.key === 'variants') return <Variant list={variants} setList={variant => {
                                    handleVariants(index, el, variant)
                                }}/>
                                if (dropdownList.includes(el.key)) return <PlainListDropDown
                                    title={el.title.toUpperCase()}
                                    listType={listType(el.key)}
                                    onSelectItem={(item) => {
                                        let dataX = list.set;
                                        let value = item.data.name
                                        if (el.key === 'category') {
                                            setParentSubCategory(value)
                                        }
                                        if (el.key === 'subCategory') {
                                            setParentSubCategoryItem(value)
                                        }
                                        dataX[index] = {
                                            id: el.id,
                                            title: el.title,
                                            value: el.title === 'role' || el.title === 'status' ? value.toUpperCase() : value,
                                            placeholder: el.placeholder,
                                            key: el.key
                                        };
                                        setList({set: dataX});
                                    }}
                                    selected={el.value.length === 0 ? el.placeholder : el.value}
                                    parentSubCategory={parentSubCategory ? parentSubCategory : undefined}
                                    parentSubCategoryItem={parentSubCategoryItem ? parentSubCategoryItem : undefined}
                                />
                                return <CustomTextInput
                                    placeholder={el.placeholder}
                                    value={el.value}
                                    style={'entryField'}
                                    inputStyle={'entryField_input'}
                                    key={el.id + el.title}
                                    disable={el.disable}
                                    title={el.title.toUpperCase()}
                                    onChange={(event) => {
                                        let dataX = list.set;
                                        let value = event.target.value
                                        dataX[index] = {
                                            id: el.id,
                                            title: el.title,
                                            value: el.title === 'role' || el.title === 'status' ? value.toUpperCase() : value,
                                            placeholder: el.placeholder,
                                            key: el.key
                                        };
                                        setList({set: dataX});
                                    }}
                                    type={'text'}
                                    onblur={() => {
                                        if (el.value.length === 0) {
                                            let dataX = list.set;
                                            dataX[index] = {
                                                id: el.id,
                                                title: el.title,
                                                value: '',
                                                placeholder: el.placeholder,
                                                key: el.key

                                            };
                                            setList({set: dataX});
                                        }
                                        return;
                                    }}
                                    onfocus={() => {
                                        if (el.value !== el.placeholder) return;
                                        let dataX = list.set;
                                        dataX[index] = {
                                            id: el.id,
                                            title: el.title,
                                            value: '',
                                            placeholder: el.placeholder,
                                            key: el.key
                                        };
                                        setList({set: dataX});
                                    }}
                                />
                            })}
                        </div>
                        <Button style='button_submit' type="submit" onClick={() => handleSubmit()}>
                            {title}
                        </Button>
                    </div>
                </div>
            </div>
        ) : null

    }
CustomForm.propTypes = {
    type: PropTypes.string,
    getData: PropTypes.func,
    editForm: PropTypes.array,
    submit: PropTypes.func,
    title: PropTypes.string,
    show: PropTypes.bool,
    toggleShow: PropTypes.func,
}

export default CustomForm;
