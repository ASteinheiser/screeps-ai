import { harvest, upgrade, build } from './roles';

const assignRoles = () => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case 'harvester':
        harvest(creep);
      case 'upgrader':
        upgrade(creep);
      case 'builder':
        build(creep);
      default:
    }
  }
}

export default assignRoles;
