<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('employee_profiles', function (Blueprint $table) {
        
        $table->id();

        $table->unsignedBigInteger('employee_id');   //Links profile to employee.//FK

        $table->string('alternate_contact')->nullable();

        $table->text('description')->nullable();

        $table->timestamps();

        $table->foreign('employee_id')
              ->references('id')
              ->on('employees')
              ->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_profiles');
    }
};
