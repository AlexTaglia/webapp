# Web app 
This repositories is composed by 2 folders
* in folder webApp_laravel you can find api backend in laravel
* in folder webApp_react contains the front end in react


## Getting Started

* clone and open the repo: "https://github.com/AlexTaglia/webapp.git"


#### Laravel ####

* open new terminal and change directory to 

    cd .\webApp_laravel\

    composer install
    
* in folder "webApp_laravel" copy file .env.example and rename it to .env

    php artisan key:generate

* create an empty database (I used xamp) and then in file .env just created add the database name DB_DATABASE=db_name 

* please check also DB_HOST, DB_PORT, DB_USERNAME, and DB_PASSWORD must match with your database credential

    php artisan migrate

    php artisan serve


#### React ####

* open new terminal and change directory to 

    cd .\webApp_react\

    npm install

    npm run start

end finally open <http://localhost:3007/>



## Todo
- edit of exam in structures
- search result (now filter only by region or city)
- structure advertise
