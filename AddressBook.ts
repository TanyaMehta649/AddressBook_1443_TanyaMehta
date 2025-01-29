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
                                    console.log("\n✅ Contact added successfully!\n");

                                    rl.question("Add another contact? (yes/no): ", (answer) => {
                                        if (answer.toLowerCase() === "yes") {
                                            addContact();
                                        } else {
                                            console.log("\n📖 Address Book:");
                                            console.log(addressBook);
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

// Start input
addContact();
