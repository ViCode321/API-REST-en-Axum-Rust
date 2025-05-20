import type { LoginPayload } from '../types/user';

const API_URL = 'http://localhost:3000/api/auth/login';

export const login = async (data: LoginPayload): Promise<{ token: string }> => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error(`Login failed with status ${res.status}`);
    }

    return res.json();
};
