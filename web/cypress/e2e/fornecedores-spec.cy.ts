interface Supplier {
  id: string;
  name: string;
  minimumKwh: number;
  kwhAmount: number;
  logo: string;
  state: string;
  avarage: number;
  Contracts: {
    id: string;
    companyId: string;
    supplierId: string;
  }[];
}

describe("Fornecedores", () => {
  describe("Fornecedores Not Found E2E", () => {
    beforeEach(() => {
      cy.intercept("POST", "http://localhost:3000/graphql");
      cy.visit("/fornecedores/123");
    });

    it("Should not be redirected to login page if the id in the parameter does not exist", () => {
      cy.contains(
        "Não foram encontrados soluções que se adequem ao seu negócio!",
      ).should("be.visible");
      cy.url().should("eq", "http://localhost:3005/login");
    });
  });

  describe("Fornecedores  E2E", () => {
    beforeEach(() => {
      cy.intercept("POST", "http://localhost:3000/graphql");
      cy.visit("/fornecedores/123");
    });

    it("should not be possible to see if the KWH was less than the limit", () => {
      cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
        req.reply({
          data: {
            findCompany: {
              kwh: 150,
            },
            listSuppliers: [],
          },
        });
      }).as("listSuppliers");

      cy.wait("@listSuppliers").then(({ response }) => {
        expect(response!.body.data.listSuppliers.length).to.equal(0);
      });

      cy.contains(
        "Não foram encontrados soluções que se adequem ao seu negócio!",
      ).should("be.visible");
    });

    it("should be possible to display a list if the KWH is greater than the suppliers' minimum threshold", () => {
      const supplier = (id: string): Supplier => {
        return {
          id,
          name: "Fornecedores teste",
          minimumKwh: 160,
          kwhAmount: 200,
          avarage: 5,
          logo: "",
          state: "ba",
          Contracts: [],
        };
      };

      cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
        req.reply({
          data: {
            findCompany: {
              kwh: 190,
            },
            listSuppliers: [supplier("123"), supplier("321"), supplier("456")],
          },
        });
      }).as("list");

      cy.wait("@list").then(({ response }) => {
        expect(response!.body.data.findCompany.kwh).to.equal(190);
        expect(response!.body.data.listSuppliers.length).to.equal(3);
      });

      cy.url().should("eq", "http://localhost:3005/fornecedores/123");

      cy.contains("Fornecedores teste").should("be.visible");
      cy.contains("Estado de origem").should("be.visible");
      cy.contains("Preço do kWh").should("be.visible");
    });

    it("must be possible to view a modal when clicking the button 'Contratar' ", () => {
      const supplier = (id: string): Supplier => {
        return {
          id,
          name: "Fornecedores teste",
          minimumKwh: 160,
          kwhAmount: 200,
          avarage: 5,
          logo: "",
          state: "ba",
          Contracts: [],
        };
      };

      cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
        req.reply({
          data: {
            findCompany: {
              kwh: 190,
            },
            listSuppliers: [supplier("123"), supplier("321"), supplier("456")],
          },
        });
      }).as("list");

      cy.wait("@list").then(({ response }) => {
        expect(response!.body.data.findCompany.kwh).to.equal(190);
        expect(response!.body.data.listSuppliers.length).to.equal(3);
      });

      cy.get('[data-key="123"]').should("be.visible");
      cy.get('[data-key="123"]').contains("button", "Contratar").click();

      cy.contains("Solicitação concluída!").should("be.visible");
    });

    it("must be possible to evaluate the supplier", () => {
      cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
        req.reply({
          data: {
            findCompany: {
              kwh: 190,
            },
            listSuppliers: [
              {
                id: "123",
                name: "Fornecedores teste",
                minimumKwh: 160,
                kwhAmount: 200,
                avarage: 5,
                logo: "",
                state: "ba",
                Contracts: [],
              },
            ],
          },
        });
      }).as("list");

      cy.wait("@list").then(({ response }) => {
        expect(response!.body.data.findCompany.kwh).to.equal(190);
        expect(response!.body.data.listSuppliers.length).to.equal(1);
      });

      cy.get('[data-key="123"]').should("be.visible");
      cy.get('[data-key="123"]').contains("button", "Contratar").click();
      cy.contains("Solicitação concluída!").should("be.visible");

      cy.get('[data-average-key="3"]').click();

      cy.get("#button-avarege").should("be.visible");
      cy.get("#button-avarege").click();
    });

    it("must be possible to view a supplier already contracted", () => {
      cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
        req.reply({
          data: {
            findCompany: {
              kwh: 190,
            },
            listSuppliers: [
              {
                id: "123",
                name: "Fornecedores teste",
                minimumKwh: 160,
                kwhAmount: 200,
                avarage: 5,
                logo: "",
                state: "ba",
                Contracts: [
                  {
                    id: "123",
                    companyId: "123",
                    supplierId: "123",
                  },
                ],
              },
            ],
          },
        });
      });

      cy.get('[data-key="123"]').should("be.visible");

      cy.get('[data-key="123"]')
        .contains("button", "Solicitação Concruida")
        .should("be.visible");
    });
  });
});
