import React from 'react';

function TableCellText(props) {
    let value = props.value || []

    // Convert boolean values to string so that they are visible in table
    if (value === true || value === false) {
        value = value.toString()
    }

    return (
        <div >{value}</div>
    )
}

export default TableCellText