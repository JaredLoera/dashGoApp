import { user } from "./user";
import { reportType } from "./reportType";
import { ReportStatus } from "./reportStatus";

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
}