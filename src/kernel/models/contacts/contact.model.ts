import {IPaginatorModel} from "../common/paginator.model";

export interface IContactModel {
    id?: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    title: string | undefined;
    middleInitial?: string | undefined;
}
