import React, { useState } from "react"
import classnames from "classnames"
import {  Card,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Row
     } from "reactstrap"
import CategoryItem from "./CategoryItem"
import { categoryData } from "../../../temp/data"

const CategoryTabs = () => {

    const [ iconTabsSelect, updateIconTabsSelect ] = useState({
        iconTabs: 1,
        plainTabs: 1
    })

    const toggleNavs = (e, name, value) => {
        e.preventDefault()
        updateIconTabsSelect({
            ...iconTabsSelect,
            [name]: value
        })
    }

    return <>
    <div className="nav-wrapper mb-5">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={iconTabsSelect.iconTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: iconTabsSelect.iconTabs === 1
                    })}
                    onClick={e => toggleNavs(e, "iconTabs", 1)}
                    role="tab"
                  >
                    <i className="ni ni-cloud-upload-96 mr-2" />
                      Data Plans
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={iconTabsSelect.iconTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: iconTabsSelect.iconTabs === 2
                    })}
                    onClick={e => toggleNavs(e, "iconTabs", 2)}
                    role="tab"
                  >
                    <i className="ni ni-bell-55 mr-2" />
                 Airtime Topup
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={iconTabsSelect.iconTabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: iconTabsSelect.iconTabs === 3
                    })}
                    onClick={e => toggleNavs(e, "iconTabs", 3)}
                    role="tab"
                  >
                    <i className="ni ni-calendar-grid-58 mr-2" />
                    Decoder Subscription  
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={iconTabsSelect.iconTabs === 4}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: iconTabsSelect.iconTabs === 4
                    })}
                    onClick={e => toggleNavs(e, "iconTabs", 4)}
                    role="tab"
                  >
                    <i className="ni ni-calendar-grid-58 mr-2" />
                    Movie Tickets
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card>
              <CardBody>
                <TabContent activeTab={"iconTabs" + iconTabsSelect.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    <Row>
                        {
                            categoryData.filter((categoryItem) => categoryItem.billerType === 'data').map((item) => <CategoryItem key={item.billerName} billerLogo={item.billerLogo} billerName={item.billerName} billerDesc={item.billerDesc} />)
                        }
                    </Row>
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <Row>
            {
             categoryData.filter((categoryItem) => categoryItem.billerType === 'airtime').map((item) =>  <CategoryItem key={item.billerName} billerLogo={item.billerLogo} billerName={item.billerName} billerDesc={item.billerDesc} /> )
            }
                </Row>
                  </TabPane>
                  <TabPane tabId="iconTabs3">
                      <Row>
                      {
                            categoryData.filter((categoryItem) => categoryItem.billerType === 'tv').map((item) => <CategoryItem key={item.billerName} billerLogo={item.billerLogo} billerName={item.billerName} billerDesc={item.billerDesc} />)
                        }
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card></>
}

export default CategoryTabs