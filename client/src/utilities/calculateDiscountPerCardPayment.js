const calculateDiscounPerCardPayment = (discount, actualPrice) => {
    const discountValue = (parseFloat(discount) / 100) * actualPrice
    return Number(parseFloat(actualPrice - discountValue)).toFixed(2)
}

export default calculateDiscounPerCardPayment