import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Supplier } from '../src/graphql/Supplier/supplier.model';
import { SupplierService } from '../src/graphql/services/supplier.service';
import * as request from 'supertest';

describe('Create Supplier E2E', () => {
  let app: INestApplication;
  let supplierServiceMock: Partial<SupplierService>;
  const mockSupplier: Supplier = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1,
    cnpj: '10000500201000',
  };
  let suppliers: Supplier[] = [mockSupplier];

  beforeEach(async () => {
    // Mock para verificar se os dados são únicos
    supplierServiceMock = {
      create: jest.fn().mockImplementation((newSupplier) => {
        const existingSupplier = suppliers.find(
          (supplier) =>
            supplier.cnpj === newSupplier.cnpj ||
            supplier.name === newSupplier.name,
        );

        if (existingSupplier) {
          switch (true) {
            case existingSupplier.name === newSupplier.name:
              throw new BadRequestException('Supplier name is already in use');

            case existingSupplier.cnpj === newSupplier.cnpj:
              throw new BadRequestException('Supplier cnpj is already in use');
          }
        }

        return {
          id: '123',
          name: newSupplier.name,
          logo: newSupplier.logo,
          kwhAmount: newSupplier.kwhAmount,
          minimumKwh: newSupplier.minimumKwh,
          cnpj: newSupplier.cnpj,
        };
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupplierService)
      .useValue(supplierServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    suppliers = [mockSupplier];
    await app.close();
  });

  it('should create a supplier', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:"Coelba energia"
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:1
          minimumKwh:1
          cnpj:"10000500201001"
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
      }
    }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.data.createSupplier).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          logo: expect.any(String),
          kwhAmount: expect.any(Number),
          minimumKwh: expect.any(Number),
          cnpj: expect.any(String),
        });
      });
  });

  it('Should not create a supplier if name is empty', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:""
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:1
          minimumKwh:1
          cnpj:"10000500201001"
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
      }
    }
    `;
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

  it('Should not create a supplier if minimumKwh is less than 1', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:"Coelba energia"
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:1
          minimumKwh:0
          cnpj:"10000500201001"
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
      }
    }
    `;
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
        expect(message).toEqual('Minimum KWH must be greater than 0');
      });
  });

  it('Should not create a supplier if kwh amount is less than 1', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:"Coelba energia"
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:0
          minimumKwh:1
          cnpj:"10000500201001"
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
      }
    }
    `;
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
        expect(message).toEqual('KWH amount must be greater than 0');
      });
  });

  it('Should not create a supplier if the cnpj is less than 14 digits', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:"Coelba energia"
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:1
          minimumKwh:1
          cnpj:"1234567"
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
      }
    }
    `;
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

  it('Should not create a supplier if the name already exists', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:"Eneel energia"
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:1
          minimumKwh:1
          cnpj:"10000500201000"
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
      }
    }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].message;
        expect(message).toEqual('Supplier name is already in use');
      });
  });

  it('Should not create a supplier if the cnpj already exists', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:"Coelba energia"
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:1
          minimumKwh:1
          cnpj:"10000500201000"
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
      }
    }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].message;
        expect(message).toEqual('Supplier cnpj is already in use');
      });
  });
});

describe('List suppliers E2E', () => {
  let app: INestApplication;
  let supplierServiceMock: Partial<SupplierService>;
  const mockSupplier: Supplier = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1000,
    cnpj: '10000500201000',
  };
  let suppliers: Supplier[] = [mockSupplier];

  beforeEach(async () => {
    supplierServiceMock = {
      list: jest.fn().mockImplementation((valueKwh: number) => {
        const filteredSuppliersByKwh = suppliers.filter((supplier) => {
          return +supplier.minimumKwh < valueKwh;
        });

        return filteredSuppliersByKwh;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupplierService)
      .useValue(supplierServiceMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Should list suppliers', async () => {
    const query = `query {
        listSuppliers(valueKwh:10000) {
          id
          name
          logo
          kwhAmount
          minimumKwh
          cnpj
        }
    }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        const listSuppliers = res.body.data.listSuppliers as Supplier[];
        expect(!!listSuppliers.length).toBe(true);
      });
  });

  it('Should not list suppliers if the valueKwh is less than 1', async () => {
    const query = `query {
        listSuppliers(valueKwh:-1) {
          id
          name
          logo
          kwhAmount
          minimumKwh
          cnpj
        }
    }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.errors[0].message).toEqual(
          'Value KWH must be greater than 0',
        );
      });
  });

  it('Should not list suppliers if the valueKwh is less than the minimumKwh', async () => {
    const query = `query {
        listSuppliers(valueKwh:100) {
          id
          name
          logo
          kwhAmount
          minimumKwh
          cnpj
        }
    }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        const listSuppliers = res.body.data.listSuppliers as Supplier[];
        expect(!!listSuppliers.length).toBe(false);
      });
  });
});
