import React from "react";
import TableCellText from './TableCellText'

function Table(props) {
    const shouldSort = props.shouldSort
    const onTableAction = props.onTableAction
    const defaultSort = props.defaultSort || { key: '_id', direction: 'asc' }
    const [sortConfig, setSortConfig] = React.useState(defaultSort)
    const isLoading = props.isLoading

    const requestSort = (key) => {
        let direction = 'desc'
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc'
        }
        setSortConfig({ key, direction })
    }

    const firstUpdate = React.useRef(true)
    React.useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        if (shouldSort) {
            shouldSort(sortConfig)
        }
    }, [sortConfig])

    const columns = props.columns || []
    const data = props.data || []
    const unique_key = props.unique_key || '_id'

    return (
        <>
            <div className="table">
                <thead>
                    <tr>
                        {columns.map((col) => {
                            let columnName = col.name
                            let isSortable = _.get(col, 'sort', false)
                            return <th key={columnName}
                                style={{
                                    textDecoration: isSortable === true ? 'underline' : 'none',
                                    textUnderlinePosition: 'under',
                                    cursor: isSortable === true ? 'pointer' : 'auto'
                                }} onClick={() => {
                                    if (isSortable === false) {
                                        return
                                    }
                                    requestSort(columnName)
                                }}>{col.title}{sortConfig.key === columnName ? <>{sortConfig.direction === 'asc' ? <>↓</> : <>↑</>}</> : null}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ?
                        <tr>
                            <td colSpan={columns.length}>
                                <div className='col-12 text-center d-block'>
                                    <div className='spinner-border' role='status'>
                                        <span className='sr-only'>Loading...</span>
                                    </div>
                                </div>
                            </td>
                        </tr> :
                        <>
                            {data.map((row) => {
                                return <tr key={row[unique_key]}>
                                    {columns.map((col) => {
                                        let className = col.class ? col.class : ''
                                        let columnName = col.name
                                        let value = _.get(row, col.name, '')

                                        // Convert boolean values to string so that they are visible in table
                                        if (value === true || value === false || value === 0) {
                                            value = value.toString()
                                        }
                                        const Component = col.component || TableCellText
                                        const dynamicProps = col.props || {}

                                        let RenderComponent = <Component value={value} data={row} onTableAction={onTableAction} {...dynamicProps}></Component>

                                        return <td key={columnName} className={className} >
                                            {RenderComponent}
                                        </td>
                                    })}
                                </tr>
                            })
                            }
                        </>
                    }
                </tbody >
            </div >
            {(data.length === 0) ? <div className='responsive d-flex justify-content-center p-3 back-color'>No records found</div> : null}
        </>
    )
}

export default Table