const inputWrappers = document.querySelectorAll(".input__wrapper");
const typeWrapper = document.querySelector(".calculator__mortgage-type-wrapper");
const inp = document.getElementsByTagName("input");
const radioInp = document.querySelectorAll('input[name="type"]');
const form = document.querySelector(".calculator__form");



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    console.log(formObject.type)
    calculateMortgage(formObject)
})

//convert input node into an iteratable array
let radios = Array.from(radioInp);
console.log(radios);
//convert input node into an iteratable array
let inputs = Array.from(inp);
console.log(inputs);
//convert wrapper node into an iteratable array
let wrappers = Array.from(inputWrappers);
console.log(wrappers);

//validation function that checks for input value and applies error styling to respective input and their wrappers.
function checkInputs(value, parent, label, unit) {
    let errorMsg = label.querySelector(".input__error-msg");

    if (!value.trim()) {
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.innerText = "This field is required";
            errorMsg.classList.add("input__error-msg");
            label.appendChild(errorMsg);
        }
        unit.classList.add("input__unit--error")
        parent.classList.add("input__wrapper--error");
    }
    else {
        parent.classList.remove("input__wrapper--error");
        if (unit) {
            unit.classList.remove("input__unit--error")
        }
        if (errorMsg) {
            label.removeChild(errorMsg);
        }
    }

}

// Function to handle radio button selection
radios.forEach((radio) => {
    radio.addEventListener('change', (event) => {
        let typeError = document.querySelector(".input__type-error");
        if(radio.value === undefined) {
            if (!typeError) {
                typeError = document.createElement("p");
                typeError.innerText = "This field is required";
                typeError.classList.add("input__type-error");
                typeWrapper.appendChild(typeError);
            } 
        } else {
            if (typeError && radio.value!== undefined) {
                typeWrapper.removeChild(typeError)
            }
        }

        // Remove the class from all radio wrappers
        const radWrappers = document.querySelectorAll(".input__radio-wrapper");
        radWrappers.forEach(wrapper => {
            wrapper.classList.remove("input__radio--checked");
        });

        // Add the class to the selected radio button's wrapper
        const wrapper = event.target.closest(".input__radio-wrapper");
        if (wrapper) {
            wrapper.classList.add('input__radio--checked');
        }
    });
});

// loop over each input and extract value, locate parent, label and pass down to validation function.
inputs.forEach((input) => {
    const parent = input.parentElement;
    const label = parent.parentElement;
    const unit = parent.getElementsByClassName('input__unit')[0];
    input.addEventListener("input", (event) => {
        const val = event.target.value;
        checkInputs(val, parent, label, unit);
    })
})

function calculateMortgage(formObj) {
    let typeError = document.querySelector(".input__type-error");
    if(formObj.type === undefined) {
        if (!typeError) {
            typeError = document.createElement("p");
            typeError.innerText = "This field is required";
            typeError.classList.add("input__type-error");
            typeWrapper.appendChild(typeError);
        } 
    } else {
        if (typeError && formObj.type !== undefined) {
            typeWrapper.removeChild(typeError)
        }
    }

    //convert percentage to decimal
    let int = formObj.rate / 100 / 12;

    //convert loan term from years to months
    let months = formObj.term * 12;

    let interestOnly = int * formObj.amount;

    //caclulate montly payment
    let monthlyPayment = formObj.amount * int * ((1 + int) ** months) / (((1 + int) ** months) - 1);

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

    if (formObj.type === "interest") {
        return console.log(repayment.interest);
    } else {
        return console.log(repayment);
    }

}