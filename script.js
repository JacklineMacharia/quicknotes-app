const form = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const categorySelect = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const errorMessage = document.querySelector('#error-message');
const noteCount = document.querySelector('#note-count');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all');

const MAX_LENGTH = 200;
const STORAGE_KEY = 'quicknotes-notes';

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    errorMessage.textContent = 'Could not save notes in this browser.';
  }
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = 'You have ' + notes.length + ' notes.';
  }
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

function getVisibleNotes() {
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return notes;
  }
  return notes.filter(function (note) {
    const text = note.text.toLowerCase();
    return words.every(function (word) {
      return text.includes(word);
    });
  });
}

function render() {
  notesList.textContent = '';
  const visible = getVisibleNotes();

  if (notes.length > 0 && visible.length === 0) {
    const li = document.createElement('li');
    li.className = 'message';
    li.textContent = 'No notes match your search.';
    notesList.appendChild(li);
  }

  visible.forEach(function (note) {
    const li = document.createElement('li');
    li.className = 'note category-' + note.category.toLowerCase();

    const text = document.createElement('p');
    text.className = 'note-text';
    text.textContent = note.text;

    const meta = document.createElement('div');
    meta.className = 'note-meta';

    const category = document.createElement('span');
    category.className = 'note-category';
    category.textContent = note.category;

    const date = document.createElement('span');
    date.className = 'note-date';
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      deleteNote(note.id);
    });

    meta.append(category, date, deleteBtn);
    li.append(text, meta);
    notesList.appendChild(li);
  });

  updateCount();
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  errorMessage.textContent = '';

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  });

  saveNotes();
  render();
  noteInput.value = '';
});

searchInput.addEventListener('input', render);

clearAllBtn.addEventListener('click', function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
