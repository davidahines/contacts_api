# rest_api_example
An API for managing and retrieving contacts for various customers.

Setup:
* Git clone the repo: `git clone git@github.com:davidahines/contacts_api.git`
* install the packages: `npm install`

* Set up the database Connection
  * Extract the config.zip I send via email.
  * Copy the config folder in config.zip into the contacts_api project.
      
* Running the Tests to confirm the application is setup and working: 
 * `npm t`

* Run the docker build with:
 * docker build . -t davidahines/contact_api

* Querying the api:
For example queries you can look below or look at the tests(`/src/test` folder):
  * List all contacts:
    GET `localhost:3000/contacts`
  * Create a contact:
    * POST `localhost:3000/contacts`
     * BODY: ` 
      name: "The contact's name"
      address: Object
        streetName: "Test Street",
        houseNumber: "123",
        city: "Test City",
        state: "Test State/Province"
      phoneNumber: "555-555-5555"
      email: "test@test.com"`
  * Read a contact:
    * GET `localhost:3000/contacts/contact_id`
  * Update a contact:
    * PUT `localhost:3000/contacts/contact_id`
     * BODY: ` 
      name: "The contact's name"
      address: Object
        streetName: "Test Street",
        houseNumber: "123",
        city: "Test City",
        state: "Test State/Province"
      phoneNumber: "555-555-5555"
      email: "test@test.com"`
  * Delete a contact:
    * DELETE: `localhost:3000/contacts/contact_id`
   
** Please email me if you have any issues:
 *`david.hines.01@gmail.com` **
