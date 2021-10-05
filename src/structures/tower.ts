export const towerActions = (tower: StructureTower) => {
  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
    return;
  }

  const damagedWalls = tower.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      if (structure.structureType === STRUCTURE_WALL) {
        return structure.hits < structure.hitsMax;
      }
      return false;
    }
  });
  const sortedWalls = _.sortBy(damagedWalls, s => s.hits);

  if (sortedWalls.length > 0) {
    tower.repair(sortedWalls[0]);
    return;
  }
}
