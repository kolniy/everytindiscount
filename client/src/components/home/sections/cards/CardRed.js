import React from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"

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
                    <p className="card-custom__price-only">
                      Supported PlatForms
                    </p>
                  </div>
                  <div className="card-custom__platforms">
                    <ul>
                      <li>genesis cinema</li>
                      <li>silverbird cinema</li>
                      <li>shoprite</li>
                    </ul>
                  </div>
                  <Button
                    color="danger"
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

export default CardRed  