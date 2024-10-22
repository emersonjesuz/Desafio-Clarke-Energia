import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { CompanyRepository } from '../src/graphql/Company/company.repository';
import { ContractInput } from '../src/graphql/Contract/contract.inputs';
import { ContractRepository } from '../src/graphql/Contract/contract.repository';
import { SupplierRepository } from '../src/graphql/Supplier/supplier.repository';
import * as request from 'supertest';

interface Contract {
  id: number;
  supplierId: string;
  companyId: string;
}

describe('Create Contract E2E', () => {
  let app: INestApplication;
  let contractRepositoryMock: Partial<ContractRepository>;
  let companyRepositoryMock: Partial<CompanyRepository>;
  let supplierRepositoryMock: Partial<SupplierRepository>;
  const mockContract = (companyId: string) => {
    return {
      id: 1,
      supplierId: '123',
      companyId,
    };
  };
  const mockCompany = (id: string) => {
    return {
      id,
      name: 'farmacia do povo',
      email: 'farmpovo@gmail.com',
      phone: '5511898333',
      cnpj: '10000500201000',
    };
  };

  const mockSupplier = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1000,
    cnpj: '10000500201000',
  };
  let companies = [mockCompany('123'), mockCompany('456'), mockCompany('789')];
  let contracts: Contract[] = [mockContract('123'), mockContract('456')];

  beforeEach(async () => {
    contractRepositoryMock = {
      create: jest.fn().mockImplementation((contract: ContractInput) => {
        contracts.push({
          id: 1,
          supplierId: contract.supplierId,
          companyId: contract.companyId,
        });
        return {
          id: 1,
          supplierId: contract.supplierId,
          companyId: contract.companyId,
        };
      }),

      findOne: jest.fn().mockImplementation((contractInput) => {
        return contracts.find(
          (contract) =>
            contract.supplierId === contractInput.supplierId &&
            contract.companyId === contractInput.companyId,
        );
      }),
    };

    companyRepositoryMock = {
      findById: jest.fn().mockImplementation((id: string) => {
        return companies.find((company) => company.id === id);
      }),
    };

    supplierRepositoryMock = {
      findById: jest.fn().mockImplementation((id: string) => {
        return mockSupplier.id === id ? mockSupplier : null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupplierRepository)
      .useValue(supplierRepositoryMock)
      .overrideProvider(CompanyRepository)
      .useValue(companyRepositoryMock)
      .overrideProvider(ContractRepository)
      .useValue(contractRepositoryMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a contract', async () => {
    const mutation = `
    mutation {
      createContract(contract:{
        supplierId: "123"
        companyId: "789"
      })
    }
    `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.data.createContract).toEqual(
          'Contrato criado com sucesso',
        );
      });
  });

  it('should not create a contract if the supplierId is empty', async () => {
    const mutation = `
    mutation {
      createContract(contract:{
        supplierId: ""
        companyId: "789"
      })
    }
    `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual('ID do fornecedor obrigatório');
      });
  });

  it('should not create a contract if the companyId is empty', async () => {
    const mutation = `
    mutation {
      createContract(contract:{
        supplierId: "123"
        companyId: ""
      })
    }
    `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].extensions.originalError.message[0];
        expect(message).toEqual('ID da empresa obrigatorio');
      });
  });

  it('should not create a contract if the supplierId does not exist', async () => {
    const mutation = `
    mutation {
      createContract(contract:{
        supplierId: "999"
        companyId: "789"
      })
    }
    `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].message;
        expect(message).toEqual('Fornecedor não encontrado');
      });
  });

  it('should not create a contract if the companyId does not exist', async () => {
    const mutation = `
    mutation {
      createContract(contract:{
        supplierId: "123"
        companyId: "999"
      })
    }
    `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].message;
        expect(message).toEqual('Empresa não encontrada');
      });
  });

  it('should not create a contract if the contract already exists', async () => {
    const mutation = `
    mutation {
      createContract(contract:{
        supplierId: "123"
        companyId: "456"
      })
    }
    `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].message;
        expect(message).toEqual('Contrato ja existe');
      });
  });
});

describe('count Contract by Supplier E2E', () => {
  let app: INestApplication;
  let contractRepositoryMock: Partial<ContractRepository>;
  let supplierRepositoryMock: Partial<SupplierRepository>;
  const mockContract = (companyId: string) => {
    return {
      id: 1,
      supplierId: '123',
      companyId,
    };
  };

  let contracts: Contract[] = [
    mockContract('123'),
    mockContract('456'),
    mockContract('789'),
  ];

  const mockSupplier = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1000,
    cnpj: '10000500201000',
  };

  beforeEach(async () => {
    contractRepositoryMock = {
      countBySupplier: jest.fn().mockImplementation((supplierId: string) => {
        return contracts.filter(
          (contract) => contract.supplierId === supplierId,
        ).length;
      }),
    };

    supplierRepositoryMock = {
      findById: jest.fn().mockImplementation((id: string) => {
        return mockSupplier.id === id ? mockSupplier : null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })

      .overrideProvider(ContractRepository)
      .useValue(contractRepositoryMock)
      .overrideProvider(SupplierRepository)
      .useValue(supplierRepositoryMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Should be able to find 3 contracts', async () => {
    const query = `
      query {
        countContracts(supplierId:"123")
      }
      `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.data.countContracts).toEqual(3);
      });
  });

  it('Should not count contracts if supplierId is empty', async () => {
    const query = `
      query {
        countContracts(supplierId:"")
      }
      `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.errors[0].message).toEqual(
          'ID do fornecedor é obrigatório',
        );
      });
  });

  it('Should not count contracts if supplierId does not exist', async () => {
    const query = `
      query {
        countContracts(supplierId:"999")
      }
      `;
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.errors[0].message).toEqual('Fornecedor não encontrado');
      });
  });
});
