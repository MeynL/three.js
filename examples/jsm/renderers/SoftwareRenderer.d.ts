export class SoftwareRenderer {

  domElement;
  autoClear;

  constructor(parameters?);

  setClearColor(color, alpha);
  setPixelRatio();
  setSize(width, height);
  clear();
  render(scene, camera);

}
