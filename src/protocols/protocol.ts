export type Protocol = (args?: any) => boolean;

export const executeProtocols = (protocols: Protocol[]) => {
  const protocol = protocols.shift();
  if (protocol && protocol() === true) {
    executeProtocols(protocols);
  }
}
