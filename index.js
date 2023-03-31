const { program } = require("commander");
// const program = new Command();
const contactService = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await contactService.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contactService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "remove":
      const deleteContact = await contactService.removeContact(id);
      return console.log(deleteContact);
      default:
        console.warn("\x1B[31m Unknown action type!");
      }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
