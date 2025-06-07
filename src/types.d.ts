// Type definitions for LibRaw WebAssembly wrapper
// These types are inferred from typical LibRaw C++ API usage

export interface Metadata {
    thumb_format?: number | string;
    desc?: string;
    timestamp?: number | string;
    [key: string]: unknown;
}

export interface LibRawImageMetadata {
    width: number;
    height: number;
    colors: number;
    bits: number;
    raw_count: number;
    dng_version?: number;
    make: string;
    model: string;
    iso_speed: number;
    shutter: number;
    aperture: number;
    timestamp: number;
    orientation?: number;
    shot_order?: number;
    // ...add more fields as needed
}

export interface LibRawProcessingParams {
    gamma?: [number, number];
    no_auto_bright?: boolean;
    use_camera_wb?: boolean;
    use_auto_wb?: boolean;
    output_bps?: 8 | 16;
    four_color_rgb?: boolean;
    highlight?: number;
    // ...add more fields as needed
}

export interface LibRawImageData {
    data: Uint8Array | Uint16Array;
    width: number;
    height: number;
    colors: number;
    bits: number;
    dataSize: number;
    // ...add more fields as needed
}

export interface LibRawRawImageData {
    data: Uint16Array;
    raw_height: number;
    raw_width: number;
    top_margin: number;
    left_margin: number;
    height: number;
    width: number;
}

// --- Color Data ---
export interface LibRawColorData {
    black: number;
    data_maximum: number;
    maximum: number;
    fmaximum: number;
    fnorm: number;
    cam_mul: number[];
    pre_mul: number[];
    flash_used: number;
    canon_ev: number;
    model2: string;
    UniqueCameraModel: string;
    LocalizedCameraModel: string;
    ImageUniqueID: string;
    RawDataUniqueID: string;
    raw_bps: number;
    ExifColorSpace: number;
    // ...add more as needed
}

// --- Common Metadata ---
export interface LibRawMetadataCommon {
    FlashEC: number;
    FlashGN: number;
    CameraTemperature: number;
    SensorTemperature: number;
    SensorTemperature2: number;
    LensTemperature: number;
    AmbientTemperature: number;
    BatteryTemperature: number;
    exifAmbientTemperature: number;
    exifHumidity: number;
    exifPressure: number;
    exifWaterDepth: number;
    exifAcceleration: number;
    exifCameraElevationAngle: number;
    real_ISO: number;
    exifExposureIndex: number;
    ColorSpace: number;
    firmware: string;
    ExposureCalibrationShift: number;
    afdata: Array<{
        AFInfoData_tag: number;
        AFInfoData_order: number;
        AFInfoData_version: number;
        AFInfoData_length: number;
    }>;
}

// --- Per-brand makernotes (partial, add more as needed) ---
export interface LibRawCanonMakernotes {
    ColorDataVer: number;
    ColorDataSubVer: number;
    SpecularWhiteLevel: number;
    NormalWhiteLevel: number;
    ChannelBlackLevel: number[];
    AverageBlackLevel: number;
    multishot: number[];
    MeteringMode: number;
    SpotMeteringMode: number;
    FlashMeteringMode: number;
    FlashExposureLock: number;
    ExposureMode: number;
    AESetting: number;
    ImageStabilization: number;
    FlashMode: number;
    FlashActivity: number;
    FlashBits: number;
    ManualFlashOutput: number;
    FlashOutput: number;
    FlashGuideNumber: number;
    ContinuousDrive: number;
    SensorWidth: number;
    SensorHeight: number;
    AFMicroAdjMode: number;
    AFMicroAdjValue: number;
    MakernotesFlip: number;
    RecordMode: number;
    SRAWQuality: number;
    wbi: number;
    RF_lensID: number;
    AutoLightingOptimizer: number;
    HighlightTonePriority: number;
    Quality: number;
    CanonLog: number;
    ISOgain: number[];
}

