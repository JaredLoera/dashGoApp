import { user } from "./user";
import { reportType } from "./reportType";
import { ReportStatus } from "./reportStatus";
import { reportEvents } from "./reportEvents";
import { Photo } from "./photo";

export interface reports {
    id:             number;
    userId:         number;
    reportTypeId:   number;
    reportStatusId: number;
    description:    string;
    latitude:       string;
    longitude:      string;
    createdAt:      Date;
    updatedAt:      Date;
    reportType:     reportType;
    reportStatus:   ReportStatus;
    user:           user;
    events:         reportEvents[];
    photos:         Photo[];
}