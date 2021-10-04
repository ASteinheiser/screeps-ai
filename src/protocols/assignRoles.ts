import { Role, harvest, upgrade, build } from '../roles';
import { Protocol } from '../protocol';

export const assignRoles: Protocol = () => {
  console.log('assigning roles...');

  const roomsWithBuildSites: Record<string, boolean> = {};
  for (const site in Game.constructionSites) {
    const { room } = Game.constructionSites[site];
    if (room) roomsWithBuildSites[room.name] = true;
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case Role.harvester:
        harvest(creep);
        break;
      case Role.upgrader:
        upgrade(creep);
        break;
      case Role.builder:
        if (!roomsWithBuildSites[creep.room.name]) {
          harvest(creep);
          break;
        }
        build(creep);
        break;
    }
  }
  return true;
}
