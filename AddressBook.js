var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.contacts = [];
    }
    AddressBook.prototype.addContact = function (contact) {
        this.contacts.push(contact);
        console.log("Contact added successfully.");
    };
    AddressBook.prototype.viewContacts = function () {
        if (this.contacts.length === 0) {
            console.log("No contacts found.");
        }
        else {
            console.log("Address Book Contacts:");
            this.contacts.forEach(function (contact, index) {
                console.log("".concat(index + 1, ". ").concat(contact.firstName, " ").concat(contact.lastName));
                console.log("   Address: ".concat(contact.address, ", ").concat(contact.city, ", ").concat(contact.state, ", ").concat(contact.zip));
                console.log("   Phone: ".concat(contact.phoneNo));
                console.log("   Email: ".concat(contact.email));
            });
        }
    };
    return AddressBook;
}());
var addressBook = new AddressBook();
var addNewContact = function () {
    rl.question("Enter First Name: ", function (firstName) {
        rl.question("Enter Last Name: ", function (lastName) {
            rl.question("Enter Address: ", function (address) {
                rl.question("Enter City: ", function (city) {
                    rl.question("Enter State: ", function (state) {
                        rl.question("Enter ZIP Code: ", function (zip) {
                            rl.question("Enter Phone Number: ", function (phoneNo) {
                                rl.question("Enter Email: ", function (email) {
                                    var contact = { firstName: firstName, lastName: lastName, address: address, city: city, state: state, zip: zip, phoneNo: phoneNo, email: email };
                                    addressBook.addContact(contact);
                                    mainMenu();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};
var mainMenu = function () {
    console.log("\n     ADDRESS BOOK MENU\n    1. Add a new contact\n    2. View all contacts\n    3. Exit\n    ");
    rl.question("Choose an option (1-3): ", function (choice) {
        switch (choice.trim()) {
            case "1":
                addNewContact();
                break;
            case "2":
                addressBook.viewContacts();
                mainMenu();
                break;
            case "3":
                console.log("Exit!");
                rl.close();
                break;
            default:
                console.log("❌ Invalid option. Please try again.");
                mainMenu();
                break;
        }
    });
};
mainMenu();
