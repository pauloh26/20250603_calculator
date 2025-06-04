function calculateROI() {
    const investment = parseFloat(document.getElementById('investment').value);
    const ret = parseFloat(document.getElementById('return').value);
    const roi = ((ret - investment) / investment) * 100;
    document.getElementById('result').innerText = `ROI: ${roi.toFixed(2)}%`;
  }
  