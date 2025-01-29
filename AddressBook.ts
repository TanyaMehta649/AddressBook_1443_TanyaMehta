import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Contact {
    constructor(
        public firstName: string,
        public lastName: string,
        public address: string,
        public city: string,
        public state: string,
        public zip: string,
        public phoneNumber: string,
        public email: string
    ) {}
}

class AddressBook {
    constructor(public name: string, public contacts: Contact[] = []) {}

    addContact(contact: Contact) {
        if (this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName)) {
            console.log("A contact with the same name already exists in this address book.");
        } else {
            this.contacts.push(contact);
            console.log("Contact added successfully!");
        }
    }
}

const addressBooks: AddressBook[] = [];
let currentAddressBook: AddressBook | null = null;

function createAddressBook() {
    rl.question("Enter a name for the new Address Book: ", (name) => {
        if (addressBooks.some(book => book.name === name)) {
            console.log("An address book with this name already exists. Try again.");
            mainMenu();
            return;
        }
        const newBook = new AddressBook(name);
        addressBooks.push(newBook);
        currentAddressBook = newBook;
        console.log(`Address Book "${name}" created and selected.`);
        mainMenu();
    });
}

function switchAddressBook() {
    if (addressBooks.length === 0) {
        console.log("No address books available. Create one first.");
        mainMenu();
        return;
    }

    console.log("\nAvailable Address Books:");
    addressBooks.forEach((book, index) => console.log(`${index + 1}: ${book.name}`));

    rl.question("Enter the number of the Address Book to switch to: ", (num) => {
        const index = parseInt(num) - 1;
        if (index >= 0 && index < addressBooks.length) {
            currentAddressBook = addressBooks[index];
            console.log(`Switched to Address Book "${currentAddressBook.name}".`);
        } else {
            console.log("Invalid selection. Try again.");
        }
        mainMenu();
    });
}

function addContact() {
    if (!currentAddressBook) {
        console.log("No Address Book selected. Please create or switch to one first.");
        mainMenu();
        return;
    }

    rl.question("Enter First Name: ", (firstName) => {
        rl.question("Enter Last Name: ", (lastName) => {
            if (currentAddressBook!.contacts.some(c => c.firstName === firstName && c.lastName === lastName)) {
                console.log("A contact with this name already exists in this address book.");
                mainMenu();
                return;
            }
            rl.question("Enter Address: ", (address) => {
                rl.question("Enter City: ", (city) => {
                    rl.question("Enter State: ", (state) => {
                        rl.question("Enter Zip Code: ", (zip) => {
                            rl.question("Enter Phone Number: ", (phoneNumber) => {
                                rl.question("Enter Email: ", (email) => {
                                    currentAddressBook!.addContact(new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email));
                                    mainMenu();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function mainMenu() {
    rl.question("\nWhat would you like to do? (1: Create Address Book, 2: Switch Address Book, 3: Add Contact, 4: Exit): ", (choice) => {
        if (choice === "1") {
            createAddressBook();
        } else if (choice === "2") {
            switchAddressBook();
        } else if (choice === "3") {
            addContact();
        } else {
            rl.close();
        }
    });
}

mainMenu();