export interface EventData {
    actorId: string;
    actorRunId: string;
}

export interface Meta {
    origin: string;
    userAgent: string;
}

export interface Stats {
    inputBodyLen: number;
    restartCount: number;
    durationMillis: number;
    resurrectCount: number;
    runTimeSecs: number;
    metamorph: number;
    computeUnits: number;
    memAvgBytes: number;
    memMaxBytes: number;
    memCurrentBytes: number;
    cpuAvgUsage: number;
    cpuMaxUsage: number;
    cpuCurrentUsage: number;
    netRxBytes: number;
    netTxBytes: number;
}

export interface Options {
    build: string;
    timeoutSecs: number;
    memoryMbytes: number;
    diskMbytes: number;
}

export interface Metamorph {
    createdAt: Date;
    actorId: string;
    buildId: string;
    inputKey: string;
}

export interface Usage {
    ACTOR_COMPUTE_UNITS: number;
    DATASET_READS: number;
    DATASET_WRITES: number;
    KEY_VALUE_STORE_READS: number;
    KEY_VALUE_STORE_WRITES: number;
    KEY_VALUE_STORE_LISTS: number;
    REQUEST_QUEUE_READS: number;
    REQUEST_QUEUE_WRITES: number;
    DATA_TRANSFER_INTERNAL_GBYTES: number;
    DATA_TRANSFER_EXTERNAL_GBYTES: number;
    PROXY_RESIDENTIAL_TRANSFER_GBYTES: number;
    PROXY_SERPS: number;
}

export interface Resource {
    id: string;
    actId: string;
    userId: string;
    startedAt: Date;
    finishedAt: Date;
    status: string;
    meta: Meta;
    stats: Stats;
    options: Options;
    buildId: string;
    exitCode: number;
    defaultKeyValueStoreId: string;
    defaultDatasetId: string;
    defaultRequestQueueId: string;
    metamorphs: Metamorph[];
    buildNumber: string;
    containerUrl: string;
    usage: Usage;
}

export class VerifyInstagramInfoDto {
    userId: string;
    createdAt: Date;
    eventType: string;
    eventData: EventData;
    resource: Resource;
}
