# English Tango: Reintegration of the Duolingo UI

Practice English by selecting an exercice you want to do, and you can even take multiple exercices simultaneously. Every course and exercice is accessible at any time !

With this project, I aim to demonstrate my integration skills.
However, due to my limited knowledge in creating dynamic applications, all logic is handled with JavaScript.
Information is stored in localStorage, and the "database" is represented as a JSON file, attempting to emulate the structure of MongoDB.

## Features
- Desktop and mobile interfaces
- The ability to select multiple exercises at once
- Daily quests that require you to complete a certain number of exercises or earn a specific amount of XP
- Users can track their quest progress on the "quests.html" page
- Users can view their stats at the top of the page, including gems, XP, and streak.
- The gamover screen displays complex animations. Each progress is displayed one by one, with lots of exciting audio and visual feedback to make the user feel good about their progress.

## Technical Design
I use Sass and the BEM and 7-1 patterns for styling.
The JavaScript files are organized into namespaces:
- "view" handles the interaction between the UI and the core logic.
- "game" manages game logic, including saving user progress and game options to localStorage.
- "data" handles an artificial database (it is not a real database, just a JSON file).

### Tools
- HTML
- Sass preprocessor for CSS
- JavaScript for interactivity

## Roadmap

In the near future, I would like to add the following features:
- Implementation of study pages that display and explain various concepts. First step, being, showing the user a table of irregular verbs.
- A page where users can view their entire lexicon, showcasing what they've learned and their proficiency in each concept.
- Multiple types of questions, including multiple-choice, translation from English to French, and conjugation exercises.

Additionally, I hope to learn the following in the future:
- Being capable of implement a dynamic website, featuring database integration, user authentication, the ability to load and save user progress.







