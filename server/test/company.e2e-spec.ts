import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CompanyService } from '../src/graphql/services/company.services';
import { Company } from '../src/graphql/dtos/models/comapny.model';

describe('Create Company E2E', () => {
  let app: INestApplication;
  let companyServiceMock: Partial<CompanyService>;
  const mockCompany = {
    id: '123',
    name: 'farmacia do povo',
    email: 'farmpovo@gmail.com',
    phone: '5511898333',
    cnpj: '10000500201000',
  };
  let companies: Company[] = [mockCompany];

  beforeEach(async () => {
    companyServiceMock = {
      create: jest.fn().mockImplementation((companyInput) => {
        const existingcompany = companies.find(
          (company) =>
            company.cnpj === companyInput.cnpj ||
            company.email === companyInput.email ||
            company.phone === companyInput.phone ||
            company.name === companyInput.name,
        );

        if (existingcompany) {
          switch (true) {
            case existingcompany.name === companyInput.name:
              throw new BadRequestException(
                'the company name is already in use',
              );

            case existingcompany.email === companyInput.email:
              throw new BadRequestException(
                'the company email is already in use',
              );

            case existingcompany.phone === companyInput.phone:
              throw new BadRequestException(
                'the company phone is already in use',
              );
            case existingcompany.cnpj === companyInput.cnpj:
              throw new BadRequestException('company cnpj is already in use');
          }
        }
        return {
          id: 'uiid',
          name: companyInput.name,
          email: companyInput.email,
          phone: companyInput.phone,
          cnpj: companyInput.cnpj,
        };
      }),
      // Mock para verificar se os dados são únicos
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CompanyService) // Sobrescreve o serviço real pelo mock
      .useValue(companyServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    companies = [mockCompany];
    await app.close();
  });

  it('should create a company', async () => {
    const mutation = `mutation  {
      createCompany(company: {
          name:"Casas Bahia"
          email:"casasbahia@gmail.com"
          phone:"5511293847"
          cnpj:"10000500204001"
      }){
          id
          name
          email
          phone
          cnpj
      }   
  }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.data.createCompany).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          phone: expect.any(String),
          cnpj: expect.any(String),
        });
      });
  });

  it('Should throw an error if the company name is empty', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:""
                        email:"farmpovo@gmail.com"
                        phone:"5511898333"
                        cnpj:"123"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual('Name is required');
      });
  });

  it('Should not create a company if the email is invalid', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"farmacia do povo"
                        email:""
                        phone:"5511898333"
                        cnpj:"1234567890"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual('Invalid email address');
      });
  });

  it('Should not create a company if the telephone number has more than 11 digits', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"farmacia do povo"
                        email:"f@gmail.com"
                        phone:"551189833333"
                        cnpj:"1234567890"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual(
          'Phone number must be no longer than 11 digits.',
        );
      });
  });

  it('Should not create a company if the phone number is not just numbers', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"farmacia do povo"
                        email:"f@gmail.com"
                        phone:"5511C9833a"
                        cnpj:"1234567890"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual('The phone number must contain numbers only.');
      });
  });

  it('Should not create a company if the telephone number is less than 10 digits', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"farmacia do povo"
                        email:"f@gmail.com"
                        phone:"55"
                        cnpj:"1234567890"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual(
          'Phone number must be at least 10 digits long.',
        );
      });
  });

  it('Should not create a company if the cnpj is less than 14 digits', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"farmacia do povo"
                        email:"f@gmail.com"
                        phone:"5511898333"
                        cnpj:"1234567"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual('CNPJ must be 14 characters long.');
      });
  });

  it('Should generate an error if the companies name already exists', async () => {
    const mutation = `mutation  {
      createCompany(company: {
          name:"farmacia do povo"
          email:"f@gmail.com"
          phone:"0111111111"
          cnpj:"10000500201001"
      }){
          id
          name
          email
      }   
  }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.errors[0].message).toEqual(
          'the company name is already in use',
        );
      });
  });

  it('Should generate an error if the companies email already exists', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"farm"
                        email:"farmpovo@gmail.com"
                        phone:"0000000000"
                        cnpj:"10000500201002"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.errors[0].message).toEqual(
          'the company email is already in use',
        );
      });
  });

  it('Should generate an error if the companies phone already exists', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"f"
                        email:"f@gmail.com"
                        phone:"5511898333"
                        cnpj:"10000500201000"
                    }){
                        id
                        name
                        email
                        phone
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.errors[0].message).toEqual(
          'the company phone is already in use',
        );
      });
  });

  it('Should generate an error if the companies CNPJ already exists', async () => {
    const mutation = `mutation  {
                    createCompany(company: {
                        name:"farm"
                        email:"far@gmail.com"
                        phone:"1111111111"
                        cnpj:"10000500201000"
                    }){
                        id
                        name
                        email
                    }   
                }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.errors[0].message).toEqual(
          'company cnpj is already in use',
        );
      });
  });
});
