
function calculateMortgage(cost, term, interest, type) {

    //convert percentage to decimal
    let int = interest / 100 / 12;

    //convert loan term from years to months
    let months = term * 12;

    let interestOnly = int * cost;

    //caclulate montly payment
    let monthlyPayment = cost * int * ((1 + int)**months) / (((1 + int)**months) - 1);

    //format monthly payment to specified currency
    const convertPayment = Intl.NumberFormat("en-US", {
        style:"currency",
        currency:"USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })

    //repayment object
    let repayment = {
        monthly: convertPayment.format(monthlyPayment),
        total: convertPayment.format(monthlyPayment * months),
        interest: convertPayment.format(interestOnly)
    }

    if (type === "interest-only") {
        return console.log(repayment.interest);
    } else { 
        return console.log(repayment);
    }

}

calculateMortgage(300000, 25, 5.25)