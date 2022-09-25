document.addEventListener("DOMContentLoaded", function() {
  // Declaring elements objects by querySelector
  const form = document.querySelector("form");
  const icecreamSelection = form.querySelector("[name=ice-cream-type]");
  const icecreams = icecreamSelection.querySelectorAll("option");
  const icecreamSelectionValues = [];
  icecreams.forEach((element) => {
    icecreamSelectionValues.push(element.value);
  });
  const extras = form.querySelectorAll("div[name=extras-ontop] [type=checkbox]");
  const extrasValues = [];
  extras.forEach(element => {
    extrasValues.push(element.parentElement.innerText);
  });
  const rangeLine = form.querySelector("div[name=amount] [type=range]");
  const rangeNum = form.querySelector("div[name=amount] [type=number]");

  // Invalid combinations (extras - icecreams)
  const invalidCombinationChocolate = ["strawberry-syrup"];
  const invalidCombinationLemon = ["candied-pecans", "chocolate-syrup"];
  const invalidCombinationVanilla = [];
  const invalidCombinationStrawberry = ["candied-pecans"];

  // Adding event Listners
  form.addEventListener("submit", onSubmitForm);
  icecreamSelection.addEventListener("input", validIcecreamSelected);
  rangeLine.addEventListener("input", validIcecreamAmount);
  rangeNum.addEventListener("input", validIcecreamAmount);
  extras.forEach(ex => {
    ex.addEventListener("input", matchingExtraToIcecream)
  });

  
  function matchingExtraToIcecream(event) { 
    const selectedIcecream = icecreamSelection.value; // selected icecream
    if(selectedIcecream === '') return false;
    extras.forEach(e => {
      e.setCustomValidity("");
    });
    switch (selectedIcecream) {   
      case "lemon":
        for (let i = 0; i < extras.length; i++) {
          if(extras[i].checked && invalidCombinationLemon.includes(extras[i].name)) {
            extras[i].setCustomValidity(`Invalid combination [${selectedIcecream} + ${extras[i].name}]!`);
            return false;
          } else extras[i].setCustomValidity('');
        } break;
      case "chocolate":
        for (let i = 0; i < extras.length; i++) {    
          if(extras[i].checked && invalidCombinationChocolate.includes(extras[i].name)) {
            extras[i].setCustomValidity(`Invalid combination [${selectedIcecream} + ${extras[i].name}]!`);
            return false;
          } else extras[i].setCustomValidity('');
        } break;
      case "strawberry":
        for (let i = 0; i < extras.length; i++) {
          if(extras[i].checked && invalidCombinationStrawberry.includes(extras[i].name)) {
            extras[i].setCustomValidity(`Invalid combination [${selectedIcecream} + ${extras[i].name}]!`);
            return false;
          } else extras[i].setCustomValidity('');
        } break;
      case "vanilla":
        for (let i = 0; i < extras.length; i++) {
          if(extras[i].checked && invalidCombinationVanilla.includes(extras[i].name)) {
            extras[i].setCustomValidity(`Invalid combination [${selectedIcecream} + ${extras[i].name}]!`);
            return false;
          } else extras[i].setCustomValidity('');
        } break;
      default: return false;
    }
    return true;
  }

  function validIcecreamAmount() {
    if(rangeLine.value > 0 && rangeLine.value <= 5 && rangeLine.value === rangeNum.value) {
      rangeNum.setCustomValidity("");
      return true;
    }
    rangeNum.setCustomValidity("Amount is invalid! (1-5)");
    return false;
  }

  function validIcecreamSelected() {
    if(icecreamSelection.value !== '' && icecreamSelectionValues.includes(icecreamSelection.value)) {
      icecreamSelection.setCustomValidity("");
      return true;
    }
    icecreamSelection.setCustomValidity("Invalid prop!");
    return false;
  }


  function onSubmitForm(event) {
    let isValid = validIcecreamSelected() && validIcecreamAmount() && matchingExtraToIcecream();
    if(!isValid) {
      event.preventDefault();
    } 
  }
});