import React, {
    FunctionComponent,
    useEffect,
    useState,
} from "react"; // importing FunctionComponent
import './PLDD.css';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCheck} from "@fortawesome/free-solid-svg-icons";
import Services from "../../service";

const service = new Services();
const PlainListDropDown =
    ({
         selected,
         onSelectItem,
         title,
         display = false,
         rotateIcon = 0,
         logo,
         listType,
         list = [],
         black,
         style,
         parentSubCategory,
         parentSubCategoryItem
     }) => {
        const [displayMenu, toggleDropDown] = useState(display);
        const [rotate, toggleRotate] = useState(rotateIcon);
        const [data, setData] = useState(list);
        const getData = async () => {
            let NewList = []
            try {
                if (listType && listType === 'categories') {
                    NewList = await service.getGories(listType)
                }
                if (listType && listType === 'subCategories') {
                    NewList = await service.getGories(listType, parentSubCategory ? parentSubCategory : undefined)
                }
                if (listType && listType === 'subCategoryItems') {
                    NewList = await service.getGories(listType, parentSubCategoryItem ? parentSubCategoryItem : undefined)
                }
                if (listType && listType === 'taxable') {
                    NewList = {
                        data: [{data: {name: "true"}}, {data: {name: "false"}}]
                    }
                }
                if (listType && listType === 'role') {
                    const baseData = ['MasterAdmin', 'SubAdmin', 'StoreManager', 'Delivery']
                    const data = []
                    baseData.map(item => {
                        return data.push({data: {name: item.toUpperCase()}})
                    })
                    NewList = {data}
                }
                if (listType && listType === 'status') {
                    const baseData = ['AVAILABLE', 'NOTAVAILABLE']
                    const data = []
                    baseData.map(item => {
                        return data.push({data: {name: item.toUpperCase()}})
                    })
                    NewList = {data}
                }
                if (listType && listType === 'rating') {
                    const baseData = [1, 2, 3, 4, 5]
                    const data = []
                    baseData.map(item => {
                        return data.push({data: {name: item}})
                    })
                    NewList = {data}
                }
                if (listType && listType === 'DIGIT_DROP') {
                    const baseData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    const data = []
                    baseData.map(item => {
                        return data.push({data: {name: item}})
                    })
                    NewList = {data}
                }
                if (listType && listType === 'UNIT') {
                    const baseData = ["MG", "G", "L", "ML", "KG"]
                    const data = []
                    baseData.map(item => {
                        return data.push({data: {name: item}})
                    })
                    NewList = {data}
                }
            } catch (e) {
                return alert('ERROR:' + e.message);
            }
            if (NewList && NewList.data) setData(NewList.data);
            return
        }

        useEffect(() => {
            getData()
            return () => {}
        }, [parentSubCategory,parentSubCategoryItem])

        function hideDropdownMenu() {
            toggleDropDown(false);
            toggleRotate(0);
            document.removeEventListener("click", hideDropdownMenu);
        }

        function showDropdownMenu() {
            if (displayMenu === false) {
                toggleDropDown(true);
                toggleRotate(180);
                document.addEventListener("click", hideDropdownMenu);
            }
        }

        return (
            <div className={"plainListDropDown " + style}>
                <text>{title}</text>
                <div onClick={showDropdownMenu}>
                    {logo !== undefined ? <img src={logo}/> : null}
                    <text style={{borderLeftColor: black !== undefined ? "black" : '#fdfdfd'}}>{selected}</text>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        transform={{rotate: rotate}}
                        color={'#000'}
                    />
                </div>
                {displayMenu ? (
                    <ul>
                        {data.length === 0 ? <li>No Data</li> : data.map((element, index) => (
                            <li onClick={() => onSelectItem(element)} key={element.id}>
                                {`${element.data.name}`}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    };

PlainListDropDown.prototype = {
    selected: PropTypes.any,
    onSelectItem: PropTypes.func,
    display: PropTypes.bool,
    rotateIcon: PropTypes.number,
    logo: PropTypes.any,
    listType: PropTypes.string,
    list: PropTypes.array,
    title: PropTypes.string,
    style: PropTypes.string,
    parentSubCategory: PropTypes.string,
    parentSubCategoryItem: PropTypes.string
};

export default PlainListDropDown;
