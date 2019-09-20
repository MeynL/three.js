import {
	Uniform
} from '../../../src/Three';

// export interface FXAAShader {
//   uniforms: {
//     tDiffuse: Uniform;
//     resolution: Uniform;
//   };
//   vertexShader: string;
//   fragmentShader: string;
// }
export class FXAAShader {
	static uniforms: {
		tDiffuse: Uniform;
		resolution: Uniform;
	};
	static vertexShader: string;
	static fragmentShader: string;
}