export interface LibRawNikonMakernotes {
    ExposureBracketValue: number;
    ActiveDLighting: number;
    ShootingMode: number;
    ImageStabilization: number[];
    VibrationReduction: number;
    FlashSetting: string;
    FlashType: string;
    FlashExposureCompensation: number[];
    ExternalFlashExposureComp: number[];
    FlashExposureBracketValue0: number;
    FlashExposureBracketValue1: number;
    FlashExposureBracketValue2: number;
    FlashExposureBracketValue3: number;
    FlashMode: number;
    FlashExposureCompensation2: number;
    FlashExposureCompensation3: number;
    FlashExposureCompensation4: number;
    FlashSource: number;
    FlashFirmware0: number;
    FlashFirmware1: number;
    ExternalFlashFlags: number;
    FlashControlCommanderMode: number;
    FlashOutputAndCompensation: number;
    FlashFocalLength: number;
    FlashGNDistance: number;
    FlashGroupOutputAndCompensation: number[];
    FlashGroupControlMode0: number;
    FlashGroupControlMode1: number;
    FlashGroupControlMode2: number;
    FlashGroupControlMode3: number;
    FlashColorFilter: number;
    NEFCompression: number;
    ExposureMode: number;
    ExposureProgram: number;
    nMEshots: number;
    MEgainOn: number;
    ME_WB: number[];
    AFFineTune: number;
    AFFineTuneIndex: number;
    AFFineTuneAdj: number;
    LensDataVersion: string;
    FlashInfoVersion: string;
    ColorBalanceVersion: string;
    key: number;
    NEFBitDepth: number[];
    HighSpeedCropFormat: number;
    SensorHighSpeedCrop: { cleft: number; ctop: number; cwidth: number; cheight: number };
    SensorWidth: number;
    SensorHeight: number;
    Active_D_Lighting: number;
    ShotInfoVersion: string;
    MakernotesFlip: number;
    RollAngle: number;
    PitchAngle: number;
    YawAngle: number;
}

export interface LibRawFujiMakernotes {
    ExpoMidPointShift: number;
    DynamicRange: number;
    FilmMode: number;
    DynamicRangeSetting: number;
    DevelopmentDynamicRange: number;
    AutoDynamicRange: number;
    DRangePriority: number;
    DRangePriorityAuto: number;
    DRangePriorityFixed: number;
    BrightnessCompensation: number;
    FocusMode: number;
    AFMode: number;
    FocusPixel: number[];
    PrioritySettings: number;
    FocusSettings: number;
    AF_C_Settings: number;
    FocusWarning: number;
    ImageStabilization: number[];
    FlashMode: number;
    WB_Preset: number;
    ShutterType: number;
    ExrMode: number;
    Macro: number;
    Rating: number;
    CropMode: number;
    SerialSignature: string;
    SensorID: string;
    RAFVersion: string;
    RAFDataGeneration: number;
    RAFDataVersion: number;
    isTSNERDTS: number;
    DriveMode: number;
    BlackLevel: number[];
    RAFData_ImageSizeTable: number[];
    AutoBracketing: number;
    SequenceNumber: number;
    SeriesLength: number;
    PixelShiftOffset: number[];
    ImageCount: number;
}

