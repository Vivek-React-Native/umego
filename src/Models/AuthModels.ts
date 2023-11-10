export type LoginModel = {
  country_code: string;
  phone_no: string;
};

export type SignUpModel = {
  first_name: string;
  last_name: string;
  email: string;
  country_code: string;
  phone_no: string;
  gender: string;
  city: string;
  image: number;
};

export type CodeVerificationModel = {
  country_code: string;
  phone_no: string;
  otp: string;
};

// encryptStorage.setItem("medus_auth_token", action.payload.user.auth_token);
// encryptStorage.setItem("medus_saved_user", action.payload.user);
// localStorage.setItem("medus_auth_token", action.payload.user.auth_token);
