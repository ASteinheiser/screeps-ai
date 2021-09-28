import { findResource } from './harvester';

const PATH_COLOR = '#ffaa00';

export const upgrade = (creep: Creep) => {
  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.working = false;
    creep.say('⛏️ harvest');
  }
  if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = true;
    creep.say('⚡ upgrade');
  }

  if (creep.memory.working) {
    upgradeController(creep);
  } else {
    findResource(creep);
  }
}

const upgradeController = (creep: Creep) => {
  if (!creep.room.controller) return; // TODO: make unit harvest or something?
  if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: PATH_COLOR}});
  }
}
