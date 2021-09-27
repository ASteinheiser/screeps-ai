const PATH_COLOR = '#ffea00';

export const harvest = (creep: Creep) => {
  if (creep.store.getFreeCapacity() > 0) {
    findResource(creep);
  }
  else {
    const targets = findTargetsForDeposit(creep);
    if (targets.length > 0) {
      depositResource(creep, targets[0]);
    }
  }
}

const findResource = (creep: Creep) => {
  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}

const findTargetsForDeposit = (creep: Creep) => {
  return creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });
}

const depositResource = (creep: Creep, target: Structure) => {
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}
