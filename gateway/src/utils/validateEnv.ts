import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

export function getEnv<T>(varName: string, fallback?: T): T {
  const value: any = process.env[varName];
  if (value === undefined) {
    if (fallback === undefined) {
      console.log('!!!!! validateEnv.ts', 'GetEnv.Nonexistent: ' + varName + ' does not exist ' + 'and no fallback value provided.');
      throw new Error('GetEnv.Nonexistent: ' + varName + ' does not exist ' + 'and no fallback value provided.');
    }
    return fallback;
  }
  return value;
}

export default validateEnv;
