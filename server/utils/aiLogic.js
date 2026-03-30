

export const predictDisease = (animal) => {
    let riskScore = 0; 
    let status = "Healthy";

  if (animal.temperature > 41) {
    riskScore = 90;
    status = "High Risk 🚨";
  }
  else if (animal.temperature > 39) {
    riskScore = 60 ; 
    status = "Medium Risk ⚠️";
  }
  else{
    riskScore = 20 ; 
    status = "Healthy ✅"
  }
  return {
    status,
    riskScore
  };
};