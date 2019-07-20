export default function flushPromises(): Promise<void> {
  return new Promise((resolve): void => {
    setImmediate(resolve);
  });
}
