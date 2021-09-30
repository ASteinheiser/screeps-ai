import { Role } from '../types';
import { Protocol } from '../protocol';

interface AutoSpawnArgs {
  spawnName: string;
  role: Role;
  max: number;
}

const autoSpawn: Protocol = ({ spawnName, role, max }: AutoSpawnArgs) => {
  const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role);
  if (creeps.length <= max) {
    console.log(role + 's: [' + creeps.length + '/' + max + ']');
  }

  if (creeps.length < max && !Game.spawns[spawnName].spawning) {
    spawnNewScreep(spawnName, role);
  }

  return creeps.length >= max;
}

export default autoSpawn;

const spawnNewScreep = (spawnName: string, role: string) => {
  const spawn = Game.spawns[spawnName];
  const newName = role + Game.time;
  const actions = getActions(role);
  if (spawn.spawnCreep(actions, newName, {memory: {role} as any}) === OK) {
    console.log('Spawning new ' + role + ': ' + newName);
  }
}

const getActions = (role: string) => {
  switch (role) {
    case Role.harvester:
    case Role.upgrader:
    case Role.builder:
    default:
      return [WORK, CARRY, MOVE];
  }
}
