import {
	RGBAFormat,
	LinearMipMapLinearFilter,
	LinearFilter,
	ClampToEdgeWrapping,
	UnsignedByteType
} from '../constants.js';
import { FileLoader } from './FileLoader.js';
import { CompressedTexture } from '../textures/CompressedTexture.js';
import { Loader } from './Loader.js';

/**
 * @author mrdoob / http://mrdoob.com/
 *
 * Abstract Base class to block based textures loader (dds, pvr, ...)
 *
 * Sub classes have to implement the parse() method which will be used in load().
 */

function TamuCompressedTextureLoader( manager ) {

	Loader.call( this, manager );

}

TamuCompressedTextureLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: TamuCompressedTextureLoader,

	load: function ( url, onLoad, onProgress, onError, size, interleaved ) {

		const scope = this;

		const images = [];

		const texture = new CompressedTexture();
		texture.image = images;

		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setResponseType( 'arraybuffer' );

		let loaded = 0;

		function loadTexture( i ) {

			loader.load( url[ i ], function ( buffer ) {

				const texDatas = scope.parse( buffer, true );

				images[ i ] = {
					width: texDatas.width,
					height: texDatas.height,
					format: texDatas.format,
					mipmaps: texDatas.mipmaps
				};

				loaded += 1;

				if ( loaded === 6 ) {

					if ( texDatas.mipmapCount === 1 )
						texture.minFilter = LinearFilter;

					texture.format = texDatas.format;
					texture.needsUpdate = true;

					if ( onLoad ) onLoad( texture );

				}

			}, onProgress, onError );

		}

		if ( Array.isArray( url ) ) {

			for ( let i = 0, il = url.length; i < il; ++ i ) {

				loadTexture( i );

			}

		} else {

			// compressed cubemap texture stored in a single DDS file

			loader.load( url, function ( buffer ) {


				function parse(t) {

					function n(t, e, _n) {
						for (let _r = t * t, i = 2 * t * t, o = 3 * t * t, a = 0, s = 0; s < _r; s++) {
							_n[a++] = e[s];
							_n[a++] = e[s + _r];
							_n[a++] = e[s + i];
							_n[a++] = e[s + o];
						}
					}

					function flatten(arr) {
						return arr.reduce((flat, toFlatten) => {
							return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
						}, []);
					}


					const e = [], _r = Math.log2(size);
					for (let i = 148, o = 0; o <= _r; o++) {
						const a = Math.pow(2, _r - o)
							// const a = size
							, s = a * a * 4;
						if (i >= t.byteLength) {
							break;
						}
						for (let c = 0; c < 6; c++) {
							let l;
							if (e[c] || (e[c] = []),
								interleaved) {
								const u = new Uint8Array(t, i, s);
								l = new Uint8Array(s);
								n(a, u, l);
							} else {
								l = new Uint8Array(t, i, s);
							}
							e[c].push({
								data: l,
								width: a,
								height: a
							}),
								i += s;
						}
					}
					console.log('-----------------', size, interleaved, flatten(e));
					return {
						isCubemap: true,
						mipmaps: flatten(e),
						mipmapCount: _r + 1,
						width: size,
						height: size,
						format: RGBAFormat,
						minFilter: LinearMipMapLinearFilter,
						magFilter: LinearFilter,
						wrapS: ClampToEdgeWrapping,
						wrapT: ClampToEdgeWrapping,
						type: UnsignedByteType
					}
				}


				const texDatas = parse( buffer, true );
				console.log('------------- data-----', texDatas);

				if ( texDatas.isCubemap ) {

					const faces = texDatas.mipmaps.length / texDatas.mipmapCount;

					for ( let f = 0; f < faces; f ++ ) {

						images[ f ] = { mipmaps: [] };

						for ( let i = 0; i < texDatas.mipmapCount; i ++ ) {

							images[ f ].mipmaps.push( texDatas.mipmaps[ f * texDatas.mipmapCount + i ] );
							images[ f ].format = texDatas.format;
							images[ f ].width = texDatas.width;
							images[ f ].height = texDatas.height;

						}

					}
					console.log('-------------- data', images);

				} else {

					texture.image.width = texDatas.width;
					texture.image.height = texDatas.height;
					texture.mipmaps = texDatas.mipmaps;

				}

				if ( texDatas.mipmapCount === 1 ) {

					texture.minFilter = LinearFilter;

				}

				texture.format = texDatas.format;
				texture.needsUpdate = true;

				if ( onLoad ) onLoad( texture );

			}, onProgress, onError );

		}
		console.log('--------------->????????', texture);

		return texture;

	},

	parser: function (t) {

	}

} );


export { TamuCompressedTextureLoader };
