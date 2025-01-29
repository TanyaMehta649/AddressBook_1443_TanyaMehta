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
                                            console.log(" Address Book ");
                                            addressBook.forEach(function (contact, index) {
                                                console.log("Contact ".concat(index + 1, ":"));
                                                console.log("  Name: ".concat(contact.firstName, " ").concat(contact.lastName));
                                                console.log("  Address: ".concat(contact.address, ", ").concat(contact.city, ", ").concat(contact.state, " ").concat(contact.zip));
                                                console.log("  Phone: ".concat(contact.phoneNumber));
                                                console.log("  Email: ".concat(contact.email, "\n"));
                                            });
                                            rl.close();
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
addContact();
