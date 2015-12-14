[![Code Climate](https://codeclimate.com/github/andela-hkoske/dms_api/badges/gpa.svg)](https://codeclimate.com/github/andela-hkoske/dms_api)
# Document Management System
The system manages documents, users and user roles. Each document defines access rights, which roles can access it and the date it was published. Users are categorized by roles and each user has a role defined for them.
It is developed using ​mongoose​, an ODM for Node. The system will permit users to query it through a command line interface.

## Installation

1. Download and install [**Node JS**](https://nodejs.org/en/) if not already installed.
1. Download and install [**MongoDB**](https://www.mongodb.org/) if not already installed.
1. Clone the [**repository here**](https://github.com/andela-hkoske/dms.git) or go to the project github page [**here**](https://github.com/andela-hkoske/dms/) and download the zip file of the project. Unzip it.
1. Navigate to your terminal and change your directory to the **dms project directory**.
1. Check that you are on the master branch using `git status`.
1. Run `npm install` on the terminal.

## Usage

Navigate to terminal to run **jasmine tests**.
Run `npm test` on the terminal while within the **project root directory**.

## Models

Four models are defined: `Roles`, `Types`, `Users` and `Documents`. `Roles` and `Types` must have a unique title defined for them on their creation. A `User` must have a `Role` defined for them. A `Document` must have `Roles` that can access it and a `Type` defined for it. The routes are defined under `server/models`.

## Testing

Testing is achieved through use of `superagent` and `jasmine-node` packages. `superagent` is used to make requests to the api and `jasmine-node` to test the results of the request responses. They will both be installed when you run `npm install` and the tests will run when you run `npm test`. The tests are defined under `spec/src` and the helper fpr them under `spec/helpers`.

## Express Routes

Api endpoints were created using `express` router. To access them on a http client, run `node index.js` on your terminal. The routes are defined under `server/routes`.

## Mongo Database

Ensure that you have installed `mongodb` locally. Before you go ahead to run the tests or work with the api, run `mongod` on a seperate tab on your terminal. The configuration for connection to the db on mongo is defined under `server\config\index.js`. Each time tests are run or the app is run, the database is dropped and seeded.

## Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -m 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :D
