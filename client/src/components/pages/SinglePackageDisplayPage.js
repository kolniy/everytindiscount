import React from 'react'

export const SinglePackageDisplayPage = ({ match }) => {
    return <>
        <p className="text-center">this package id is: {match.params.packageid}</p>
    </>
}

export default SinglePackageDisplayPage