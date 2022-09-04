type Error_Resonse_Type = {
  response_msg: string;
  error: boolean;
  status?: number;
  id?: any;
};

// Error response msg
export class Error {
  error_401 = {
    error: true,
    response_msg: "Your session has expired, please log in again.",
    status: 401,
  };
  error_500 = {
    error: true,
    response_msg: "Server Error Contact Administrator.",
    status: 500,
  };
  error_404 = {
    error: true,
    response_msg: "Your request was not found in the database.",
    status: 404,
  };
  error_400: Error_Resonse_Type = {
    response_msg:
      "The format of the data you are trying to send is the wrong format.",
    error: true,
    status: 400,
  };

  error_409 = {
    error: true,
    response_msg: "Conflict, This Data Already Exists.",
  };
}
