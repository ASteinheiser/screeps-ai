export enum Role {
  harvester = 'harvester',
  builder = 'builder',
  upgrader = 'upgrader',
}

export const Body = {
  worker: [
    {
      cost: 800,
      body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    },
    {
      cost: 400,
      body: [WORK, WORK, CARRY, MOVE, MOVE, MOVE],
    },
    {
      cost: 200,
      body: [WORK, CARRY, MOVE],
    },
  ],
}
