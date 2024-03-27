import React from 'react'
import PropTypes from 'prop-types'

const Pagination = (props) => {
    let currentPage = props.currentPage
    const totalPages = props.totalPages                 // This is total count of records available in database
    const contentColor = props.contentColor || '#fff'
    const contentFontColor = props.contentFontColor || '#000'
    const totalItems = props.totalItems || 0
    const totalAllItems = props.totalAllItems || 0          // This is count of records fetched after filtering the data
    const itemsPerPage = props.itemsPerPage || 0
    const isFiltered = props.isFiltered || false

    const addPageNumbers = (totalPages, currentPage) => {
        let numbers = []
        let pad = 3

        if (currentPage <= pad) {
            for (let index = 1; index < currentPage; index++) {
                numbers.push(index)
            }
        }

        if (currentPage > pad) {
            for (let index = currentPage - pad; index < currentPage; index++) {
                numbers.push(index)
            }
        }

        numbers.push(currentPage)

        if (totalPages > currentPage) {
            for (let index = currentPage + 1; index <= totalPages; index++) {
                if (index > currentPage + pad) {
                    break
                }
                numbers.push(index)
            }
        }

        return numbers
    }


    const handleClick = (page) => {
        if (props.onItemClick) {
            props.onItemClick(page)
        }
    }

    let numbers = addPageNumbers(totalPages, currentPage)
    let start = itemsPerPage * (currentPage - 1) + 1
    let end = itemsPerPage * (currentPage)
    if (end > totalItems) {
        end = totalItems
    }

    let message = ''
    if (totalItems > 0) {
        message = `Showing ${start} to ${end} of ${totalItems} entries`
    }
    if (isFiltered) {
        message += ` (filtered from ${totalAllItems} total entries)`
    }
    return (
        <div className="pagination_wrapper">
            <div className="">
                {message}
            </div>
            <div className="">
                <nav>
                    <ul className='pagination justify-content-end'>
                        {numbers.map((item, i) => {
                            let isActive = (currentPage === item)
                            return (<li key={i} className={isActive ? 'page-item active' : 'page-item'}>
                                <span className="page-link mr-1" style={{ cursor: "pointer", backgroundColor: isActive ? contentColor : '#fff', color: isActive ? contentFontColor : '#000' }} onClick={() =>
                                    isActive ? null : handleClick(item)
                                }>{item}</span>
                            </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>

    )
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    contentColor: PropTypes.string,
    contentFontColor: PropTypes.string,
    onItemClick: PropTypes.func,
    totalItems: PropTypes.number.isRequired,
    totalAllItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    isFiltered: PropTypes.bool
}

Pagination.defaultProps = {
    totalItems: 0,
    totalAllItems: 0,
    itemsPerPage: 0
}

export default Pagination
