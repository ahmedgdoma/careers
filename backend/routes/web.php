<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->get('/available-jobs', 'JobController@availableJobs');
$router->post('/application', 'ApplicationController@store');

$router->group(['prefix' => 'admin'], function () use ($router) {

    $router->post('/login', 'AuthController@login');

    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->get('/jobs', 'JobController@index');
        $router->get('/jobs/{id}', 'JobController@show');
        $router->post('/jobs', 'JobController@store');
        $router->patch('/jobs/{id}', 'JobController@update');
        $router->delete('/jobs/{id}', 'JobController@destroy');


        $router->get('/job/{job_id}/applications', 'ApplicationController@jobApplications');
        $router->get('/application/{id}', 'ApplicationController@show');

        $router->post('/logout', 'AuthController@logout');
    });

});
