import { Role } from '../../src/roles/constants';
import { generateBodyParts, generateParts } from '../../src/roles/generateBodyParts';

describe('generateParts', () => {
  it('should generate the correct amount of parts', () => {
    const actual = generateParts(WORK, 4);
    const expected = [WORK, WORK, WORK, WORK];
    chai.expect(actual).to.deep.equal(expected);
  });
});

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
