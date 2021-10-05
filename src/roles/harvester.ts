const PATH_COLOR = '#ffea00';

export const harvest = (creep: Creep) => {
  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    creep.say('⛏️');
    findResource(creep);
  }
  else {
    creep.say('🗑️');
    const targets = findTargetsForDeposit(creep);
    if (targets.length > 0) {
      depositResource(creep, targets[0]);
    }
  }
}

export const findResource = (creep: Creep) => {
  const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES).filter(r => r.resourceType === RESOURCE_ENERGY);
  if (droppedEnergy.length > 0 && creep.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
    creep.moveTo(droppedEnergy[0], {visualizePathStyle: {stroke: PATH_COLOR}});
    return;
  }

  const sources = creep.room.find(FIND_SOURCES);
  const sortedSources = _.sortBy(sources, s => creep.pos.getRangeTo(s));
  const source = findNearestSource(sortedSources);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source, {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}

const findNearestSource = (sources: Source[], index = 0): Source => {
  if (sources[index].energy <= 0 && sources.length > index + 1) {
    return findNearestSource(sources, index + 1);
  } else {
    return sources[index];
  }
}

export const findTargetsForDeposit = (creep: Creep) => {
  const structures = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_CONTAINER ||
              structure.structureType === STRUCTURE_STORAGE ||
              structure.structureType === STRUCTURE_TOWER) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });
  // Deposit energy in structures with the following order:
  // extensions -> spawn -> towers -> containers -> anything else
  return _.sortBy(structures, ({ structureType }) => {
    if (structureType === STRUCTURE_EXTENSION) return 0;
    if (structureType === STRUCTURE_SPAWN) return 1;
    if (structureType === STRUCTURE_TOWER) return 2;
    if (structureType === STRUCTURE_CONTAINER) return 3;
    if (structureType === STRUCTURE_STORAGE) return 4;
    return 5;
  });
}

export const depositResource = (creep: Creep, target: Structure) => {
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}
