import { executeProtocols } from './protocol';
import { assignRoles, autoSpawn, showSpawnMessages } from './protocols';
import { Role } from './roles';

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

  // protocols that need to be called every tick (always return `true`)
  executeProtocols([
    assignRoles,
    showSpawnMessages,
  ]);
}

export default executeColonyProtocol;
