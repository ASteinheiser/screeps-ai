interface AutoSpawnArgs {
  spawn: string;
  role: string;
  max: number;
}

const autoSpawn = ({ spawn, role, max }: AutoSpawnArgs) => {
  const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role);
  console.log(role + 's: ' + creeps.length);

  if (creeps.length < max) {
    const newName = role + Game.time;
    console.log('Spawning new ' + role + ': ' + newName);
    Game.spawns[spawn].spawnCreep(getActions(role), newName, {memory: {role} as any});
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
    case 'harvester':
    case 'upgrader':
    case 'builder':
    default:
      return [WORK, CARRY, MOVE];
  }
}
