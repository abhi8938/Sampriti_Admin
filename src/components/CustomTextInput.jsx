import React from "react";
import PropTypes from "prop-types";


const CustomTextInput = ({
                                    title,
                                    value,
                                    onChange,
                                    type,
                                    style,
                                    titleStyle,
                                    spanStyle,
                                    inputStyle,
                                    onfocus,
                                    onblur,
                                    logo,
    placeholder,
    disable
}) => {
    return (
        <div className={style}>
            {title == undefined ? null : <text className={titleStyle}>{title}</text>}
            <div>
                {logo !== undefined ? <img src={logo}/> : null}
                {<input onBlur={onblur} className={inputStyle} type={type} value={value} onChange={onChange}
                       onFocus={onfocus} disabled={disable} placeholder={placeholder}/>}
            </div>
            <span className={spanStyle}/>
        </div>
    );
};
CustomTextInput.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    style: PropTypes.string,
    titleStyle: PropTypes.string,
    spanStyle: PropTypes.string,
    inputStyle: PropTypes.string,
    onfocus: PropTypes.func,
    onblur: PropTypes.func,
    logo: PropTypes.any,
    disable:PropTypes.bool,
    placeholder: PropTypes.string

};

export default CustomTextInput;