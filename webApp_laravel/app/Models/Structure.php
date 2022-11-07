<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Structure extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'region', 
        'city', 
        'phone'];

    public function exam() {
        return $this->belongsToMany(Exam::class, 'structure_exam')
        ->withPivot('structure_id', 'exam_id');
    }
    
    public function sponsor() {
        return $this->belongsToMany(Sponsor::class, 'structure_sponsor')
        ->withPivot('structure_id', 'sponsor_id');

    }
}
