export const ROLL_DICE = () => Math.floor(Math.random() * 6) + 1;
export const calculatePower = (baseStat, diceRoll) => baseStat * diceRoll;
export const resolveClash = (playerAtk, playerRoll, enemyDef, enemyRoll) => {
  const playerPower = calculatePower(playerAtk, playerRoll);
  const enemyPower = calculatePower(enemyDef, enemyRoll);
  return { playerPower, enemyPower, playerWon: playerPower > enemyPower, tie: playerPower === enemyPower };
};
