export interface Employee{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    joining_date: string;
    aadhaar: string;

    alternate_contact: string;
    description: string;
    profile_image?: File | null;
}

export type EmployeeForm=Omit<Employee,"id">


