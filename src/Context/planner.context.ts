import { createContext } from 'react';
import { UsePlannerReturned } from '../hooks/usePlanner';

export const PlannerContext = createContext<UsePlannerReturned | null>(null);
