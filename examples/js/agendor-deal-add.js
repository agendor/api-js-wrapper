/**
 * This is an example of how to use Agendor wrapper to create a Person and a Deal related to
 * this Person on Agendor.
 *
 *
 *  - The Deal will be created with stage 'Contact' and status 'In Progress'
 *
 *
 * First of all, set your Agendor API user token.
 * - To see more about how to get a valid user token on Agendor API
 * - go to: https://api.agendor.com.br
 */
agendor.setToken('PUT A VALID USER TOKEN HERE');

$(document).on('submit','#contactForm', function(){
    /**
     * In this example, we're inserting a Person and a Deal related to this Person.
     * The Person will be inserted with values from the contact form.
     * The Deal will be inserted with some hard-coded values
     * and the description will be the value of the 'message' field from the contact form.
     *
     * - You can see all possible fields(required and optional) for deal and person here:
     * - https://api.agendor.com.br/#deals
     * - https://api.agendor.com.br/#people
     *
     *
     * Create a deal object with all desired values...
     */
    var deal = {
        title: 'This person was inserted through the form in our web site.',
        description: $('input[name="description"]').val(),
        person: {
            name: $('input[name="name"]').val(),
            emails:[$('input[name="email"]').val()],
            phones:[{
                number:$('input[name="phoneNumber"]').val(),
                type:'work'
            }]
        }
    };

    /**
     * With everything set up, we can call agendor wrapper to insert our objects.
     * The wrapper will call Agendor API and insert the person and the deal.
     */
    agendor.deal.add(deal, function(result){
        if(result.error){
            //Something bad happened, 'result.error' is a message explaining what was wrong.
        }else{
            //The 'result' variable will be a deal object with all fields inserted.
        }
    });

    return false;
});