import { Protocol } from '../protocol';

export const showSpawnMessages: Protocol = () => {
  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];

    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning?.name || ''];
      spawn.room.visual.text(
        '👹' + spawningCreep.memory.role + '👺',
        spawn.pos.x + 1,
        spawn.pos.y,
        {align: 'left', opacity: 0.8});
    }
  }
  return true;
}
