import { Observable, of } from 'rxjs';

export class ApolloMock {
    watchQuery(options: any): any {
        return {
            valueChanges: of({
                data: {
                    contacts: {
                        entities: [],
                    },
                },
            }),
        };
    }

    mutate(options: any): Observable<any> {
        return of({});
    }
}
