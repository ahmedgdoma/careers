<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class loginTest extends TestCase
{

    public function testFailLogin()
    {
        $response = $this->call('POST', '/login', ['email' => 'admin@careers.dev', 'password'=> 'client']);
        $this->assertEquals(401, $response->status());

    }
    public function testSuccessLogin()
    {
        $response = $this->call('POST', '/login', ['email' => 'admin@careers.dev', 'password'=> 'admin']);
        $this->assertEquals(200, $response->status());

    }
}
