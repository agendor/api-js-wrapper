"use strict";

describe('Use Agendor Wrapper', function(){
    describe('to insert a person with success:', function(){
        var person = {
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
        };
        it('should return a person with all fields inserted', function(){
            agendor.person.add(person, function(result){
                result.personId.should.not.to.be.null;
                result.name.should.not.to.be.null;
                result.name.should.equal(person.name);
                result.phones.should.equal(person.phones);
                result.emails[0].should.equal(person.emails[0]);
                result.address.should.equal(person.address);
                done();
            });
        });
    });

    describe('to insert a person, with the organization field set:', function(){
        var person = {
            name: 'Person to contact ' + Math.random(),
            cpf: '' + Math.floor(Math.random() * 99999999999),
            organization:{
                nickname: 'Organization'+ Math.random()
            },
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
        };
        it('should return a person with all fields inserted', function(){
            agendor.person.add(person, function(result){
                result.personId.should.not.to.be.null;
                result.name.should.not.to.be.null;
                result.name.should.equal(person.name);
                result.organization.organizationId.should.equal(person.name);
                result.phones.should.equal(person.phones);
                result.emails[0].should.equal(person.emails[0]);
                result.address.should.equal(person.address);
                done();
            });
        });
    });
});