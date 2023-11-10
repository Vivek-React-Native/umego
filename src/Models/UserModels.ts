export type ReportUserModel = {
  user: number;
  reason:string;
};

export type UpdateProfileModel = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  city: string;
  image?: number;
};

export type CreateOrUpdateBankDetailsModel = {
  bank_name: string;
  full_name: string;
  bank_branch: string;
  account_number: string;
};
