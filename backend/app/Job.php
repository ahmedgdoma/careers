<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Job extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'required_experience_level', 'brief', 'start_date', 'end_date'
    ];
    public function applications(){
        return $this->hasMany('App\Application');
    }

    // this is a recommended way to declare event handlers
    public static function boot() {
        parent::boot();

        static::deleting(function($job) {
            $job->applications()->delete();
        });
    }

}
