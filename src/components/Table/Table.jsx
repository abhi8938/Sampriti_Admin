import React, {Component, FunctionComponent, useEffect} from 'react';
import {Column, Table, Cell, TableLoadingOption, RenderMode} from "@blueprintjs/table";

import PropTypes from 'prop-types';
import {Col, Row} from "react-bootstrap";
import Card from "../Card/Card";
import FormInputs from "../FormInputs/FormInputs";


const CustomTable = ({columnSize, title,selected, handleToggle, filters, searchvalue, handleSearch, list, loading, goToNextPage, goToPreviousPage, columns, columnWidths}) => {

    return (
        <Row>
            <Card
                title={title}
                content={
                    <Row md={12}>
                        {filters.map((value, index) => <Col sm={columnSize} className='toggle_Item'>
                            <p>{value.toUpperCase()}</p>
                            <span
                                className={selected === value ? 'toggle_custom toggle_custom_active' : 'toggle_custom '}
                                data-color="black"
                                onClick={() => {
                                    handleToggle(value);
                                }}
                            />
                        </Col>)}
                        <Col sm={3} className="Search_container">
                            <FormInputs
                                ncols={["col-md-10"]}
                                properties={[
                                    {
                                        type: "search",
                                        bsClass: "form-control",
                                        placeholder: "Search",
                                        value: searchvalue,
                                        onChange: e => handleSearch(e)
                                    }
                                ]}/>
                        </Col>
                    </Row>}/>
            <Table
                numRows={loading && list.length === 0 ? 20 : list.length}
                loadingOptions={loading ? [TableLoadingOption.CELLS] : []}
                renderMode={RenderMode.NONE}
                columnWidths={columnWidths}>
                {columns.map(column => <Column className={'columns_table'} name={column.name} cellRenderer={column.cellRenderer}/>)}
            </Table>
            <div className="pagination">
                <button onClick={() => goToPreviousPage(list[0].id)} disabled={false}>
                    {'<'}
                </button>
                {' '}
                <button onClick={() => goToNextPage(list[list.length - 1].id)} disabled={false}>
                    {'>'}
                </button>
            </div>
        </Row>
    );

}

CustomTable.propTypes = {
    columnSize:PropTypes.number,
    title:PropTypes.string,
    columns: PropTypes.array,
    selected: PropTypes.string,
    handleToggle: PropTypes.func,
    filters: PropTypes.arrayOf(PropTypes.string),
    searchvalue: PropTypes.string,
    handleSearch: PropTypes.func,
    list: PropTypes.array,
    loading: PropTypes.bool,
    goToNextPage: PropTypes.func,
    goToPreviousPage: PropTypes.func,
    columnWidths:PropTypes.array
};

export default CustomTable;
