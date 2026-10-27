<?php

namespace App\Models;
use App\Models\Employee;

use Illuminate\Database\Eloquent\Model;

class EmployeeProfile extends Model
{
    protected $fillable = [
        'employee_id',
        'alternate_contact',
        'description',
        'password',
        'profile_image'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}