export const towerActions = (tower: StructureTower) => {
  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
    return;
  }

  const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (structure) => structure.hits < structure.hitsMax
  });
  if (closestDamagedStructure) {
    tower.repair(closestDamagedStructure);
    return;
  }
}
