export const sleep = <T>(time: number, data?: T): Promise<T> => {
    return new Promise(res => setTimeout(() => res(data), time));
};
