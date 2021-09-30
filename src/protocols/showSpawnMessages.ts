import { Protocol } from './protocol';

const showSpawnMessages: Protocol = () => {
  for (const spawnName in Game.spawns) {
    if (Game.spawns[spawnName].spawning) {
      const spawningCreep = Game.creeps[Game.spawns[spawnName].spawning?.name || ''];
      Game.spawns[spawnName].room.visual.text(
        '👹' + spawningCreep.memory.role + '👺',
        Game.spawns[spawnName].pos.x + 1,
        Game.spawns[spawnName].pos.y,
        {align: 'left', opacity: 0.8});
    }
  }
  return true;
}

export default showSpawnMessages;
