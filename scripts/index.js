const inputWrappers = document.querySelectorAll(".input__wrapper");
const inp = document.getElementsByTagName("input");

//convert input node arry into an iteratable array
let inputs = Array.from(inp);
console.log(inputs)
//convert wrapper node arry into an iteratable array
let wrappers = Array.from(inputWrappers);
console.log(wrappers)

//validation function that checks for input value and applies error styling to respective input and their wrappers.
function validateForm(value, parent, label) {
    let errorMsg = parent.querySelector(".input__error-msg");
    if (!value.trim()) {
        if (!errorMsg) {
        errorMsg = document.createElement("p");
        errorMsg.innerText = "This field is required";
        errorMsg.classList.add("input__error-msg");
        label.appendChild(errorMsg);
        }
        parent.classList.add("input__wrapper--error");
    } else {
        parent.classList.remove("input__wrapper--error");
        if (errorMsg) {
            label.removeChild(errorMsg);
        }
    }
}

// loop over each input and extract value, locate parent, label and pass down to validation function.
inputs.forEach((input) => {
    const parent = input.parentElement;
    const label = parent.parentElement;
    input.addEventListener("input", (event) => {
        const val = event.target.value;
        validateForm(val, parent, label);
    })
})





function calculateMortgage(cost, term, interest, type) {

    //convert percentage to decimal
    let int = interest / 100 / 12;

    //convert loan term from years to months
    let months = term * 12;

    let interestOnly = int * cost;

    //caclulate montly payment
    let monthlyPayment = cost * int * ((1 + int) ** months) / (((1 + int) ** months) - 1);

    //format monthly payment to specified currency
    const convertPayment = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
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