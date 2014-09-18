# [Agendor-Wrapper](https://github.com/agendor/api-js-wrapper)

A group of functions to allow easy access to [Agendor API](https://api.agendor.com.br):

For now, *Agendor-Wrapper* have this features:

- Insert a Person;
- Insert a Person and a Deal related to this Person(with stage as **'Contact'** and status as **'In Progress'**)
- Insert a Person, a Deal related to the person(with stage as **'Contact'**, status as **'In Progress'**) and a Task related to the Deal.


## Getting Started

Here is what you have to do to start to use Agendor-Wrapper:
<br/>

```html
<!--You'll need to include this file on any page you want to use the *Agendor-Wrapper*:-->
<script src="agendor-wrapper.min.js"></script>
<!--You'll find this file on /dist folder-->
```

<br/>
Once you've included the file, *Agendor-Wrapper* will create an `agendor` variable in the global context and, through this variable, you'll have access to all Agendor-Wrapper's features. 
<br/>
<br/>
First of all, you **MUST** call the `setToken(token)` function to identify yourself as a valid agendor user

```js
agendor.setToken('PASS A VALID USER TOKEN HERE');
//To se more about user tokens go to: https://api.agendor.com.br/
```


Now, you're able to use *Agendor-Wrapper* with success.
<br/>
<br/>
## Examples

In this section we'll show you how you can use the *Agendor-Wrapper*.

You can see others examples [on the /examples folder](https://github.com/agendor/api-js-wrapper/tree/master/examples).


**1.Insert a Person:**

```js
//create a Person object with all attributes you want to insert
//to see all possibles attibutes of person go to: 
//https://api.agendor.com.br/#people
var person = {
    name: "Name of the Person",
    cpf: 12345678901,
    phones: [
        {
            number: "(11) 99999-5555",
            type: "mobile"
        }
    ]
}
//call agendor.person.add to insert the person
agendor.person.add(person, function(result){
    if(result.error){
        //Something bad happened, 'result.error' 
        //is a message explaining what was wrong.
    }else{
        //The 'result' variable will be a 
        //person object with all fields inserted.
    }
});
```
<br/>
<br/>

**2. Insert a Person and a Deal related to this Person:**

```js
//create a Deal object with all attributes you want to insert. and
// - set a Person object as the 'person' attribute of Deal;

//to see all possibles attibutes of deal go to: 
//https://api.agendor.com.br/#deals
var deal = {
    title:"This person was inserted through the contact form in our website..",
    description: "Contact this person...",
    person:{
        name: "Name of the Person",
        cpf: 12345678901,
        phones: [
            {
                number: "(11) 99999-5555",
                type: "mobile"
            }
        ]
    }
}
//call agendor.deal.add to insert the person and the deal
agendor.deal.add(deal, function(result){
    if(result.error){
        //Something bad happened, 'result.error' 
        //is a message explaining what was wrong.
    }else{
        //The 'result' variable will be a 
        //person object with all fields inserted.
    }
});
```

<br/>
<br/>

**3. Insert a Person, a Deal related to this Person and a Task related to the Deal:**

```js
//create a Task object with all attributes you want to insert.
// - set a Deal object as the 'deal' attribute of Task
// - set a Person object as the 'person' attribute of Deal

//to see all possibles attibutes of deal go to: 
//https://api.agendor.com.br/#tasks
var task = {
    text:"Contact this person urgently!!",
    deal:{
        title:"This person was inserted through the contact form in our website..",
        description: "Contact this person...",
        person:{
            name: "Name of the Person",
            cpf: 12345678901,
            phones: [
                {
                    number: "(11) 99999-5555",
                    type: "mobile"
                }
            ]
        }
    }
}
//call agendor.task.add to insert the person, the deal and the task
agendor.task.add(task, function(result){
    if(result.error){
        //Something bad happened, 'result.error' 
        //is a message explaining what was wrong.
    }else{
        //The 'result' variable will be a 
        //person object with all fields inserted.
    }
});
```
