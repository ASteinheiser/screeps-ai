import { executeProtocols } from './protocol';
import assignRoles from './protocols/assignRoles';
import autoSpawn from './protocols/autoSpawn';
import showSpawnMessages from './protocols/showSpawnMessages';

const executeColonyProtocol = () => {
  console.log('executing colony protocols...');

  executeProtocols([
    assignRoles,
    () => autoSpawn({ spawnName: 'Spawn1', role: 'harvester', max: 2 }),
    () => autoSpawn({ spawnName: 'Spawn1', role: 'builder', max: 2 }),
    () => autoSpawn({ spawnName: 'Spawn1', role: 'upgrader', max: 2 }),
    () => autoSpawn({ spawnName: 'Spawn1', role: 'harvester', max: 4 }),
    () => autoSpawn({ spawnName: 'Spawn1', role: 'builder', max: 4 }),
    () => autoSpawn({ spawnName: 'Spawn1', role: 'upgrader', max: 4 }),
    showSpawnMessages,
  ]);
}

export default executeColonyProtocol;
