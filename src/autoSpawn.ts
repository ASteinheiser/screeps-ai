import { Role } from './types';

interface AutoSpawnArgs {
  spawn: string;
  role: Role;
  max: number;
}

const autoSpawn = ({ spawn, role, max }: AutoSpawnArgs) => {
  const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role);
  console.log(role + 's: ' + creeps.length);

  if (creeps.length < max && !Game.spawns[spawn].spawning) {
    const newName = role + Game.time;
    const spawnResponse = Game.spawns[spawn].spawnCreep(getActions(role), newName, {memory: {role} as any});
    if (spawnResponse !== ERR_NOT_ENOUGH_ENERGY) {
      console.log('Spawning new ' + role + ': ' + newName);
    }
  }

  if (Game.spawns[spawn].spawning) {
    const spawningCreep = Game.creeps[Game.spawns[spawn].spawning?.name || ''];
    Game.spawns[spawn].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns[spawn].pos.x + 1,
      Game.spawns[spawn].pos.y,
      {align: 'left', opacity: 0.8});
  }
}

export default autoSpawn;

const getActions = (role: string) => {
  switch (role) {
    case Role.harvester:
    case Role.upgrader:
    case Role.builder:
    default:
      return [WORK, CARRY, MOVE];
  }
}
