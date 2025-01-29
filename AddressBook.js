"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Contact = /** @class */ (function () {
    function Contact(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    return Contact;
}());
var addressBook = [];
function addContact() {
    rl.question("Enter First Name: ", function (firstName) {
        rl.question("Enter Last Name: ", function (lastName) {
            rl.question("Enter Address: ", function (address) {
                rl.question("Enter City: ", function (city) {
                    rl.question("Enter State: ", function (state) {
                        rl.question("Enter Zip Code: ", function (zip) {
                            rl.question("Enter Phone Number: ", function (phoneNumber) {
                                rl.question("Enter Email: ", function (email) {
                                    addressBook.push(new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email));
                                    console.log("\nContact added successfully!\n");
                                    rl.question("Add another contact? (yes/no): ", function (answer) {
                                        if (answer.toLowerCase() === "yes") {
                                            addContact();
                                        }
                                        else {
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
    addressBook.forEach(function (contact, index) {
        console.log("Contact ".concat(index + 1, ":"));
        console.log("  Name: ".concat(contact.firstName, " ").concat(contact.lastName));
        console.log("  Address: ".concat(contact.address, ", ").concat(contact.city, ", ").concat(contact.state, " ").concat(contact.zip));
        console.log("  Phone: ".concat(contact.phoneNumber));
        console.log("  Email: ".concat(contact.email, "\n"));
    });
    mainMenu();
}
function mainMenu() {
    rl.question("\nWhat would you like to do? (1: Add Contact, 2: Edit Contact, 3: Delete Contact, 4: Exit): ", function (choice) {
        if (choice === "1") {
            addContact();
        }
        else if (choice === "2") {
            editContact();
        }
        else if (choice === "3") {
            deleteContact();
        }
        else {
            rl.close();
        }
    });
}
function editContact() {
    rl.question("Enter the first name of the contact you want to edit: ", function (firstName) {
        rl.question("Enter the last name of the contact you want to edit: ", function (lastName) {
            var contact = addressBook.find(function (contact) { return contact.firstName === firstName && contact.lastName === lastName; });
            if (contact) {
                console.log("\nContact found. Let's edit the details:");
                rl.question("Enter new Address (current: ".concat(contact.address, "): "), function (address) {
                    contact.address = address || contact.address;
                    rl.question("Enter new City (current: ".concat(contact.city, "): "), function (city) {
                        contact.city = city || contact.city;
                        rl.question("Enter new State (current: ".concat(contact.state, "): "), function (state) {
                            contact.state = state || contact.state;
                            rl.question("Enter new Zip Code (current: ".concat(contact.zip, "): "), function (zip) {
                                contact.zip = zip || contact.zip;
                                rl.question("Enter new Phone Number (current: ".concat(contact.phoneNumber, "): "), function (phoneNumber) {
                                    contact.phoneNumber = phoneNumber || contact.phoneNumber;
                                    rl.question("Enter new Email (current: ".concat(contact.email, "): "), function (email) {
                                        contact.email = email || contact.email;
                                        console.log("Contact updated successfully!");
                                        displayAddressBook();
                                    });
                                });
                            });
                        });
                    });
                });
            }
            else {
                console.log("Contact not found.");
                mainMenu();
            }
        });
    });
}
function deleteContact() {
    rl.question("Enter the first name of the contact you want to delete: ", function (firstName) {
        rl.question("Enter the last name of the contact you want to delete: ", function (lastName) {
            var index = addressBook.findIndex(function (contact) { return contact.firstName === firstName && contact.lastName === lastName; });
            if (index !== -1) {
                addressBook.splice(index, 1);
                console.log("Contact deleted successfully!");
                displayAddressBook();
            }
            else {
                console.log("Contact not found.");
                mainMenu();
            }
        });
    });
}
mainMenu();
