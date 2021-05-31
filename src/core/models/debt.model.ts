import { User } from '../entities';

export interface Debt {
    from: User;
    to: User;
    amount: number;
}
