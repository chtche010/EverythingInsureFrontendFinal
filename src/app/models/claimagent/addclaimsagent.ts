export class addclaimsagent {
    //claimsAgentId = '';
    insuranceCompany = '';
    firstName = ''; 
    lastName = '';
}

export interface ServiceResponse<T> {
    // Define the structure of the service response
    data: T;
    success: boolean;
    message: string;
  }