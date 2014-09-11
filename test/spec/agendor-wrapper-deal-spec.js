"use strict";

describe('Use Agendor Wrapper', function(){
    describe('to insert a person and a deal with StageOrder="Contact" and Status="In Progress"', function(){
        var deal = {
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
        };
        it('should return a deal with all fields inserted (including the person)', function(done){
            agendor.deal.add(deal, function(result){
                result.dealId.should.not.to.be.null;
                result.title.should.equal(deal.title);
                result.description.should.equal(deal.description);
                result.person.personId.should.not.to.be.null;
                result.person.name.should.not.to.be.null;
                result.person.name.should.equal(deal.person.name);
                done();
            });
        });

        describe('to insert a deal, without a person, with StageOrder="Contact" and status="In Progress"', function() {
            var deal = {
                title: 'Contact',
                description: 'This deal was created through the wrapper, without any person related to it.',
                value: 99999.99
            };
            it('should return a deal with all fields inserted', function (done) {
                agendor.deal.add(deal, function (result) {
                    result.dealId.should.not.to.be.null;
                    result.title.should.equal(deal.title);
                    result.description.should.equal(deal.description);
                    parseFloat(result.value).should.equal(deal.value);
                    done();
                });
            });
        });
    });
});