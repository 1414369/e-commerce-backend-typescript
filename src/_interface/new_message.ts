export interface iSocket {
    event: string,
    data: iSocketData,
    token: string,
}

export interface iSocketData {
    id: string,
    time_date: number,
}
export interface iNewMessage extends iSocketData {
    receiver: string,
    message: string,
}