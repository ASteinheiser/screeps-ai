import { findResource } from './harvester';

const PATH_COLOR = '#ffaa00';

export const build = (creep: Creep) => {
  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
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
  if (targets.length && creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targets[0], {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}
