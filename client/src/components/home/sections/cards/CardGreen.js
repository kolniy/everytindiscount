import React from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"

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
                    <p className="card-custom__price-only">
                      Supported PlatForms
                    </p>
                  </div>
                  <div className="card-custom__platforms">
                    <ul>
                      <li>mtn</li>
                      <li>glo</li>
                      <li>airtel</li>
                      <li>9mobile</li>
                    </ul>
                  </div>
                  <Button
                    color="success"
                    size="lg"
                    type="button"
                    className="ml-1"
                    tag={Link}
                    to="/signup"
                  >
                    GET STARTED
                  </Button>
                </div>
              </div>
            </div>
    </>)
}

export default CardGreen