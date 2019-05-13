import {Scene, Camera} from '../../../src/Three';

export class RaytracingRenderer {
  constructor(parameters?);

  autoClear: boolean;

  domElement: HTMLElement | HTMLDocument;

  randomize;

  setWorkers(workers: any): void;

  setClearColor(color: any): void;

  setSize(width: number, height: number): void;

  render(scene: Scene, camera: Camera): void;
}
