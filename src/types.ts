export enum Role {
  harvester = 'harvester',
  builder = 'builder',
  upgrader = 'upgrader',
}

const worker = [
  {
    cost: 1600,
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  },
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
];

export const Body = {
  [Role.harvester]: worker,
  [Role.builder]: worker,
  [Role.upgrader]: worker,
}
