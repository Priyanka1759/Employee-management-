<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EmployeeProfile;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Employee extends Model
{
    use SoftDeletes;
    use HasApiTokens;
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'department',
        'designation',
        'joining_date',
        'aadhaar',
        'status',
    ];
public static function getActiveEmployees(
    $search = null,
    $perPage = 5
) {
    $query = self::where(
        'status',
        'Active'
    );

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where(
                'first_name',
                'like',
                "%{$search}%"
            )
            ->orWhere(
                'last_name',
                'like',
                "%{$search}%"
            );
        });
    }

    return $query->paginate($perPage);
}


public function profile()
{
    return $this->hasOne(EmployeeProfile::class);
}
    
}