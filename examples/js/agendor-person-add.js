/**
 * This is an example of how to use Agendor wrapper to create a Person.
 *
 *
 * First of all, set your Agendor API user token.
 * - To see more about how to get a valid user token on Agendor API
 * - go to: https://api.agendor.com.br
 */
agendor.setToken('PUT A VALID USER TOKEN HERE');

$(document).on('submit','#contactForm', function(){
    /**
     * In this example, we're inserting a Person.
     * The Person will be inserted with values from the contact form.
     *
     * - You can see all possible fields(required and optional) for person here:
     * - https://api.agendor.com.br/#people
     *
     *
     * Create a person object with all desired values...
     */
    var person = {
        name: $('input[name="name"]').val(),
        emails:[$('input[name="email"]').val()],
        phones:[{
            number:$('input[name="phoneNumber"]').val(),
            type:'mobile'
        }],
        address: {
            postalCode: $('input[name="zipCode"]').val(),
            state: $('input[name="state"]').val(),
            city: $('input[name="city"]').val(),
            streetName: $('input[name="streetName"]').val(),
            streetNumber: $('input[name="streetNumber"]').val(),
            additionalInfo: $('input[name="additionalInfo"]').val()
        }
    };

    /**
     * With everything set up, we can call agendor wrapper to insert our objects.
     * The wrapper will call Agendor API and insert the person.
     */
    agendor.person.add(person, function(result){
        if(result.error){
            //Something bad happened, 'result.error' is a message explaining what was wrong.
        }else{
            //The 'result' variable will be a person object with all fields inserted.
        }
    });

    return false;
});