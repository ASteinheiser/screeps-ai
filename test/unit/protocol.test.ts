import { executeProtocols } from '../../src/protocol';

describe('executeProtocols', () => {
  it('should execute protocols', () => {
    const expected = {
      myFunc1: false,
      myFunc2: false,
      myFunc3: false,
    }
    const myFunc1 = () => {
      expected.myFunc1 = true;
      return true;
    }
    const myFunc2 = () => {
      expected.myFunc2 = true;
      return true;
    }
    const myFunc3 = () => {
      expected.myFunc3 = true;
      return true;
    }

    const protocols = [myFunc1, myFunc2, myFunc3];
    executeProtocols(protocols);

    chai.expect(expected.myFunc1).to.be.true;
    chai.expect(expected.myFunc2).to.be.true;
    chai.expect(expected.myFunc3).to.be.true;
  });

  it('stop calling functions if return value is false', () => {
    const expected = {
      myFunc1: false,
      myFunc2: false,
      myFunc3: false,
    }
    const myFunc1 = () => {
      expected.myFunc1 = true;
      return false;
    }
    const myFunc2 = () => {
      expected.myFunc2 = true;
      return true;
    }
    const myFunc3 = () => {
      expected.myFunc3 = true;
      return true;
    }

    const protocols = [myFunc1, myFunc2, myFunc3];
    executeProtocols(protocols);

    chai.expect(expected.myFunc1).to.be.true;
    chai.expect(expected.myFunc2).to.be.false;
    chai.expect(expected.myFunc3).to.be.false;
  });
});
