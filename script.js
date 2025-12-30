const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");
const result = document.getElementById("result");
const calbtn = document.getElementById("calculate-btn");
const clearBtn = document.getElementById("clear-btn");
const emptyState = document.getElementById("empty-state");
const resultyearly = document.getElementById("result-yearly");

clearBtn.addEventListener("click", clearAll);
function clearAll() {
  // Clear input fields
  amount.value = "";
  term.value = "";
  rate.value = "";

  // Uncheck radio buttons
  document.querySelectorAll('input[name="type"]').forEach((radio) => {
    radio.checked = false;
  });

  result.classList.add("hidden"); // hide result
  resultyearly.classList.add("hidden");
  emptyState.classList.remove("hidden"); // show placeholder
  // Reset result text
  result.textContent = "";

  // Optional: move focus to first input
  amount.focus();
}

calbtn.addEventListener("click", calculateMortage);

function calculateMortage() {
  const principal = parseFloat(amount.value);
  const year = parseFloat(term.value);
  const annualRate = parseFloat(rate.value);

  const selectedType = document.querySelector(`input[name="type"]:checked`);
  const type = selectedType ? selectedType.value : null;

  if (!principal || !year || !annualRate || !type) {
    emptyState.classList.add("hidden"); // hide placeholder
    result.classList.remove("hidden"); // show result
    resultyearly.classList.remove("hidden");
    result.innerHTML=`<div class="empty">
    <p>⚠️ Please fill all the datas!</p>
    <img src="./image/emoji.png" id="emoji"></div>`
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalMonth = year * 12;

  let monthlyPayment;
  let totalPayment;

  if (type === "repayments") {
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonth)) /
      (Math.pow(1 + monthlyRate, totalMonth) - 1);

    totalPayment = totalMonth * monthlyPayment;
  } else if (type === "Intrest-only") {
    monthlyPayment = principal * monthlyRate;
    totalPayment = totalMonth * monthlyPayment;
  }
  emptyState.classList.add("hidden"); // hide placeholder
  result.classList.remove("hidden"); // show result
  resultyearly.classList.remove("hidden");

  result.textContent = ` ₹: ${monthlyPayment.toFixed(2)} per month`;
  resultyearly.textContent = `₹: ${totalPayment.toFixed(2)} for ${year} years`;
}
