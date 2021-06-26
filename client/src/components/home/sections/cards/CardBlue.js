import React from "react"

const CardBlue = () => {
    return (<>
    <div className="card-custom">
    <div className="card-custom__side card-custom__side--front">
                <div className="card-custom__picture card-custom__picture--1"></div>
                <div className="card-custom__heading">
                  <span className="card-custom__heading-span card-custom__heading-span--1">
                    Decoder/Cable TV Subscriptions
                  </span>
                </div>
              </div>
              <div className="card-custom__side card-custom__side--back card-custom__side--back-1">
                <div className="card-custom__cta">
                  <div className="card-custom__price-box">
                  </div>
                  <div className="card-custom__platforms">
                    <ul>
                      <li>dstv</li>
                      <li>gotv</li>
                      <li>startimes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
    </>)
}

export default CardBlue