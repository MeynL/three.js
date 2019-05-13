import {Object3D} from '../../../src/Three';

export class SVGObject extends Object3D {
  constructor(node);
}

export class SVGRenderer {

  domElement;
  autoClear;
  sortObjects;
  sortElements;
  info;

  constructor();

  setQuality(quality);

  setClearColor(color, alpha);
  setPixelRatio();
  setSize(width, height);
  setPrecision(precision);
  clear();
  render(scene, camera);
}
