import {IPaginatorModel} from "./paginator.model";

export interface IListWithIncludeModel<T> {
    entities: T[];
    paginator: IPaginatorModel;
    totalCount: number;
}