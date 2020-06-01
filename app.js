const yargs = require('yargs');
const notes = require('./utils.js');
//Yargs Commands
//Add Note/Task Command
yargs.command({
  command: 'add',
  describe: 'Add new task',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note description',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.add(argv.title, argv.body);
  },
});

//List all Notes/Tasks Command
yargs.command({
  command: 'list',
  describe: 'List all tasks',
  handler() {
    notes.list();
  },
});

//Search a single Note/Task Command
yargs.command({
  command: 'search',
  describe: 'Search a Task',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.search(argv.title);
  },
});

//Delete a single Note/Task Command
yargs.command({
  command: 'delete',
  describe: 'Delete a Task',
  title: {
    describe: 'Note title',
    demandOption: true,
    type: 'string',
  },
  handler(argv) {
    notes.destroy(argv.title);
  },
});
//Parse yargs
yargs.parse();
// console.log(yargs.argv);
