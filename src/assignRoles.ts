import { harvest, upgrade, build } from './roles';
import { Role } from './types';

const assignRoles = () => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case Role.harvester:
        return harvest(creep);
      case Role.upgrader:
        return upgrade(creep);
      case Role.builder:
        return build(creep);
      default:
        return harvest(creep);
    }
  }
}

export default assignRoles;
