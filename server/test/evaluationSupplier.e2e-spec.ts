import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Company } from '../src/graphql/Company/company.model';
import { CompanyRepository } from '../src/graphql/Company/company.repository';
import { EvaluationSupplierRepository } from '../src/graphql/EvaluationSupplier/evaluationSupplier.repository';
import { SupplierRepository } from '../src/graphql/Supplier/supplier.repository';

interface EvaluationSupplier {
  id: number;
  supplierId: string;
  companyId: string;
  note: number;
}

interface SupplierMock {
  id: string;
  name: string;
  logo: string;
  minimumKwh: number;
  kwhAmount: number;
  cnpj: string;
  Evaluations: EvaluationSupplier[];
}

describe('Add evaluate E2E', () => {
  let app: INestApplication;
  let companyRepositoryMock: Partial<CompanyRepository>;
  let supplierRepositoryMock: Partial<SupplierRepository>;
  let evaluationSupplierRepositoryMock: Partial<EvaluationSupplierRepository>;
  const mockCompany = (id: string) => {
    return {
      id,
      name: 'farmacia do povo',
      email: 'farmpovo@gmail.com',
      phone: '5511898333',
      cnpj: '10000500201000',
      kwh: 1000,
    };
  };
  const mockEvaluationSupplier: EvaluationSupplier = {
    id: 1,
    supplierId: '123',
    companyId: '123',
    note: 5,
  };

  const mockSupplier: SupplierMock = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1000,
    cnpj: '10000500201000',
    Evaluations: [mockEvaluationSupplier],
  };
  let companies: Company[] = [mockCompany('123'), mockCompany('456')];
  let suppliers: SupplierMock[] = [mockSupplier];
  let evaluationSuppliers: EvaluationSupplier[] = [];

  beforeEach(async () => {
    companyRepositoryMock = {
      findById: jest.fn().mockImplementation((id: string) => {
        return companies.find((company) => company.id === id);
      }),
    };

    supplierRepositoryMock = {
      findById: jest.fn().mockImplementation((id: string) => {
        return suppliers.find((supplier) => supplier.id === id);
      }),
    };

    evaluationSupplierRepositoryMock = {
      create: jest
        .fn()
        .mockImplementation((evaluationSupplier: EvaluationSupplier) => {
          evaluationSuppliers.push(evaluationSupplier);
          return evaluationSupplier;
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupplierRepository)
      .useValue(supplierRepositoryMock)
      .overrideProvider(CompanyRepository)
      .useValue(companyRepositoryMock)
      .overrideProvider(EvaluationSupplierRepository)
      .useValue(evaluationSupplierRepositoryMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });

  it('should create an evaluation', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:"123"
                    companyId:"456"
                    note:3
                }) 
                
            }`;

    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: mutation,
        extensions: {},
      })
      .expect((res) => {
        expect(res.body.data.addEvaluationSupplier).toEqual(
          'Avaliação criada com sucesso',
        );
      });
  });

  it('should not create an evaluation if the supplierId is empty', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:""
                    companyId:"456"
                    note:3
                }) 
                
            }`;

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

  it('should not create an evaluation if the companyId is empty', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:"444"
                    companyId:""
                    note:3
                }) 
                
            }`;

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

  it('should not create an evaluation if the note is less than 1', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:"123"
                    companyId:"456"
                    note:0
                }) 
                
            }`;

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
        expect(message).toEqual('Nota Não pode ser menor que 1');
      });
  });

  it('Should not create an evaluation if the note is greater than 5', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:"123"
                    companyId:"456"
                    note:6
                }) 
                
            }`;

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
        expect(message).toEqual('Nota não pode ser maior que 5');
      });
  });

  it('Should not create an evaluation if the supplier does not exist', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:"999"
                    companyId:"456"
                    note:3
                }) 
                
            }`;

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

  it('Should not create an evaluation if the company does not exist', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:"123"
                    companyId:"999"
                    note:3
                }) 
                
            }`;

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

  it('Should not create an evaluation if the evaluation already exists', async () => {
    const mutation = `mutation  {
                addEvaluationSupplier(evaluation:{
                    supplierId:"123"
                    companyId:"123"
                    note:3
                }) 
                
            }`;

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
        expect(message).toEqual('Avaliação ja existe');
      });
  });
});

describe('Media evaluation E2E', () => {
  let app: INestApplication;
  let supplierRepositoryMock: Partial<SupplierRepository>;
  const mockEvaluation = (id: number, companyId: string, note: number) => {
    return {
      id,
      supplierId: '123',
      companyId,
      note,
    };
  };
  let evaluations: EvaluationSupplier[] = [
    mockEvaluation(1, '123', 3),
    mockEvaluation(2, '122', 4),
    mockEvaluation(3, '456', 1),
  ];

  const mockSupplier: SupplierMock = {
    id: '123',
    name: 'Eneel energia',
    logo: 'https://eneel.com.br/imagens/logo.png',
    kwhAmount: 1,
    minimumKwh: 1000,
    cnpj: '10000500201000',
    Evaluations: [...evaluations],
  };

  let suppliers: SupplierMock[] = [mockSupplier];

  beforeEach(async () => {
    supplierRepositoryMock = {
      findById: jest.fn().mockImplementation((id: string) => {
        return suppliers.find((supplier) => supplier.id === id);
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
    await app.close();
  });

  it('Should return the average evaluation of a supplier', async () => {
    const query = `query  {
                calculateAverage(supplierId:"123")  
            }`;

    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.data.calculateAverage;
        expect(message).toEqual(2.7);
      });
  });

  it('Should not create an evaluation if the supplierId is empty', async () => {
    const query = `query  {
                calculateAverage(supplierId:"")  
            }`;

    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].message;
        expect(message).toEqual('ID do fornecedor é obrigatório');
      });
  });

  it('Should not create an evaluation if the supplier does not exist', async () => {
    const query = `query  {
                calculateAverage(supplierId:"999")  
            }`;

    return await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: query,
        extensions: {},
      })
      .expect((res) => {
        const message = res.body.errors[0].message;
        expect(message).toEqual('Fornecedor não encontrado');
      });
  });
});
