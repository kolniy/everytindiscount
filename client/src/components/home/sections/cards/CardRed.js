import React from "react"

const CardRed = () => {
    return (<>
    <div className="card-custom">
    <div className="card-custom__side card-custom__side--front">
                <div className="card-custom__picture card-custom__picture--4"></div>
                <div className="card-custom__heading">
                  <span className="card-custom__heading-span card-custom__heading-span--4">
                   Movie Tickets
                  </span>
                </div>
              </div>
              <div className="card-custom__side card-custom__side--back card-custom__side--back-4">
                <div className="card-custom__cta">
                <div className="card-custom__price-box">
                  </div>
                  <div className="card-custom__platforms">
                    <ul>
                      <li>genesis cinema</li>
                      <li>silverbird cinema</li>
                      <li>shoprite</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
    </>)
}

export default CardRed  