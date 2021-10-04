import { harvest, upgrade, build } from '../roles';
import { Role } from '../types';
import { Protocol } from '../protocol';

export const assignRoles: Protocol = () => {
  console.log('assigning roles...');

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
        build(creep);
        break;
    }
  }
  return true;
}
