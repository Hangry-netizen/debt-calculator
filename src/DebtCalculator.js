import { useState } from "react";

function DebtCalculator() {
  const [formData, setFormData] = useState({
    amountOwed: "",
    interestRate: "",
    monthlyPayment: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateDebtPayoff = (e) => {
    e.preventDefault();

    let P = parseFloat(formData.amountOwed);
    let annualRate = parseFloat(formData.interestRate);
    let A = parseFloat(formData.monthlyPayment);

    if (P <= 0 || annualRate < 0 || A <= 0) {
      setResult({ error: "Please enter valid positive values." });
      return;
    }

    let r = annualRate / 100 / 12; // Convert annual rate to monthly decimal
    let N;

    if (A <= P * r) {
      setResult({ error: "Monthly payment must be greater than monthly interest accrued!" });
      return;
    }

    // Loan payoff formula
    N = Math.log(A / (A - P * r)) / Math.log(1 + r);
    let totalPaid = N * A;
    let totalInterest = totalPaid - P;

    setResult({
      months: Math.ceil(N),
      totalInterest: totalInterest.toFixed(2),
      totalPaid: totalPaid.toFixed(2)
    });
  };

  return (
    <div>
      <h2>Debt Payoff Calculator</h2>
      <form onSubmit={calculateDebtPayoff}>
        <div>
          <label>Amount Owed ($): </label>
          <input type="number" name="amountOwed" value={formData.amountOwed} onChange={handleChange} />
        </div>
        <div>
          <label>Interest Rate (% per year): </label>
          <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} />
        </div>
        <div>
          <label>Monthly Payment ($): </label>
          <input type="number" name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} />
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <>
              <h3>Results:</h3>
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



// export default function HomePage() {
//     const [principal, setPrincipal] = useState("")
//     const [interest, setInterest] = useState("")
//     const [premium, setPremium] = useState(false)
//     const [message, setMessage] = useState("")
//     const [error, setError] = useState("")

//     async function handleLogin(e) {
//         e.preventDefault()

//         if (principal === "" || interest === "") {
//         return setError("Principal amount and APR are needed")
//         }
        
//         try {
//         setIsLoading(true)
//         await login(principal, interest)
//         setMessage("Success")

//         } catch {
//         setError("Failure")
//         }
//         setIsLoading(false)
//     }

//     return (
//         <div>Test</div>
//     )
// }