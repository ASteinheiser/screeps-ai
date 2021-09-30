import { executeProtocols } from './protocol';
import assignRoles from './assignRoles';
import autoSpawn from './autoSpawn';

const executeColonyProtocol = () => {
  console.log('executing colony protocols...');

  executeProtocols([
    assignRoles,
    () => autoSpawn({ spawnName: 'Spawn1', role: 'harvester', max: 2 }),
    () => autoSpawn({ spawnName: 'Spawn1', role: 'builder', max: 2 }),
    () => autoSpawn({ spawnName: 'Spawn1', role: 'upgrader', max: 2 }),
  ]);
}

export default executeColonyProtocol;
