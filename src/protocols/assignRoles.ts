import { Role, harvest, upgrade, build } from '../roles';
import { Protocol } from '../protocol';

export const assignRoles: Protocol = () => {
  console.log('assigning roles...');

  const roomsWithSites = getRoomsWithBuildSites();
  const roomsWithMaxEnergy = getRoomsWithMaxEnergy();

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
        if (roomsWithSites[creep.room.name]) {
          build(creep);
          break;
        }
        if (!roomsWithMaxEnergy[creep.room.name]) {
          harvest(creep);
          break;
        } else {
          upgrade(creep);
          break;
        }
    }
  }
  return true;
}

const getRoomsWithBuildSites = () => {
  const roomsWithBuildSites: Record<string, boolean> = {};
  for (const site in Game.constructionSites) {
    const { room } = Game.constructionSites[site];
    if (room) roomsWithBuildSites[room.name] = true;
  }
  return roomsWithBuildSites;
}

const getRoomsWithMaxEnergy = () => {
  const roomsWithMaxEnergy: Record<string, boolean> = {};
  for (const name in Game.rooms) {
    const room = Game.rooms[name];
    if (room.energyAvailable === room.energyCapacityAvailable) {
      roomsWithMaxEnergy[room.name] = true;
    }
  }
  return roomsWithMaxEnergy;
}
