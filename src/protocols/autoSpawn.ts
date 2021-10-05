import { Role, BodyParts, MAX_CREEP_COST } from '../roles';
import { Protocol } from '../protocol';

interface AutoSpawnArgs {
  spawnName: string;
  role: Role;
  max: number;
}

export const autoSpawn: Protocol<AutoSpawnArgs> = ({ spawnName, role, max }) => {
  const spawn = Game.spawns[spawnName];
  const controllerLevel = spawn.room.controller?.level ?? 0;

  const creeps = _.filter(Game.creeps, ({ memory }) => (
    memory.role === role && memory.room === spawn.room.name
  ));
  if (creeps.length <= max) {
    console.log(role + 's: [' + creeps.length + '/' + max + ']');
  }

  // case for when all harvesters die
  if (role === Role.harvester && creeps.length <= 0 && !spawn.spawning) {
    const currentEnergy = spawn.room.energyAvailable;
    const body = getBodyParts(role, controllerLevel, currentEnergy);
    if (body) spawnNewScreep(spawn, role, body);
  }

  if (creeps.length < max && !spawn.spawning) {
    const maxEnergy = spawn.room.energyCapacityAvailable;
    const body = getBodyParts(role, controllerLevel, maxEnergy);
    if (body) spawnNewScreep(spawn, role, body);
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
