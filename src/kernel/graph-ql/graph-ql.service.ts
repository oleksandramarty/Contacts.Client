import { Injectable } from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {Observable, tap} from "rxjs";
import {ApolloQueryResult} from "@apollo/client";
import {IContactModel} from "../models/contacts/contact.model";
import {
    CREATE_CONTACT,
    DELETE_CONTACT,
    GET_CONTACT_BY_ID,
    GET_FILTERED_CONTACTS,
    UPDATE_CONTACT
} from "./graph-ql.query";
import {IPaginatorModel} from "../models/common/paginator.model";
import {IBaseSortableModel} from "../models/common/base-sortable.model";
import {IListWithIncludeModel} from "../models/common/list-with-include.model";

@Injectable({
    providedIn: 'root',
})
export class GraphQLService {
    constructor(private apollo: Apollo) {
    }

    public createContact(model: IContactModel): Observable<MutationResult<IContactModel | undefined>> {
        return this.apollo
            .mutate({
                mutation: CREATE_CONTACT,
                variables: {
                    input: {
                        firstName: model.firstName,
                        lastName: model.lastName,
                        email: model.email,
                        phone: model.phone,
                        title: model.title,
                        middleInitial: model.middleInitial,
                    },
                },
            });
    }

    public updateContact(model: IContactModel): Observable<MutationResult<IContactModel | undefined>> {
        return this.apollo
            .mutate({
                mutation: UPDATE_CONTACT,
                variables: {
                    id: model.id,
                    input: {
                        firstName: model.firstName,
                        lastName: model.lastName,
                        email: model.email,
                        phone: model.phone,
                        title: model.title,
                        middleInitial: model.middleInitial,
                    },
                },
            });
    }

    public deleteContact(id: number): Observable<MutationResult<boolean | undefined>> {
        return this.apollo
            .mutate({
                mutation: DELETE_CONTACT,
                variables: {
                    id,
                },
            });
    }

    public getContactById(id: number | undefined): Observable<ApolloQueryResult<{ contact: IContactModel | undefined }>> {
        return this.apollo
            .watchQuery({
                query: GET_CONTACT_BY_ID,
                variables: {
                    id: id!,
                },
                fetchPolicy: 'network-only',
            }).valueChanges as Observable<ApolloQueryResult<{ contact: IContactModel | undefined }>>;
    }

    public getFilteredContacts(
        query: string | undefined,
        paginator: IPaginatorModel | undefined,
        sort: IBaseSortableModel | undefined
    ): Observable<ApolloQueryResult<{ contacts: IListWithIncludeModel<IContactModel> | undefined }>> {
        let sortColumn = sort?.column ?? 'Id';
        return this.apollo
            .watchQuery({
                query: GET_FILTERED_CONTACTS,
                variables: {
                    query: query ?? null,
                    isFull: paginator?.isFull ?? false,
                    pageNumber: paginator?.pageNumber ?? 1,
                    pageSize: paginator?.pageSize ?? 5,
                    column: sortColumn,
                    direction: `${sort?.direction ?? 'desc'}`,
                },
                fetchPolicy: 'network-only',
            }).valueChanges as Observable<ApolloQueryResult<{ contacts: IListWithIncludeModel<IContactModel> | undefined }>>;
    }
}