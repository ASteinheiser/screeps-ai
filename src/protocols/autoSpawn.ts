import { Role, Body } from '../types';
import { Protocol } from '../protocol';

interface AutoSpawnArgs {
  spawnName: string;
  role: Role;
  max: number;
}

export const autoSpawn: Protocol<AutoSpawnArgs> = ({ spawnName, role, max }) => {
  const spawn = Game.spawns[spawnName];
  const body = getHighestCostBody(spawn, [...Body[role]]);

  const creeps = _.filter(Game.creeps, ({ memory }) => (
    memory.role === role && memory.room === spawn.room.name
  ));
  if (creeps.length <= max) {
    console.log(role + 's: [' + creeps.length + '/' + max + ']');
  }

  if (body && creeps.length < max && !spawn.spawning) {
    spawnNewScreep(spawn, role, body);
  }

  return creeps.length >= max;
}

const spawnNewScreep = (spawn: StructureSpawn, role: Role, body: BodyPartConstant[]) => {
  const name = role + Game.time;
  const memory = { role, room: spawn.room.name, working: false };

  if (spawn.spawnCreep(body, name, { memory }) === OK) {
    console.log('Spawning new ' + role + ': ' + name);
  }
}

const getHighestCostBody = (
  spawn: StructureSpawn,
  bodies: typeof Body[keyof typeof Body]
): BodyPartConstant[] | undefined => {
  const currentBody = bodies.shift();
  if (!currentBody) return undefined;

  if (spawn.room.energyCapacityAvailable >= currentBody.cost) {
    return currentBody.body;
  } else {
    return getHighestCostBody(spawn, bodies);
  }
}
