import { harvest } from 'role.harvester';
import { upgrade } from 'role.upgrader';
import { build } from 'role.builder';

const assignRoles = () => {
  for(const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch(creep.memory.role) {
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
