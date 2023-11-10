export type CancelHireRequestModel = {
  request_id: string;
};

export type UpdateHireRequestStatusModel = {
  request_id: string;
  status: number;
};

export type CoordinateTaskModel = {
  user: number;
  task: number;
};

export type HireRequestModel = {
  task: number;
};

export type DeletionRequestModel = {
  coordinate_status: number;
};

export type ReportTaskModel = {
  task: number;
  reason: string;
  description: string;
};

export type SendPaymentModel = {
  user: number;
  task: number;
  tip: string;
};

export type CreateTaskModel = {
  category: number;
  sub_category: number;
  title: string;
  description: string;
  city: string;
  address: string;
  all_day: boolean;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  price: string;
  user: number;
};

export type RateTaskModel = {
  task_user: number;
  task: number;
  rating: string;
  description: string;

  tags: string;
};
