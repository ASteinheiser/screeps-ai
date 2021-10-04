import { Role, MAX_CREEP_COST } from './constants';

const generateParts = (part: BodyPartConstant, count: number) => {
  return [...Array(count)].map(() => part);
}

const generateWorkerParts = (controllerLevel: number) => {
  const maxEnergy = MAX_CREEP_COST[controllerLevel];

  // make workers have work parts equal to at least half of the max energy
  const workParts = Math.ceil((maxEnergy / 2 ) / BODYPART_COST[WORK]);
  const workPartsCost = workParts * BODYPART_COST[WORK];

  let carryParts = 1;
  let moveParts = 1;
  const remainingEnergy = maxEnergy - workPartsCost;
  if (remainingEnergy > 100) {
    // make workers have move parts equal to 60% of the remaining energy
    moveParts = Math.ceil((remainingEnergy * .6) / BODYPART_COST[MOVE]);
    const movePartsCost = moveParts * BODYPART_COST[MOVE];

    const carryPartsBudget = remainingEnergy - movePartsCost;
    carryParts = Math.floor(carryPartsBudget / BODYPART_COST[CARRY]);
  }

  return [
    ...generateParts(WORK, workParts),
    ...generateParts(CARRY, carryParts),
    ...generateParts(MOVE, moveParts)
  ];
}

export const generateBodyParts = (controllerLevel: number, role: Role) => {
  switch(role) {
    case Role.harvester:
    case Role.builder:
    case Role.upgrader:
      return generateWorkerParts(controllerLevel);
    default:
      return [WORK, CARRY, MOVE];
  }
}

const generatePartsPerControllerLevel = (role: Role) => {
  // there are 9 controller levels (0 - 8)
  return [...Array(9)].map((_, controllerLevel) => {
    return generateBodyParts(controllerLevel, role);
  });
};

export const BodyParts = {
  [Role.harvester]: generatePartsPerControllerLevel(Role.harvester),
  [Role.builder]: generatePartsPerControllerLevel(Role.builder),
  [Role.upgrader]: generatePartsPerControllerLevel(Role.upgrader),
}
