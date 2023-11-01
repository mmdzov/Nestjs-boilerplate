import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { cwd } from 'process';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(cwd(), YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
