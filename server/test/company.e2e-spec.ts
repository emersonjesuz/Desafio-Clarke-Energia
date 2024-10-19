import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CompanyService } from '../src/graphql/services/company.services';
import { Company } from '../src/graphql/dtos/models/comapny.model';

describe('Create Company E2E', () => {
  let app: INestApplication;
  let companyServiceMock: Partial<CompanyService>;
  const companies: Company[] = [
    {
      id: '123',
      name: 'farmacia do povo',
      email: 'farmpovo@gmail.com',
      phone: '5511898333',
      cnpj: '123',
    },
  ];

  beforeEach(async () => {
    companyServiceMock = {
      create: jest.fn().mockResolvedValue((company: Company) => {
        if (
          companies.find(
            (c) =>
              c.name === company.name ||
              c.email === company.email ||
              c.cnpj === company.cnpj ||
              c.phone === company.phone,
          )
        ) {
          throw new Error('company already exists');
        }

        return company;
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
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a company', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `mutation  {
                    createCompany(company: {
                        name:"farmacia do povo1"
                        email:"farmpovo@gmail.com"
                        phone:"5511898331"
                        cnpj:"122232321"
                    }){
                        id
                        name
                        email
                        phone
                        cnpj
                    }   
                }`,
        extensions: {},
      })
      .expect(200)
      .expect((res) => {
        console.log(res.body);
        expect(res.body.data.createCompany).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          phone: expect.any(String),
          cnpj: expect.any(String),
        });
      });
  });

  it('should throw an error if company already exists', async () => {
    // Fazendo o mock do método create para simular erro
    // companyServiceMock.create.mockRejectedValueOnce(
    //   new Error('company already exists'),
    // );

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `mutation  {
                    createCompany(company: {
                        name:"farmacia do povo"
                        email:"farmpovo@gmail.com"
                        phone:"5511898333"
                        cnpj:"123"
                    }){
                        id
                        name
                        email
                    }   
                }`,
        extensions: {},
      })
      .expect(200) // Pode ser 200 dependendo da implementação do GraphQL
      .expect((res) => {
        console.log(res.body);
        expect(res.body.errors[0].message).toEqual('company already exists');
      });
  });
});
