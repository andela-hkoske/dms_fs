<p align="center">
  <a href="https://www.github.com/andela-hkoske/dms_fs/">
    <img alt="DocMan" src="https://raw.github.com/andela-hkoske/dms_fs/master/app/images/logo_big.png" width="150">
  </a>
</p>
<h1 align="center">
  DocMan
</h1>
<p align="center">
  For everything you’ll do, DocMan is the workspace to get it done!
</p>

<p align="center">
 <a href="https://codeclimate.com/github/andela-hkoske/dms_fs"><img alt="Code Climate GPA" src="https://codeclimate.com/github/andela-hkoske/dms_fs/badges/gpa.svg" /></a>
  <a href="https://circleci.com/gh/babel/babel"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/andela-hkoske/dms_fs/master.svg?style=flat&label=circle"></a>
 <a href="https://codeclimate.com/github/andela-hkoske/dms_fs/coverage"><img alt="Code Climate Test Coverage" src="https://codeclimate.com/github/andela-hkoske/dms_fs/badges/coverage.svg" /></a>
</p>

The system manages documents, users and user roles. Each document defines access rights, which roles can access it and the date it was published. Users are categorized by roles and each user has a role defined for them.
It is developed using ​mongoose​, an ODM for Node. The system will permit users to query it through a command line interface.

## Installation

1. Download and install [**Node JS**](https://nodejs.org/en/) if not already installed.
1. Download and install [**MongoDB**](https://www.mongodb.org/) if not already installed.
1. Clone the [**repository here**](https://github.com/andela-hkoske/dms_fs.git) or go to the project github page [**here**](https://github.com/andela-hkoske/dms_fs/) and download the zip file of the project. Unzip it.
1. Navigate to your terminal and change your directory to the **dms project directory**.
1. Check that you are on the master branch using `git status`.
1. Run `npm install` on the terminal.

## Usage
Navigate to the project directory.
Run `mongod` then `npm run seed` on a seperate terminal tab, once completed, exit and run `gulp`.
Navigate to the address `http://localhost:3000/` on your browser to access the app.

## Running Tests
To run tests run `npm run seed` on your terminal.
Once completed run `npm test` on the terminal while within the **project root directory**.

## Backend

Docman was built off of an existing backend found [**here**](https://github.com/andela-hkoske/dms_api.git).

## Front-end Testing

Front-end testing is achieved through use of `karma`, `sinon` and `jasmine` packages for karma. `karma` acted as the test runner, `sinon` played a key role in testing anyonymous functions and `jasmine` was used to test. They will all be installed when you run `npm install` and the tests will run when you run `npm test`. The tests are defined under `spec/unit/client`.

## Front-end views

The front-end views were built using `angular-material` and the controllers and services to aid them were made using `angularjs`. 

## Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -m 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request :D