export interface LibRawSonyMakernotes {
    CameraType: number;
    Sony0x9400_version: number;
    Sony0x9400_ReleaseMode2: number;
    Sony0x9400_SequenceImageNumber: number;
    Sony0x9400_SequenceLength1: number;
    Sony0x9400_SequenceFileNumber: number;
    Sony0x9400_SequenceLength2: number;
    AFAreaModeSetting: number;
    AFAreaMode: number;
    FlexibleSpotPosition: number[];
    AFPointSelected: number;
    AFPointSelected_0x201e: number;
    AFType: number;
    FocusLocation: number[];
    FocusPosition: number;
    AFMicroAdjValue: number;
    AFMicroAdjOn: number;
    AFMicroAdjRegisteredLenses: number;
    VariableLowPassFilter: number;
    LongExposureNoiseReduction: number;
    HighISONoiseReduction: number;
    HDR: number[];
    group2010: number;
    group9050: number;
    real_iso_offset: number;
    MeteringMode_offset: number;
    ExposureProgram_offset: number;
    ReleaseMode2_offset: number;
    MinoltaCamID: number;
    firmware: string;
    ImageCount3_offset: number;
    ImageCount3: number;
    ElectronicFrontCurtainShutter: number;
    MeteringMode2: number;
    SonyDateTime: string;
    ShotNumberSincePowerUp: number;
    PixelShiftGroupPrefix: number;
    PixelShiftGroupID: number;
    nShotsInPixelShiftGroup: number;
    numInPixelShiftGroup: number;
    prd_ImageHeight: number;
    prd_ImageWidth: number;
    prd_Total_bps: number;
    prd_Active_bps: number;
    prd_StorageMethod: number;
    prd_BayerPattern: number;
    SonyRawFileType: number;
    RAWFileType: number;
    RawSizeType: number;
    Quality: number;
    FileFormat: number;
    MetaVersion: string;
}

export interface LibRawPanasonicMakernotes {
    Compression: number;
    BlackLevelDim: number;
    BlackLevel: number[];
    Multishot: number;
    gamma: number;
    HighISOMultiplier: number[];
    FocusStepNear: number;
    FocusStepCount: number;
    ZoomPosition: number;
    LensManufacturer: number;
}

export interface LibRawOlympusMakernotes {
    CameraType2: number[];
    ValidBits: number;
    DriveMode: number[];
    ColorSpace: number;
    FocusMode: number[];
    AutoFocus: number;
    AFPoint: number;
    AFAreas: number[];
    AFPointSelected: number[];
    AFResult: number;
    AFFineTune: number;
    AFFineTuneAdj: number[];
    AspectFrameLeft: number;
    AspectFrameTop: number;
    AspectFrameWidth: number;
    AspectFrameHeight: number;
    Panorama_mode: number;
    Panorama_frameNum: number;
}

export interface LibRawPentaxMakernotes {
    DriveMode: number[];
    FocusMode: number[];
    AFPointSelected: number[];
    AFPointSelected_Area: number;
    AFPointsInFocus_version: number;
    AFPointsInFocus: number;
    FocusPosition: number;
    AFAdjustment: number;
    AFPointMode: number;
    MultiExposure: number;
    Quality: number;
}

export interface LibRawHasselbladMakernotes {
    BaseISO: number;
    Gain: number;
    Sensor: string;
    SensorUnit: string;
    HostBody: string;
    SensorCode: number;
    SensorSubCode: number;
    CoatingCode: number;
    uncropped: number;
    CaptureSequenceInitiator: string;
    SensorUnitConnector: string;
    format: number;
    nIFD_CM: number[];
    RecommendedCrop: number[];
    mnColorMatrix: number[][];
}

export interface LibRawRicohMakernotes {
    AFStatus: number;
    AFAreaXPosition: number[];
    AFAreaYPosition: number[];
    AFAreaMode: number;
    SensorWidth: number;
    SensorHeight: number;
    CroppedImageWidth: number;
    CroppedImageHeight: number;
    WideAdapter: number;
    CropMode: number;
    NDFilter: number;
    AutoBracketing: number;
    MacroMode: number;
    FlashMode: number;
    FlashExposureComp: number;
    ManualFlashOutput: number;
}

export interface LibRawSamsungMakernotes {
    ImageSizeFull: number[];
    ImageSizeCrop: number[];
    key: number[];
    ColorSpace0: number;
    ColorSpace1: number;
    DigitalGain: number;
    DeviceType: number;
    LensFirmware: string;
}

