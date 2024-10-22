import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Supplier } from '../src/graphql/Supplier/supplier.model';
import { SupplierRepository } from '../src/graphql/Supplier/supplier.repository';

describe('Create Supplier E2E', () => {
  let app: INestApplication;
  let supplierRepositoryMock: Partial<SupplierRepository>;
  const mockSupplier: Supplier = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1000,
    cnpj: '10000500201000',
    state: 'SP',
    Contracts: [],
    avarage: 0,
    Evaluations: [],
  };
  let suppliers: Supplier[] = [mockSupplier];

  beforeEach(async () => {
    // Mock para verificar se os dados são únicos
    supplierRepositoryMock = {
      create: jest.fn().mockImplementation((newSupplier) => {
        suppliers.push(newSupplier);
        return {
          id: '123',
          name: newSupplier.name,
          logo: newSupplier.logo,
          kwhAmount: newSupplier.kwhAmount,
          minimumKwh: newSupplier.minimumKwh,
          cnpj: newSupplier.cnpj,
        };
      }),

      findOne: jest.fn().mockImplementation((supplierInput) => {
        return suppliers.find(
          (supplier) =>
            supplier.name === supplierInput.name ||
            supplier.cnpj === supplierInput.cnpj,
        );
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupplierRepository)
      .useValue(supplierRepositoryMock)
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
          state:"ba"
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
          state:"ba"
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
        expect(message).toEqual('Nome é obrigatorio');
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
          state:"ba"
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
        expect(message).toEqual('Minimo de kWh deve ser 1');
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
          state:"ba"
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
        expect(message).toEqual('Valor de kWh deve ser maior que 0');
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
          state:"ba"
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
        expect(message).toEqual('CNPJ deve ter 14 caracteres.');
      });
  });

  it('Should not create a supplier if the state is less than 2 characters', async () => {
    const mutation = `mutation  {
      createSupplier(supplier: {
          name:"Coelba energia"
          logo:"https://eneel.com.br/imagens/logo.png"
          kwhAmount:1
          minimumKwh:1
          cnpj:"10000500201001"
          state:""
      }) {
        id
        name
        logo
        kwhAmount
        minimumKwh
        cnpj
        state
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
        expect(message).toEqual('UF deve ter 2 caracteres.');
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
          state:"ba"
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
        expect(message).toEqual('Nome do fornecedor ja esta em uso');
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
          state:"ba"
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
        expect(message).toEqual('CNPJ do fornecedor ja esta em uso');
      });
  });
});

describe('List suppliers E2E', () => {
  let app: INestApplication;
  let supplierRepositoryMock: Partial<SupplierRepository>;
  const mockSupplier: Supplier = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1000,
    cnpj: '10000500201000',
    state: 'SP',
    Contracts: [],
    avarage: 0,
    Evaluations: [],
  };
  let suppliers: Supplier[] = [mockSupplier];

  beforeEach(async () => {
    supplierRepositoryMock = {
      findMany: jest.fn().mockImplementation(() => {
        return suppliers;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupplierRepository)
      .useValue(supplierRepositoryMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    suppliers = [];
    await app.close();
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
          'Valor Kwh deve ser maior que zero',
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
