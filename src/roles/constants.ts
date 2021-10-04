// Accounts for the max capacity of a creep
// with a spawn and all the extensions built.
// The indexes line up with the controller level.
export const MAX_CREEP_COST = [
  300, // 1 spawn * 300 capacity
  300,  // 1 spawn * 300 capacity
  300 + 250, // 5 extensions * 50 capacity
  300 + 500, // 10 extensions * 50 capacity
  300 + 1000, // 20 extensions * 50 capacity
  300 + 1500, // 30 extensions * 50 capacity
  300 + 2300, // 40 extensions * 50 capacity
  300 + 5000, // 50 extensions * 100 capacity
  300 + 12000, // 60 extensions * 200 capacity
];

export enum Role {
  harvester = 'harvester',
  builder = 'builder',
  upgrader = 'upgrader',
}
