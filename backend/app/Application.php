<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Application extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'job_id', 'name', 'university', 'email', 'dob', 'cv', 'notes'
    ];
    public function job(){
        return $this->belongsTo('App\Job');
    }

}
