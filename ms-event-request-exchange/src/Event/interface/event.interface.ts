export interface EventInterface {

    startDate?: string,
    startTime?: string
    endDate?: string;
    endTime?: string;
    name: string;
    event_address: string;
    description?: string;
    participant?: number;
    image?:string
    association_id: string;
    groups?: string[]
}