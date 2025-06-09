window.onload = function() {
    const data = JSON.parse(localStorage.getItem("lastCalculation"));

        if (!data) {
        document.getElementById('resultBox').innerText = "No calculation data found.";
        return;
        }

    const message = `
        Hello ${data.name} 👋,
        Your investment: €${data.investment}
        Your return: €${data.return}
        Your ROI: ${data.roi}%`;


    document.getElementById("resultBox").innerText = message;

    };