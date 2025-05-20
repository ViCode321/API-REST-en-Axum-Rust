
export type User = {
    id: number;
    email: string;
    token: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};
