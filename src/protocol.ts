export type Protocol<T = void> = (args: T) => boolean;

export const executeProtocols = (protocols: Protocol[]) => {
  const protocol = protocols.shift();
  if (protocol && protocol() === true) {
    executeProtocols(protocols);
  }
}
