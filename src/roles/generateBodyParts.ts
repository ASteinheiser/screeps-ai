import { Role, MAX_CREEP_COST } from './constants';

export const generateBodyParts = (controllerLevel: number, role: Role) => {
  return [];
}

const generatePartsPerControllerLevel = (role: Role) => {
  // there are 9 controller levels (0 - 8)
  return [...Array(9)].map((_, controllerLevel) => {
    return generateBodyParts(controllerLevel, role);
  });
};

export const BodyParts = {
  [Role.harvester]: generatePartsPerControllerLevel(Role.harvester),
  [Role.builder]: generatePartsPerControllerLevel(Role.builder),
  [Role.upgrader]: generatePartsPerControllerLevel(Role.upgrader),
}
