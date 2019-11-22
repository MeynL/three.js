import {
	TrianglesDrawMode,
	DefaultLoadingManager
} from '../../../src/Three';

export class DRACOLoader {
	public manager;
	public timeLoaded;
	public materials;
	public verbosity;
	public attributeOptions;
	public drawMode;
	// Native Draco attribute type to Three.JS attribute type.
	public nativeAttributeMap;
	public decoderPath;
	public decoderConfig;
	public decoderModulePromise;

	constructor(manager?);

	load (url, onLoad, onProgress, onError): void;
	setPath(value): this;
	setVerbosity(level): this;
	setDrawMode(drawMode): this;
	setSkipDequantization(attributeName, skip): this;

	decodeDracoFile (rawBuffer, callback, attributeUniqueIdMap, attributeTypeMap): void;
	decodeDracoFileInternal (rawBuffer, dracoDecoder, callback, attributeUniqueIdMap, attributeTypeMap): void;
	addAttributeToGeometry (dracoDecoder, decoder, dracoGeometry, attributeName, attributeType, attribute, geometry, geometryBuffer): void;
	convertDracoGeometryTo3JS (dracoDecoder, decoder, geometryType, buffer, attributeUniqueIdMap, attributeTypeMap): void;
	isVersionSupported(version, callback): void;
	getAttributeOptions(attributeName): void;
	setDecoderPath(path): void;
	setDecoderConfig(config): void;
	releaseDecoderModule(): void;
	getDecoderModule(): void;
	_loadScript(src): void;
	_loadArrayBuffer(src): void;
}
