<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AuthController;


    Route::post('/login', [AuthController::class, 'login']);

    Route::post('employees/fetch', [EmployeeController::class,'fetchEmpData']);

     Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/employees', [EmployeeController::class, 'index']);
    

    Route::post('/employees', [EmployeeController::class, 'save']);

    Route::get('/employees/{id}', [EmployeeController::class, 'show']);

    Route::put('/employees/{id}', [EmployeeController::class, 'save']);

    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);

   });