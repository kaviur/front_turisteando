import { string } from "zod";

export interface Reservation {
  touristPlanId: number;
  userId: number;
  status: boolean;
  startDate: Date;
  endDate: Date;
  peopleCount: number;
  totalPrice: number;
  touristPlanTitle: string;
}
