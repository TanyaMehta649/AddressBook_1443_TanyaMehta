const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface Contact {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNo: string;
    email: string;
}

class AddressBook {
    private contacts: Contact[] = [];
    
    addContact(contact: Contact): void {
        this.contacts.push(contact);
        console.log("Contact added successfully.");
    }

    viewContacts(): void {
        if (this.contacts.length === 0) {
            console.log("No contacts found.");
        } else {
            console.log("Address Book Contacts:");
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.firstName} ${contact.lastName}`);
                console.log(`   Address: ${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}`);
                console.log(`   Phone: ${contact.phoneNo}`);
                console.log(`   Email: ${contact.email}`);
            });
        }
    }
}

const addressBook = new AddressBook();

const addNewContact = () => {
    rl.question("Enter First Name: ", (firstName: string) => {
        rl.question("Enter Last Name: ", (lastName: string) => {
            rl.question("Enter Address: ", (address: string) => {
                rl.question("Enter City: ", (city: string) => {
                    rl.question("Enter State: ", (state: string) => {
                        rl.question("Enter ZIP Code: ", (zip: string) => {
                            rl.question("Enter Phone Number: ", (phoneNo: string) => {
                                rl.question("Enter Email: ", (email: string) => {
                                    const contact: Contact = { firstName, lastName, address, city, state, zip, phoneNo, email };
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

const mainMenu = () => {
    console.log(`
     ADDRESS BOOK MENU
    1. Add a new contact
    2. View all contacts
    3. Exit
    `);

    rl.question("Choose an option (1-3): ", (choice: string) => {
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
