<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
             'first_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'last_name'=> fake()->unique()->lastName(),
            'phone' => fake()->unique()->numerify('9#########'),
            'department' => 'IT',
            'designation' => 'IT',
            'joining_date' => fake()->date('Y-m-d'),
            'aadhaar' => fake()->unique()->numerify('9###########'),
        ];
    }
}
