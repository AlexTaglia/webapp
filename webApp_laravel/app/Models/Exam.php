<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function structure() {
        return $this->belongsToMany(Structure::class, 'structure_exam')
        ->withPivot('structure_id', 'exam_id');
    }

}
