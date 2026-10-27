<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $employee = Employee::where('email', $request->email)
            ->with('profile')
            ->first();

        if (
            !$employee ||
            !$employee->profile ||
            !Hash::check(
                $request->password,
                $employee->profile->password
            )
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password'
            ], 401);
        }

        $token = $employee->createToken('auth-token')->plainTextToken;    
    
        return response()->json([
            'success' => true,
            'message' => 'Login Successful',
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logged out successfully'
    ]);
}
}
