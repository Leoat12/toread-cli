export interface Article {
    id?: number;
    title: string;
    url: string;
    description?: string;
    tags?: string[];
    status: Status;
}

export enum Status {
    ToRead = "TO READ",
    Reading = "READING",
    Read = "READ"
}
