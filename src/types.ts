export enum Role {
  harvester = 'harvester',
  builder = 'builder',
  upgrader = 'upgrader',
}

export const Body = {
  worker_v1: {
    cost: 200,
    body: [WORK, CARRY, MOVE],
  },
  worker_v2: {
    cost: 400,
    body: [WORK, WORK, CARRY, MOVE, MOVE, MOVE],
  },
  worker_v3: {
    cost: 800,
    body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
  },
}
