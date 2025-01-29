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

const addressBook: Contact[] = [];

function addContact() {
    rl.question("Enter First Name: ", (firstName) => {
        rl.question("Enter Last Name: ", (lastName) => {
            rl.question("Enter Address: ", (address) => {
                rl.question("Enter City: ", (city) => {
                    rl.question("Enter State: ", (state) => {
                        rl.question("Enter Zip Code: ", (zip) => {
                            rl.question("Enter Phone Number: ", (phoneNumber) => {
                                rl.question("Enter Email: ", (email) => {
                                    addressBook.push(new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email));
                                    console.log("\nContact added successfully!\n");

                                    rl.question("Add another contact? (yes/no): ", (answer) => {
                                        if (answer.toLowerCase() === "yes") {
                                            addContact();
                                        } else {
                                            displayAddressBook();
                                        }
                                    });
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
    console.log(" Address Book");
    addressBook.forEach((contact, index) => {
        console.log(`Contact ${index + 1}:`);
        console.log(`  Name: ${contact.firstName} ${contact.lastName}`);
        console.log(`  Address: ${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}`);
        console.log(`  Phone: ${contact.phoneNumber}`);
        console.log(`  Email: ${contact.email}\n`);
    });
    mainMenu();
}

function mainMenu() {
    rl.question("\nWhat would you like to do? (1: Add Contact, 2: Edit Contact, 3: Delete Contact, 4: Exit): ", (choice) => {
        if (choice === "1") {
            addContact();
        } else if (choice === "2") {
            editContact();
        } else if (choice === "3") {
            deleteContact();
        } else {
            rl.close();
        }
    });
}

function editContact() {
    rl.question("Enter the first name of the contact you want to edit: ", (firstName) => {
        rl.question("Enter the last name of the contact you want to edit: ", (lastName) => {
            const contact = addressBook.find(contact => contact.firstName === firstName && contact.lastName === lastName);

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
    rl.question("Enter the first name of the contact you want to delete: ", (firstName) => {
        rl.question("Enter the last name of the contact you want to delete: ", (lastName) => {
            const index = addressBook.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);

            if (index !== -1) {
                addressBook.splice(index, 1); 
                console.log("Contact deleted successfully!");
                displayAddressBook();
            } else {
                console.log("Contact not found.");
                mainMenu();
            }
        });
    });
}

mainMenu();
