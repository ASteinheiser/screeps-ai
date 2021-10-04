const PATH_COLOR = '#ffea00';

export const harvest = (creep: Creep) => {
  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
    creep.say('🗑️ deposit');
  }
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
    creep.say('⛏️ harvest');
  }

  if (creep.memory.working) {
    findResource(creep);
  }
  else {
    const targets = findTargetsForDeposit(creep);
    if (targets.length > 0) {
      depositResource(creep, targets[0]);
    }
  }
}

export const findResource = (creep: Creep) => {
  const sources = creep.room.find(FIND_SOURCES);
  const sortedSources = _.sortBy(sources, s => creep.pos.getRangeTo(s));
  if (creep.harvest(sortedSources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sortedSources[0], {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}

export const findTargetsForDeposit = (creep: Creep) => {
  const structures = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });
  // fill up extensions before spawn as the spawn will regenerate energy
  return _.sortBy(structures, s => s.structureType !== STRUCTURE_SPAWN);
}

export const depositResource = (creep: Creep, target: Structure) => {
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}
