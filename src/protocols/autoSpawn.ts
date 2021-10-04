import { Role, BodyParts } from '../roles';
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

  const body = BodyParts[role][controllerLevel];
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
