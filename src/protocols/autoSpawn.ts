import { Role, BodyParts, MAX_CREEP_COST } from '../roles';
import { Protocol } from '../protocol';

interface AutoSpawnArgs {
  spawnName: string;
  role: Role;
  max: number;
}

export const autoSpawn: Protocol<AutoSpawnArgs> = ({ spawnName, role, max }) => {
  const spawn = Game.spawns[spawnName];
  const creeps = _.filter(Game.creeps, ({ memory }) => (
    memory.role === role && memory.room === spawn.room.name
  ));
  if (creeps.length <= max) {
    console.log(role + 's: [' + creeps.length + '/' + max + ']');
  }

  const controllerLevel = spawn.room.controller?.level ?? 0;
  const maxEnergy = spawn.room.energyCapacityAvailable;
  const body = getBodyParts(role, controllerLevel, maxEnergy);
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

const getBodyParts = (
  role: Role,
  controllerLevel: number,
  maxEnergy: number
): BodyPartConstant[] => {
  if (maxEnergy < MAX_CREEP_COST[controllerLevel]) {
    return getBodyParts(role, controllerLevel - 1, maxEnergy);
  } else {
    return BodyParts[role][controllerLevel];
  }
};
