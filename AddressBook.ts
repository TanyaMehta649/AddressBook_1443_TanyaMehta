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

function addMultipleContacts() {
    if (!currentAddressBook) {
        console.log("No Address Book selected. Please create or switch to one first.");
        mainMenu();
        return;
    }

    rl.question("How many contacts would you like to add? ", (num) => {
        const count = parseInt(num);
        if (isNaN(count) || count <= 0) {
            console.log("Invalid number. Please enter a valid number.");
            mainMenu();
            return;
        }
        addContact(count);
    });
}

function addContact(remaining: number) {
    if (!currentAddressBook) {
        console.log("No Address Book selected.");
        mainMenu();
        return;
    }

    if (remaining <= 0) {
        console.log("\nAll contacts added successfully!\n");
        displayAddressBook();
        return;
    }

    console.log(`\nAdding Contact ${currentAddressBook.contacts.length + 1}:`);
    rl.question("Enter First Name: ", (firstName) => {
        rl.question("Enter Last Name: ", (lastName) => {
            rl.question("Enter Address: ", (address) => {
                rl.question("Enter City: ", (city) => {
                    rl.question("Enter State: ", (state) => {
                        rl.question("Enter Zip Code: ", (zip) => {
                            rl.question("Enter Phone Number: ", (phoneNumber) => {
                                rl.question("Enter Email: ", (email) => {
                                    currentAddressBook?.contacts.push(new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email));
                                    console.log("\nContact added successfully!\n");

                                    addContact(remaining - 1);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function displayAddressBook() {
    if (!currentAddressBook) {
        console.log("No Address Book selected.");
        mainMenu();
        return;
    }

    console.log(`\n--- Address Book: ${currentAddressBook.name} ---`);
    currentAddressBook.contacts.forEach((contact, index) => {
        console.log(`Contact ${index + 1}:`);
        console.log(`  Name: ${contact.firstName} ${contact.lastName}`);
        console.log(`  Address: ${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}`);
        console.log(`  Phone: ${contact.phoneNumber}`);
        console.log(`  Email: ${contact.email}\n`);
    });

    mainMenu();
}

function editContact() {
    if (!currentAddressBook) {
        console.log("No Address Book selected.");
        mainMenu();
        return;
    }

    rl.question("Enter the first name of the contact you want to edit: ", (firstName) => {
        rl.question("Enter the last name of the contact you want to edit: ", (lastName) => {
            const contact = currentAddressBook?.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);

            if (contact) {
                console.log("\nContact found. Let's edit the details:");
                rl.question(`Enter new Address (current: ${contact.address}): `, (address) => {
                    contact.address = address || contact.address;

                    rl.question(`Enter new City (current: ${contact.city}): `, (city) => {
                        contact.city = city || contact.city;

                        rl.question(`Enter new State (current: ${contact.state}): `, (state) => {
                            contact.state = state || contact.state;

                            rl.question(`Enter new Zip Code (current: ${contact.zip}): `, (zip) => {
                                contact.zip = zip || contact.zip;

                                rl.question(`Enter new Phone Number (current: ${contact.phoneNumber}): `, (phoneNumber) => {
                                    contact.phoneNumber = phoneNumber || contact.phoneNumber;

                                    rl.question(`Enter new Email (current: ${contact.email}): `, (email) => {
                                        contact.email = email || contact.email;

                                        console.log("Contact updated successfully!");
                                        displayAddressBook();
                                    });
                                });
                            });
                        });
                    });
                });
            } else {
                console.log("Contact not found.");
                mainMenu();
            }
        });
    });
}

function deleteContact() {
    if (!currentAddressBook) {
        console.log("No Address Book selected.");
        mainMenu();
        return;
    }

    rl.question("Enter the first name of the contact you want to delete: ", (firstName) => {
        rl.question("Enter the last name of the contact you want to delete: ", (lastName) => {
            const index = currentAddressBook?.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);

            if (index !== -1 && index !== undefined) {
                currentAddressBook?.contacts.splice(index, 1);
                console.log("Contact deleted successfully!");
                displayAddressBook();
            } else {
                console.log("Contact not found.");
                mainMenu();
            }
        });
    });
}

function mainMenu() {
    rl.question("\nWhat would you like to do? (1: Create Address Book, 2: Switch Address Book, 3: Add Contacts, 4: Edit Contact, 5: Delete Contact, 6: Exit): ", (choice) => {
        if (choice === "1") {
            createAddressBook();
        } else if (choice === "2") {
            switchAddressBook();
        } else if (choice === "3") {
            addMultipleContacts();
        } else if (choice === "4") {
            editContact();
        } else if (choice === "5") {
            deleteContact();
        } else {
            rl.close();
        }
    });
}

mainMenu();
