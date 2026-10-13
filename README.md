# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes (up to 200 characters), file them under Personal, Work or Study, search through them and delete the ones you no longer need. Your notes are saved in the browser with localStorage, so they are still there after you refresh the page.

## Features

- Add notes with a category (Personal, Work or Study)
- Each note card shows the text, category label, date and time, and a Delete button
- Validation: empty notes and notes over 200 characters show an error message
- Delete any single note
- Live count: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Search that filters notes as you type (not case-sensitive)
- Notes saved and loaded with localStorage
- Responsive layout: the form stacks vertically on screens 600px or narrower
- Bonus: "Clear all" button with a confirmation prompt

## How to run locally

1. Clone the repository: `git clone <your-repository-url>`
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser. No installation or server is needed.

## What I learned

- How to build the page from semantic HTML (`header`, `main`, `section`, `footer`) and link a `label` to its `input` with `for` and `id`.
- How to lay out a form with Flexbox and change it for small screens with an `@media (max-width: 600px)` rule.
- How to rebuild a list from an array with `createElement` and `textContent`, which is safer than `innerHTML` for user text.
- How to save an array of objects with `JSON.stringify` and load it again with `JSON.parse` using localStorage.
- How to make small, clear Git commits after each task.
