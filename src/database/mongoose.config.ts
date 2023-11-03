import configuration from 'src/config/configuration';

export const mongoDBAddr = () => {
  const { database } = configuration();

  const addr = `mongodb://${database.host}:${database.port}/${database.name}`;

  return addr;
};
