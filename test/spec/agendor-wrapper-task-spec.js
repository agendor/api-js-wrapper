"use strict";

describe('Use Agendor Wrapper', function(){
    describe('to insert a person, a deal with StageOrder="Contact" and Status="In Progress" and a task', function(){
        var task = {
            text:'A comment to the deal inserted through agendor wrapper',
            deal: {
                title: 'Contact this organization',
                description: 'This organization was inserted through the contact form in our web site. Contact this organization',
                value: 90909090.00,
                person: {
                    name: 'Person to contact ' + Math.random(),
                    cpf: '' + Math.floor(Math.random() * 99999999999),
                    phones: [
                        {
                            'number': '(11) 98055-9313',
                            'type': 'mobile'
                        }
                    ],
                    emails: ['jondoe@org.com'],
                    address: {
                        country: 'Brazil',
                        district: 'Consolação',
                        streetName: 'Rua Sergipe',
                        streetNumber: 799,
                        additionalInfo: 'Ap 123',
                        postalCode: '01243001',
                        state: 'SP',
                        city: 'São Paulo'
                    }
                }
            }
        };
        it('should return a task with all fields inserted (including the deal)', function(done){
            agendor.task.add(task, function(result){
                result.taskId.should.not.to.be.null;
                result.text.should.equal(task.text);
                result.deal.dealId.should.not.to.be.null;
                result.deal.title.should.equal(task.deal.title);
                result.deal.description.should.equal(task.deal.description);
                result.deal.person.personId.should.not.to.be.null;
                done();
            });
        });
    });
});