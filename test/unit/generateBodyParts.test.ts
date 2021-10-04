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
      const expected = [
        ...generateParts(WORK, 2),
        ...generateParts(CARRY, 1),
        ...generateParts(MOVE, 1),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 1', () => {
      const actual = generateBodyParts(1, Role.harvester);
      const expected = [
        ...generateParts(WORK, 2),
        ...generateParts(CARRY, 1),
        ...generateParts(MOVE, 1),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 2', () => {
      const actual = generateBodyParts(2, Role.harvester);
      const expected = [
        ...generateParts(WORK, 3),
        ...generateParts(CARRY, 2),
        ...generateParts(MOVE, 3),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 3', () => {
      const actual = generateBodyParts(3, Role.harvester);
      const expected = [
        ...generateParts(WORK, 4),
        ...generateParts(CARRY, 3),
        ...generateParts(MOVE, 5),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 4', () => {
      const actual = generateBodyParts(4, Role.harvester);
      const expected = [
        ...generateParts(WORK, 7),
        ...generateParts(CARRY, 4),
        ...generateParts(MOVE, 8),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 5', () => {
      const actual = generateBodyParts(5, Role.harvester);
      const expected = [
        ...generateParts(WORK, 9),
        ...generateParts(CARRY, 7),
        ...generateParts(MOVE, 11),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 6', () => {
      const actual = generateBodyParts(6, Role.harvester);
      const expected = [
        ...generateParts(WORK, 13),
        ...generateParts(CARRY, 10),
        ...generateParts(MOVE, 16),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 7', () => {
      const actual = generateBodyParts(7, Role.harvester);
      const expected = [
        ...generateParts(WORK, 27),
        ...generateParts(CARRY, 20),
        ...generateParts(MOVE, 32),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });

    it('Controller level: 8', () => {
      const actual = generateBodyParts(8, Role.harvester);
      const expected = [
        ...generateParts(WORK, 62),
        ...generateParts(CARRY, 48),
        ...generateParts(MOVE, 74),
      ];
      chai.expect(actual).to.deep.equal(expected);
    });
  });
});
