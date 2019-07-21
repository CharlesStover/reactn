import createProvider from '../../../src/create-provider';
import REACT_CONTEXT_ERROR from '../../../src/utils/react-context-error';

export default function itShouldRequireContext(): void {
  it('should require Context', (): void => {
    expect((): void => {
      createProvider();
    }).toThrowError(REACT_CONTEXT_ERROR);
  });
}
