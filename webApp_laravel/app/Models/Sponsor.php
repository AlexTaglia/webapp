<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    use HasFactory;
    protected $fillable = ['duration'];

    public function structure() {
        return $this->belongsToMany(Structure::class, 'structure_sponsor')
        ->withPivot('structure_id', 'exam_id');
    }
}

