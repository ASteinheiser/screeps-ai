import { executeProtocols } from './protocol';
import { assignRoles, autoSpawn, showSpawnMessages } from './protocols';
import { Role } from './roles';
import { towerActions } from './structures';

const executeColonyProtocol = () => {
  console.log('executing colony protocols...');

  // protocols for spawning colony creeps
  for (const spawnName in Game.spawns) {
    executeProtocols([
      () => autoSpawn({ spawnName, role: Role.harvester, max: 2 }),
      () => autoSpawn({ spawnName, role: Role.upgrader, max: 1 }),

      () => autoSpawn({ spawnName, role: Role.builder, max: 2 }),
      () => autoSpawn({ spawnName, role: Role.upgrader, max: 2 }),

      () => autoSpawn({ spawnName, role: Role.harvester, max: 3 }),
      () => autoSpawn({ spawnName, role: Role.builder, max: 3 }),
      () => autoSpawn({ spawnName, role: Role.upgrader, max: 3 }),
    ]);
  }

  for (const roomName in Game.rooms) {
    const towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
    towers.forEach(tower => towerActions(tower as StructureTower));
  }

  // protocols that need to be called every tick (always return `true`)
  executeProtocols([
    assignRoles,
    showSpawnMessages,
  ]);
}

export default executeColonyProtocol;
