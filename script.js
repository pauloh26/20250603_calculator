function calculateROI() {
    const name = document.getElementById('first_name').value.trim();
    const investment = parseFloat(document.getElementById('investment').value);
    const ret = parseFloat(document.getElementById('return').value);

    if (!name || isNaN(investment) || isNaN(ret)) {
      alert("Please enter your name, investment, and return.");        
      return;
    }

    const roi = ((ret - investment) / investment) * 100;

     // Save to browser storage
    const calcData = {
    name,
    investment,
    return: ret,
    roi: roi.toFixed(2)
  };

  localStorage.setItem("lastCalculation", JSON.stringify(calcData));

  // Go to results page
  window.location.href = "result.html";

  }
  