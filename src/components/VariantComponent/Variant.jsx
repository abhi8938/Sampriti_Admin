/*DONE
    - DROPDOWN - Select total variants(DONE)
    - LIST - render input components for total variants(DONE)
    - LISTITEM -
      - IMAGE - uploadInput(DONE)
      - price - CustomTextInput(DONE)
      - quantity - CustomTextInput, dropdown(DONE)
      - stock - CustomTextInput(DONE)
      - status - dropdown(DONE)
*
* */

import React, {
    FunctionComponent,
    useEffect,
    useState,
} from "react"; // importing FunctionComponent
import './variant.css';
import PropTypes from 'prop-types';
import Resizer from 'react-image-file-resizer';
import upload_img from '../../assets/Upload_icon.svg';
import PlainListDropDown from "../PlainListDropDown/PlainListDropDown";
import CustomTextInput from "../CustomTextInput";
const baseFormat = {
    quantity: {value: 'Enter', unit: 'Select'},
    images: upload_img,
    price: 'Enter',
    stock: 'Enter',
    status: 'Select'
}
const Variant =
    ({
         list,
         setList ,
         variantsTotal = '1'
     }) => {
        const [total, setTotal] = useState(variantsTotal);

        const handleTotal = () => {
            let newData = [];
            for (let i = 1; i <= parseInt(total); i++) {
                newData.push({
                    quantity: {value: 'Enter', unit: 'Select'},
                    images: upload_img,
                    price: 'Enter',
                    stock: 'Enter',
                    status: 'Select'
                })
            }
            setList({set: newData});
        }

        const onChange = async (event, index) => {
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                280,
                'JPEG',
                100,
                0,
                (uri) => {
                    console.log('resized image', uri);
                    handleChange(index, 'images', uri)
                },
                'base64'
            );
        };

        const handleChange = (index, key, value, key2) => {
            let prevList = list.set;
            if (key2) {
                prevList[index][key][key2] = value
            } else {
                prevList[index][key] = value;
            }
            setList({set: prevList});
        }

        useEffect(() => {
            handleTotal()
            return () => {
            }
        }, [total])

        return (
            <div className={"variant_parent "}>
                <PlainListDropDown style={'dropdownType_digit'} selected={total}
                                   onSelectItem={(selected => setTotal(selected.data.name))}
                                   listType={'DIGIT_DROP'}
                                   title={'Total Variations'}/>
                {list.set.map((el, index) => <div className={'variation_item'}>
                    <div>
                        <CustomTextInput value={el.quantity.value}
                                         onChange={(event) => handleChange(index, 'quantity', event.target.value, 'value')}
                                         type={'text'}
                                         title={'quantity'}
                                         onblur={() => {
                                             if (el.quantity.value.length === 0) {
                                                 handleChange(index, 'quantity', baseFormat.quantity.value, 'value')
                                             }
                                             return;
                                         }}
                                         onfocus={() => {
                                             if (el.quantity.value !== baseFormat.quantity.value) return;
                                             handleChange(index, 'quantity', '', 'value')
                                         }}
                                         style={'size_input'}
                                         inputStyle={'size_text_input'}

                        />
                        <PlainListDropDown style={'dropdownType_Unit'} selected={el.quantity.unit}
                                           onSelectItem={(selected => handleChange(index, 'quantity', selected.data.name, 'unit'))}
                                           listType={'UNIT'}
                                           title={'unit'}/>
                    </div>
                    <CustomTextInput value={el.price}
                                     title={'price'}
                                     onChange={(event) => handleChange(index, 'price', event.target.value)}
                                     type={'text'}
                                     onblur={() => {
                                         if (el.price.length === 0) {
                                             handleChange(index, 'price', baseFormat.price)
                                         }
                                         return;
                                     }}
                                     onfocus={() => {
                                         if (el.price !== baseFormat.price) return;
                                         handleChange(index, 'price', '')
                                     }}
                                     style={'size_input'}
                                     inputStyle={'size_text_input'}

                    />
                    <CustomTextInput value={el.stock}
                                     title={'stock'}
                                     onChange={(event) => handleChange(index, 'stock', event.target.value)}
                                     type={'text'}
                                     onblur={() => {
                                         if (el.stock.length === 0) {
                                             handleChange(index, 'stock', baseFormat.stock)
                                         }
                                         return;
                                     }}
                                     onfocus={() => {
                                         if (el.stock !== baseFormat.stock) return;
                                         handleChange(index, 'stock', '')
                                     }}
                                     style={'size_input'}
                                     inputStyle={'size_text_input'}

                    />
                    <PlainListDropDown selected={el.status}
                                       onSelectItem={(selected => handleChange(index, 'status', selected.data.name))}
                                       listType={'status'}
                                       title={'status'}/>
                    <div>
                        <input
                            type="file"
                            name="itemImage"
                            className="custom-file-input"
                            onChange={event => onChange(event, index)}/>
                        <img src={el.images} alt={'upload'} style={{width: `30%`, height: `25%`}}/>
                        <text>Drag product image or <a>Upload Manually</a></text>
                    </div>
                </div>)}
            </div>
        );
    };

Variant.prototype = {
    list: PropTypes.array,
    setList: PropTypes.func,
};

export default Variant;
