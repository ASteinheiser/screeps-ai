import { Role, Body, BodyKey, BodyType } from '../types';
import { Protocol } from '../protocol';

interface AutoSpawnArgs {
  spawnName: string;
  role: Role;
  max: number;
  bodyName: BodyKey;
}

const autoSpawn: Protocol = ({ spawnName, role, max, bodyName }: AutoSpawnArgs) => {
  const { cost, body } = Body[bodyName];

  const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role);
  if (creeps.length <= max) {
    console.log(role + 's: [' + creeps.length + '/' + max + ']');
  }

  if (creeps.length < max && !Game.spawns[spawnName].spawning) {
    spawnNewScreep(spawnName, role, body);
  }

  return creeps.length >= max;
}

export default autoSpawn;

const spawnNewScreep = (spawnName: string, role: string, body: BodyType['body']) => {
  const spawn = Game.spawns[spawnName];
  const name = role + Game.time;
  if (spawn.spawnCreep(body, name, {memory: {role} as any}) === OK) {
    console.log('Spawning new ' + role + ': ' + name);
  }
}
