import { harvest, upgrade, build } from '../roles';
import { Role } from '../types';
import { Protocol } from '../protocol';

const assignRoles: Protocol = () => {
  console.log('assigning roles...');

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case Role.harvester:
        harvest(creep);
      case Role.upgrader:
        upgrade(creep);
      case Role.builder:
        build(creep);
      default:
        harvest(creep);
    }
  }
  return true;
}

export default assignRoles;
