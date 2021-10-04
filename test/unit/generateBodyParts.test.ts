import { Role } from '../../src/roles/constants';
import { generateBodyParts } from '../../src/roles/generateBodyParts';

describe('generateBodyParts', () => {
  describe('Role.harvester', () => {
    it('Controller level: 0', () => {
      const actual = generateBodyParts(0, Role.harvester);
      const expected = [WORK, WORK, CARRY, MOVE];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 1', () => {
      const actual = generateBodyParts(0, Role.harvester);
      const expected = [WORK, WORK, CARRY, MOVE];
      chai.expect(actual).to.deep.equal(expected);
    });
  });
});
