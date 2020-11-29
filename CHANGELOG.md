# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2020-11-29
### Added
- possibility to display charts for more than one year due to getChart function.
- possibility to display charts for periods with different currency IDs.
- drawMovingAverage function into chartDrawing.js file to display monthly and yearly rate moving averages.
- getContent and saveToLocalStorage functions into chartDrawing.js file to save current year rates into Local Storage.
- style.css file now includes media-requests to make the html-coding responsive.

### Changed
- name of script3.js file, which is now chartDrawing.js file.
- name of worker3.js file, which is now curObjWorker.js file.
- name of worker4.js file, which is now chartDrawWorker.js file.
- name of today.html file, which is now todayRates.html file.
- name of script.js file, which is now todayRates.js file.
- name of worker.js file, which is now todayRateWorker.js file.
- name of main.js file, which is now cacheswreg.js file.
- getChart function in chartDrawing.js file to contain less code for chart display.
- getOptions function in chartDrawing.js file to take currency options directly from nbrb.by website.
- chart function to display currency abbreviations in the chart.
- template is now used instead of inner html in getOptions function.
- templates are also used instead of inner html in getCurrencyTable function in todayRates.js file.
- worker in chartDrawWorker.js file now makes it possible to fetch several urls.
- all the workers are now placed into the global scope.

### Removed
- currency rate chart display in average.html file as well as this file.
- scripts for average.html file in script4.js and script5.js files as well as these files.
- worker for script5.js file in worker5.js file as well as this file.

## [0.1.1] - 2020-10-19
### Added
- dynamic website data saved into Local Storage.
- static website data saved into cache.

### Changed
- README.md file now contains only the most important information about the project.
- CHANGELOG.md file now contains more detailed information about the project versions.

## [0.1.0] - 2020-10-19
### Added
- header, footer and navigation blocks into index.html, average.html, today.html and projectInfo.html files.
- currency rate charts are now displayed on the website mainpage and on average.html page.
- display of today currency rates into today.html file.
- css folder containing fonts and style.css file.
- header, navigation, mainpart and footer styles into style.css file.
- image into the website header.
- script for today rates display was written in script.js file.
- scripts for mainpage html-form and for chart display were written in script3.js file.
- scripts for average.html file were written in script4.js and script5.js files.
- script for to-top-button was written in upButton.js file.
- worker for script.js file was written in worker.js file.
- workers for script3.js file were written in worker3.js and worker4.js files.
- worker for script5.js file was written in worker5.js file.
- folders and files not included into the Github repository were enumerated in .gitignore file.
- README.md file now contains more detailed information about the project.

### Changed
- project styles are now written in style.css file instead of style.scss file.
- project description is now written in projectInfo.html file instead of index.html file.
- project version description in CHANGELOG.md file changed up to standard.

### Removed
- project description from index.html file.
- style.scss file.
- assets folder.
- project author from CHANGELOG.md file.
- "test-case1" from README.md and CHANGELOG.md files.

## [0.0.1] - 2020-09-29
### Added
- project description into index.html file.
- basic project styles into style.scss file.
- project version description into CHANGELOG.md file.
- project author into CHANGELOG.md file.
- "test-case1" into README.md and CHANGELOG.md files.