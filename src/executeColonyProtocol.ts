import assignRoles from './assignRoles';
import autoSpawn from './autoSpawn';

const executeColonyProtocol = () => {
  console.log('executing colony protocols...');

  assignRoles();

  autoSpawn({ spawn: 'Spawn1', role: Role.harvester, max: 2 });
  autoSpawn({ spawn: 'Spawn1', role: Role.builder, max: 2 });
  autoSpawn({ spawn: 'Spawn1', role: Role.upgrader, max: 2 });
}

export default executeColonyProtocol;
