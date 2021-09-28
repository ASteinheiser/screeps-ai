import { Role } from './types';

interface AutoSpawnArgs {
  spawnName: string;
  role: Role;
  max: number;
}

const autoSpawn = ({ spawnName, role, max }: AutoSpawnArgs) => {
  const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role);
  console.log(role + 's: [' + creeps.length + '/' + max + ']');

  if (creeps.length < max && !Game.spawns[spawnName].spawning) {
    spawnNewScreep(spawnName, role);
  }

  if (Game.spawns[spawnName].spawning) {
    showSpawningMessage(spawnName);
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

const spawnNewScreep = (spawnName: string, role: string) => {
  const spawn = Game.spawns[spawnName];
  const newName = role + Game.time;
  const actions = getActions(role);
  if (spawn.spawnCreep(actions, newName, {memory: {role} as any}) === OK) {
    console.log('Spawning new ' + role + ': ' + newName);
  }
}

const showSpawningMessage = (spawnName: string) => {
  const spawningCreep = Game.creeps[Game.spawns[spawnName].spawning?.name || ''];
  Game.spawns[spawnName].room.visual.text(
    '👹' + spawningCreep.memory.role + '👺',
    Game.spawns[spawnName].pos.x + 1,
    Game.spawns[spawnName].pos.y,
    {align: 'left', opacity: 0.8});
}
