import { User } from '../entities';

export interface DebtOwner {
    user: User;
    amountOwes: number;
    weight: number;
}
