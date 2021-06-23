/*
   - List - Header - Name - Parent - Edit - Delete (columns:Array of obj - width, component, ....)(DONE)
   - Edit/Delete Button
   - Loader for list
   - render List
* */

import React, {Component, FunctionComponent, useEffect} from 'react';
import Button from "../CustomButton/CustomButton";
import {Grid, Row, Col} from "react-bootstrap";
import './smallTable.css';
import PropTypes from 'prop-types';
import CustomTextInput from "../CustomTextInput";


const SmallTable = ({title, searchvalue, listHeader, handleSearch, list, loading, handleClick, handleEdit, handleDelete}) => {
    // useEffect(() => {
    //     console.log('list-' + title, list);
    //     return () => {
    //     }
    // }, [list]);
    return (
        <div className="smallTable_parent">
            <h3>{title.toUpperCase()} - LIST</h3>
            <Button fill type="submit" onClick={handleClick}>
                CREATE {title.toUpperCase()}
            </Button>
            {title === 'Banners' ? null : <CustomTextInput
                placeholder={'Search'}
                value={searchvalue}
                style={'searchField'}
                inputStyle={'searchField_input'}
                onChange={handleSearch}
            />}
            <div className={'smallTable card'}>
                <div>
                    {listHeader.map((header, index) => <div>
                        <text className={'header_text'}>{header}</text>
                    </div>)}
                </div>
                {loading ? <div style={{alignItems:'center', justifyContent:'center', display:"flex"}}>Loading</div> : list.length > 0 ? list.map((el, index) => <div>
                    <div>
                        <text className={'list_text'}>{index + 1}</text>
                    </div>
                    <div>
                        <text className={'list_text'}>{el.data.name}</text>
                    </div>
                    <div>
                        <text className={'list_text'}>{el.data.parent ? el.data.parent : "---"}</text>
                    </div>
                    <div>
                        <Button style={'delete_small'} fill type="submit" onClick={() =>{
                            let doc = {
                                key:title,
                                id:el.id
                            }
                            handleDelete(doc);
                        }}>
                            Delete
                        </Button>
                    </div>
                </div>) : <div style={{alignItems:'center', justifyContent:'center', display:"flex"}}>
                    <text>No {title}</text>
                </div>}
            </div>
        </div>
    );

}

SmallTable.propTypes = {
    title: PropTypes.string,
    searchvalue: PropTypes.string,
    handleSearch: PropTypes.func,
    handleClick: PropTypes.func,
    list: PropTypes.array,
    loading: PropTypes.bool,
    listHeader: PropTypes.array,
};

export default SmallTable;
