import React, { useState } from "react";

function DebtCalculator() {
  const [amountOwed, setAmountOwed] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentPerMonth, setPaymentPerMonth] = useState("");
  const [result, setResult] = useState(null);

  const calculateDebt = (e) => {
    e.preventDefault();

    let balance = parseFloat(amountOwed);
    let rate = parseFloat(interestRate) / 100 / 12; // Convert annual interest rate to monthly
    let payment = parseFloat(paymentPerMonth);

    if (balance <= 0 || rate < 0 || payment <= 0) {
      setResult("Please enter valid numbers.");
      return;
    }

    let months = 0;
    let totalInterest = 0;

    while (balance > 0) {
      let interest = balance * rate;
      totalInterest += interest;
      balance = balance + interest - payment;
      months++;

      if (months > 1000) {
        setResult("Payment is too low, debt will never be paid off.");
        return;
      }
    }

    let totalPaid = parseFloat(amountOwed) + totalInterest;

    setResult({
      months,
      totalInterest: totalInterest.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Debt Payment Calculator</h2>
      <div class="d-flex justify-content-center align-items-center">
        <form className="card w-50 border rounded p-4 shadow-sm bg-light" onSubmit={calculateDebt}>
            <div className="mb-3">
            <label className="form-label">Amount Owed ($)</label>
            <input
                type="number"
                className="form-control"
                value={amountOwed}
                onChange={(e) => setAmountOwed(e.target.value)}
                required
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Interest Rate (%)</label>
            <input
                type="number"
                className="form-control"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                required
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Monthly Payment ($)</label>
            <input
                type="number"
                className="form-control"
                value={paymentPerMonth}
                onChange={(e) => setPaymentPerMonth(e.target.value)}
                required
            />
            </div>

            <button type="submit" className="btn btn-primary w-100">Calculate</button>
        </form>
      </div>
      

      {result && (
        <div className="alert alert-success mt-4 text-center">
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <>
              <p><strong>Months to Pay Off:</strong> {result.months}</p>
              <p><strong>Total Interest Paid:</strong> ${result.totalInterest}</p>
              <p><strong>Total Amount Paid:</strong> ${result.totalPaid}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DebtCalculator;
