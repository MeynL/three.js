import {
  Material,
  LoadingManager,
  Group
} from '../../../src/Three';

export class TGALoader {
  constructor(manager?: LoadingManager);

  load(url, onLoad?, onProgress?, onError?)

  parse(buffer);

  setPath(value);
}
