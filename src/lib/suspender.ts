export type Suspended<T> = {
    read: () => T;
};

type PromiseStatus = 'pending' | 'success' | 'error';

export const suspendPromise = <T>(promise: Promise<T>): Suspended<T> => {
    let status: PromiseStatus = 'pending';
    let result: T | null = null;
    let suspender: Promise<void> = promise
        .then((val: T) => {
            status = 'success';
            result = val;
        })
        .catch(error => {
            status = 'error';
            result = error;
        });

    const read = (): T => {
        switch (status) {
            case 'pending':
                throw suspender;

            case 'success':
                return result as T;

            case 'error':
                throw result;
        }
    };

    return {
        read,
    };
};

