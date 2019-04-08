import { LoadingManager, Group } from "../../../src/Three";

export class FBXLoader {

  constructor(manager?: LoadingManager);
  manager: LoadingManager;

  load(url: string, onLoad: (group: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
  parse(FBXText: string, resourceDirectory: string) : Group;

}
