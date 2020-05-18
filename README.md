# FavoriteRestaurants

This app provides a list of the user's favorite restaurants. Can work with external api or mocked data using in-memory api. 

## Development server

To run with in-memory api, follow the instructions below:

1) Go to the app.module.ts and uncomment the following code:

    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )

2) Go to env.js file in src folder and change the apiURL property to 'local'

To run this app with an existing API to retrieve restaurants, make sure the InMemoryDataService is commented out in the app.module.ts file and provide the full api path in the env.js file.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running via Container

Pre-requisites: Must have docker cli installed on host running the commands.

1) Run the following command to build image: docker build -t web-app .
2) Run the following command to run image in a container: docker run -p 8080:80 -e apiUrl=${YOUR_API_URL}
3) Open Web app via following url: http://localhost:8080

If running with local database, follow steps 1 and 2 of Development server and omit apiURL env argument on the docker run command. If using dockertoolbox, user might have to manually set docker host IP (defaults to 192.168.99.100) instead of using localhost.

## Creating Stack on K8s:

Pre-requisites: Must have Kubernetes & Docker Compose installed on host (Docker Desktop provides both out-of-the-box, must turn on Kubernetes feature in settings)

1) Pull and Build Image for API code (https://github.com/cheroto/restaurantsAPI)
2) Build Image for Web-App (docker build -t web-app .)
3) Run the following command: docker stack deploy --orchestrator=kubernetes -c docker-compose.yml favorite-restaurants

To kill the stack, run the following command: kubectl delete stack favorite-restaurants

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
