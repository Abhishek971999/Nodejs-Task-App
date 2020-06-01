const fs = require('fs');
const chalk = require('chalk');

//Add Tasks/Note
const add = (title, body) => {
  const notes = load();
  const duplicateNotes = notes.filter((note) => note.title == title);
  if (duplicateNotes.length == 0) {
    notes.push({ title, body });
    save(notes);
    console.log(chalk.bgGreen.black('New Note Added! ✔  '));
  } else
    console.log(
      chalk.bgGreen.bgRed.black(
        'Task title already taken \nTry Again with another title '
      )
    );
};

//Save Tasks/Note to File
const save = (notes) => {
  const JSONdata = JSON.stringify(notes);
  fs.writeFileSync('notes.json', JSONdata);
};

//List All Tasks/Notes
const list = () => {
  try {
    const data = fs.readFileSync('notes.json');
    if (JSON.parse(data).length > 0) {
      console.log('Task List : ');
      JSON.parse(data).map((note, index) =>
        console.log(`${index + 1} : ${note.title} - ${note.body}`)
      );
    }
  } catch (err) {
    console.log(chalk.bgGreen.black('No Task to be Completed!'));
  }
};

//Load Tasks/Notes from File
const load = (title, body) => {
  try {
    const data = fs.readFileSync('notes.json');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

//Delete Notes/Task from File
const destroy = (title) => {
  const notes = load();
  const updatedNotes = notes.filter((note) => note.title != title);
  save(updatedNotes);
  console.log(chalk.bgGreen.black('Note has been deleted ✔ '));
};

//Search Single Task/Note from File
const search = (title) => {
  const notes = load();
  const note = notes.filter((note) => note.title == title);
  if (note.length == 1)
    console.log(`Title:${note[0].title}\nBody:${note[0].body}`);
  else console.log(chalk.bgRed.black('Note not found'));
};

module.exports = {
  add,
  destroy,
  list,
  search,
};
