import React from 'react'
import { NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'


const Navitem = ({
     packageTypeDetails,
     activeTabId,
     updateActiveTab
    }) => {
    return <>
        <NavItem onClick={e => updateActiveTab(packageTypeDetails.id)}>
            <NavLink
            aria-selected={activeTabId === packageTypeDetails.id}
            className={classnames("mb-sm-3 mb-md-0", {
                active: activeTabId === packageTypeDetails.id
            })}
            role="tab"
            >
            <i className={`${packageTypeDetails.iconname} mr-2`} />
               { packageTypeDetails.name }
            </NavLink>
        </NavItem>
    </>
}

export default Navitem
