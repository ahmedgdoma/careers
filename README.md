# Cart API

This project was generated with [Lumen website](https://lumen.laravel.com/docs/7.x) version 7.x

Laravel Lumen is a stunningly fast PHP micro-framework for building web applications with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Lumen attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as routing, database abstraction, queueing, and caching.

## Requirements
* PHP >= 7.2
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension

## Set up project

* clone the project
* install packages `composer install`
* update `.env` file with your database credentials and new database name
* migrate database `php artisan migrate`
* make new jwt security key `php artisan jwt:secret`


## Testing
to run phpunit testing run command `./vendor/bin/phpunit`

##store files

create a symlink from storage to public 

`ln -s /complete_path_to_project/careers/backend/storage/app/public/cv  public/cv
`
## Call APIs
serve project with command `php -S localhost:8000 -t public`