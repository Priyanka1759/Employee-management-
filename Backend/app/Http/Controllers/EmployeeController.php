<?php
namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\EmployeeProfile;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;


class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $employees = Employee::leftJoin(
            'employee_profiles',
            'employees.id',
            '=',
            'employee_profiles.employee_id'
        )
            ->select(
                'employees.*',
                'employee_profiles.alternate_contact',
                'employee_profiles.description',
                'employee_profiles.profile_image'
            )
            ->paginate(5);

        return response()->json([
            'data' => $employees->items(),
            'current_page' => $employees->currentPage(),
            'last_page' => $employees->lastPage(),
            'total' => $employees->total(),
        ], 200);
    }

    public function save(Request $request, $id = null)
    {
        try {
            $rule =
                [
                    'first_name' => 'required',
                    'last_name' => 'required',

                    'email' => [
                        'required',
                        'email',
                        Rule::unique('employees', 'email')->ignore($id)
                    ],

                    'phone' => [
                        'required',
                        'regex:/^[6-9]\d{9}$/',
                        Rule::unique('employees', 'phone')->ignore($id)
                    ],
                    'department' => 'required',
                    'designation' => 'required',
                    'joining_date' => 'required|date',

                    //'description' => 'required',
                    'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',

                ];
            $message = [
                'email.unique' => 'Email already exists.',
                'phone.unique' => 'Employee phone number already exists.',
                'email.required' => 'Email is required.',
                'phone.required' => 'Phone number is required.'
            ];

            $validator = Validator::make($request->all(), $rule, $message);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'error' => $validator->errors(),

                ], 422);
            }
            $aadhaar = str_replace(' ', '', $request->aadhaar);

            $employeeData = array(
                'first_name' => trim($request->first_name),
                'last_name' => trim($request->last_name),
                'email' => trim($request->email),
                'phone' => trim($request->phone),
                'department' => trim($request->department),
                'designation' => trim($request->designation),
                'joining_date' => trim($request->joining_date),
                'aadhaar' => trim($aadhaar),
            );

            $imageName = $id
                ? EmployeeProfile::where('employee_id', $id)
                    ->value('profile_image')
                : null;
            if ($request->hasFile('profile_image')) {

                $image = $request->file('profile_image');

                $imageName = time() . '.' .
                    $image->getClientOriginalExtension();
                $image->move(
                    public_path('uploads'),
                    $imageName
                );
            }

            $employeeProfileData = array(
                'alternate_contact' => trim($request->alternate_contact),
                'description' => trim($request->description),
                'password' => $request->password
                    ? Hash::make($request->password)
                    : null,
                'profile_image' => $imageName,

            );

            if ($id && $request->filled('password')) {
                $employeeProfileData['password'] =
                    Hash::make($request->password);
            }

            if ($id) {

                $employee = Employee::findOrFail($id);


                $employee->update($employeeData);

                $employeeProfile = EmployeeProfile::where(
                    'employee_id',
                    $employee->id
                )->first();     // find record first

                if ($employeeProfile) {

                    $employeeProfile->update(    // then update it
                        $employeeProfileData
                    );
                }

                $message = 'Employee Updated';
            } else {

                $employee = Employee::create($employeeData);
                $employeeProfileData['employee_id'] = $employee->id;  //Employee Saved->Employee ID Generated->Add employee_id to Profile Array
                EmployeeProfile::create($employeeProfileData);
                $message = 'Employee Added ';
            }
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $employee
            ]);


        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function show($id)
    {
        return Employee::with('profile')->find($id);
    }
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);

        $employee->status = 'Inactive';
        $employee->save();

        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully'
        ]);
    }

    public function fetchEmpData(){
        
    }
}