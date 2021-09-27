import assignRoles from './assignRoles';
import autoSpawn from './autoSpawn';

const executeColonyProtocol = () => {
  console.log('executing colony protocols...');

  assignRoles();

  autoSpawn({ spawn: 'Spawn1', role: 'harvester', max: 2 });
}

export default executeColonyProtocol;
