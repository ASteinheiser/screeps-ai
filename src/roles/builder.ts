import { findResource } from './harvester';

const PATH_COLOR = '#ffaa00';

export const build = (creep: Creep) => {
  if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = false;
    creep.say('⛏️ harvest');
  }
  if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = true;
    creep.say('🚧 build');
  }

  if (creep.memory.working) {
    buildStructure(creep);
  } else {
    findResource(creep);
  }
}

const buildStructure = (creep: Creep) => {
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  const sortedTargets = _.sortBy(targets, t => creep.pos.getRangeTo(t));
  if (sortedTargets.length > 0 && creep.build(sortedTargets[0]) === ERR_NOT_IN_RANGE) {
    creep.moveTo(sortedTargets[0], {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}
