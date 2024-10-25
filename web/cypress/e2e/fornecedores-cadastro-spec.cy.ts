describe("Fornecedores Cadastro E2E", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3000/graphql");
    cy.visit("/fornecedores/cadastro");
  });

  it("should be possible to view the registration screen", () => {
    cy.contains("Seja Clarke").should("be.visible");
    cy.contains("Seja um parceiro da Clarke").should("be.visible");
    cy.contains("Qual o nome da empresa?*").should("be.visible");
  });

  //   deve ser possivel cadastrar um novo fornecedor

  it("should be possible to create a new supplier", () => {
    cy.get("#nameRegisterSupplier").type("teste");
    cy.get("#cnpjRegisterSupplier").type("12345678901234");
    cy.get("#stateRegisterSupplier").type("SP");
    cy.get("#kwhAmountRegisterSupplier").type("10");
    cy.get("#minimumKwhRegisterSupplier").type("100");

    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      req.reply({
        data: {
          createSupplier: {
            id: "123",
          },
        },
      });
    }).as("createSupplier");

    cy.get("button[type=submit]").click();

    cy.wait("@createSupplier").then(({ response }) => {
      expect(response!.body.data.createSupplier.id).to.equal("123");
    });
  });

  //   não deve ser possivel cadastar um fornecedor se o cnpj for menor que 14 digitos
  it("should not be possible to create a new supplier if the CNPJ is less than 14 digits", () => {
    cy.get("#nameRegisterSupplier").type("teste");
    cy.get("#cnpjRegisterSupplier").type("123456789012");
    cy.get("#stateRegisterSupplier").type("SP");
    cy.get("#kwhAmountRegisterSupplier").type("10");
    cy.get("#minimumKwhRegisterSupplier").type("100");
    cy.get("button[type=submit]").click();
    cy.contains("CNPJ preciso ter 14 caracteres").should("be.visible");
  });

  // não deve ser possivel cadastrar um fornecedor se o state tive menos de 2 digitos
  it("should not be possible to create a new supplier if the state has less than 2 digits", () => {
    cy.get("#nameRegisterSupplier").type("teste");
    cy.get("#cnpjRegisterSupplier").type("12345678901234");
    cy.get("#stateRegisterSupplier").type("S");
    cy.get("#kwhAmountRegisterSupplier").type("10");
    cy.get("#minimumKwhRegisterSupplier").type("100");
    cy.get("button[type=submit]").click();
    cy.contains("UF deve ter 2 caracteres.").should("be.visible");
  });

  //   não deve ser possivel cadastrar um fornecedor se o kwh for menor que 1
  it("should not be possible to create a new supplier if the kwh is less than 1", () => {
    cy.get("#nameRegisterSupplier").type("teste");
    cy.get("#cnpjRegisterSupplier").type("12345678901234");
    cy.get("#stateRegisterSupplier").type("SP");
    cy.get("#kwhAmountRegisterSupplier").type("0");
    cy.get("#minimumKwhRegisterSupplier").type("100");
    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName === "GET_COMPANIES") {
        req.reply({
          errors: [
            {
              message: "Valor de kWh deve ser maior que 0",
              extensions: {
                code: "CLIENT_BAD_REQUEST",
              },
            },
          ],
        });
      }
    });

    cy.get("button[type=submit]").click();
    cy.contains("Valor de kWh deve ser maior que 0").should("be.visible");
  });

  //   não deve ser possivel cadastrar um fornecedor se o minimo kwh for menor que 1
  it("should not be possible to create a new supplier if the minimum kwh is less than 1", () => {
    cy.get("#nameRegisterSupplier").type("teste");
    cy.get("#cnpjRegisterSupplier").type("12345678901234");
    cy.get("#stateRegisterSupplier").type("SP");
    cy.get("#kwhAmountRegisterSupplier").type("10");
    cy.get("#minimumKwhRegisterSupplier").type("0");
    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName === "GET_COMPANIES") {
        req.reply({
          errors: [
            {
              message: "Minimo de kWh deve ser 1",
              extensions: {
                code: "CLIENT_BAD_REQUEST",
              },
            },
          ],
        });
      }
    });

    cy.get("button[type=submit]").click();
    cy.contains("Minimo de kWh deve ser 1").should("be.visible");
  });
});
