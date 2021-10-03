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
  const name = role + Game.time;
  const actions = [WORK, CARRY, MOVE];
  if (spawn.spawnCreep(actions, name, {memory: {role} as any}) === OK) {
    console.log('Spawning new ' + role + ': ' + name);
  }
}

// export const ActionKit = {
//   worker_v1: [WORK, CARRY, MOVE],
//   worker_v2: [WORK, WORK, CARRY, MOVE, MOVE],
//   worker_v3: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
// }
