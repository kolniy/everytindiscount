import React from "react"

const CardOrange = () => {
    return (<>
    <div className="card-custom">
    <div className="card-custom__side card-custom__side--front">
                <div className="card-custom__picture card-custom__picture--2"></div>
                <div className="card-custom__heading">
                  <span className="card-custom__heading-span card-custom__heading-span--2">
                    Mobile Internet & Data Services
                  </span>
                </div>
              </div>
              <div className="card-custom__side card-custom__side--back card-custom__side--back-2">
                <div className="card-custom__cta">
                <div className="card-custom__price-box">
                  </div>
                  <div className="card-custom__platforms">
                    <ul>
                      <li>mtn</li>
                      <li>glo</li>
                      <li>airtel</li>
                      <li>9mobile</li>
                      <li>ntel</li>
                      <li>smile</li>
                      <li>spectranet</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
    </>)
}

export default CardOrange