export interface LibRawKodakMakernotes {
    BlackLevelTop: number;
    BlackLevelBottom: number;
    offset_left: number;
    offset_top: number;
    clipBlack: number;
    clipWhite: number;
    val018percent: number;
    val100percent: number;
    val170percent: number;
    MakerNoteKodak8a: number;
    ISOCalibrationGain: number;
    AnalogISO: number;
}

export interface LibRawPhaseOneMakernotes {
    Software: string;
    SystemType: string;
    FirmwareString: string;
    SystemModel: string;
}

// --- Main Metadata ---
export interface LibRawBasicMetadata {
    width: number;
    height: number;
    raw_width: number;
    raw_height: number;
    top_margin: number;
    left_margin: number;
    camera_make: string;
    camera_model: string;
    iso_speed: number;
    shutter: number;
    aperture: number;
    focal_len: number;
    timestamp: Date;
    shot_order: number;
    desc: string;
    artist: string;
    thumb_width: number;
    thumb_height: number;
    thumb_format: string;
}

export interface LibRawFullMetadata extends LibRawBasicMetadata {
    color_data: LibRawColorData;
    metadata_common: LibRawMetadataCommon;
    canon?: LibRawCanonMakernotes;
    nikon?: LibRawNikonMakernotes;
    fuji?: LibRawFujiMakernotes;
    sony?: LibRawSonyMakernotes;
    panasonic?: LibRawPanasonicMakernotes;
    olympus?: LibRawOlympusMakernotes;
    pentax?: LibRawPentaxMakernotes;
    hasselblad?: LibRawHasselbladMakernotes;
    ricoh?: LibRawRicohMakernotes;
    samsung?: LibRawSamsungMakernotes;
    kodak?: LibRawKodakMakernotes;
    p1?: LibRawPhaseOneMakernotes;
}

// --- Settings ---
export interface LibRawSettings {
    greybox?: [number, number, number, number];
    cropbox?: [number, number, number, number];
    aber?: [number, number, number, number];
    gamm?: [number, number, number, number, number, number];
    userMul?: [number, number, number, number];
    bright?: number;
    threshold?: number;
    autoBrightThr?: number;
    adjustMaximumThr?: number;
    expShift?: number;
    expPreser?: number;
    halfSize?: number;
    fourColorRgb?: number;
    highlight?: number;
    useAutoWb?: number;
    useCameraWb?: number;
    useCameraMatrix?: number;
    outputColor?: number;
    outputBps?: number;
    outputTiff?: number;
    outputFlags?: number;
    userFlip?: number;
    userQual?: number;
    userBlack?: number;
    userCblack?: [number, number, number, number];
    userSat?: number;
    medPasses?: number;
    noAutoBright?: number;
    useFujiRotate?: number;
    greenMatching?: number;
    dcbIterations?: number;
    dcbEnhanceFl?: number;
    fbddNoiserd?: number;
    expCorrec?: number;
    noAutoScale?: number;
    noInterpolation?: number;
    outputProfile?: string;
    cameraProfile?: string;
    badPixels?: string;
    darkFrame?: string;
}

export interface LibRaw {
    open(buffer: Uint8Array, settings?: LibRawSettings): Promise<void>;
    metadata<T extends boolean>(fullOutput?: T): Promise<T extends true ? LibRawFullMetadata : LibRawBasicMetadata>;
    imageData(): Promise<LibRawImageData>;
    rawImageData(): Promise<LibRawRawImageData>;
}

export class LibRawWrapper {
    constructor();
    open_buffer(buffer: ArrayBuffer | Uint8Array): Promise<void>;
    open_file(path: string): Promise<void>;
    unpack(): Promise<void>;
    dcraw_process(params?: LibRawProcessingParams): Promise<void>;
    get_image_data(): Promise<LibRawImageData>;
    get_metadata(): Promise<LibRawFullMetadata>;
    recycle(): void;
    // ...add more methods as needed
}

// If there are global functions, declare them here
// export function someGlobalFunction(...): ...
