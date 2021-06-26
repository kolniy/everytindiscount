import React from "react"

const CardGreen = () => {
    return (<>
    <div className="card-custom">
    <div className="card-custom__side card-custom__side--front">
                <div className="card-custom__picture card-custom__picture--3"></div>
                <div className="card-custom__heading">
                  <span className="card-custom__heading-span card-custom__heading-span--3">
                   Airtime Topup with huge Bonus
                  </span>
                </div>
              </div>
              <div className="card-custom__side card-custom__side--back card-custom__side--back-3">
                <div className="card-custom__cta">
                <div className="card-custom__price-box">
                  </div>
                  <div className="card-custom__platforms">
                    <ul>
                      <li>mtn</li>
                      <li>glo</li>
                      <li>airtel</li>
                      <li>9mobile</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
    </>)
}

export default CardGreen