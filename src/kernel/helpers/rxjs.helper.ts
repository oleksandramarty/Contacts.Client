import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, finalize, throwError} from "rxjs";

export function handleApiError(snackBar: MatSnackBar) {
    return catchError((error: any) => {
        console.error(error);
        snackBar.open(error?.message ?? 'An error occurred. Please try again.', 'Close', { duration: 3000 });
        return throwError(() => error);
    });
}
