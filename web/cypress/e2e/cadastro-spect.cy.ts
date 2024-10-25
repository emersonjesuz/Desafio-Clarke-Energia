describe("Cadastro E2E", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3000/graphql");
    cy.visit("/cadastro");
  });

  it("should be possible to view the registration screen", () => {
    cy.contains("Seja bem-vindo").should("be.visible");
    cy.contains(
      "Quer encontrar a melhor solução para o seu negócio? Encontramos os",
    ).should("be.visible");
    cy.contains("Qual seu nome?*").should("be.visible");
  });

  it("should be possible to create a new registration", () => {
    cy.get("#name").type("Teste");
    cy.get("#email").type("meContrata@example.com");
    cy.get("#phone").type("12345678901");
    cy.get("#cnpj").type("12345678901234");
    cy.get("#kwh").type("100");

    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      req.reply({
        data: {
          createCompany: {
            id: "123",
          },
        },
      });
    }).as("create");

    cy.get("button[type=submit]").click();

    cy.url().should("eq", "http://localhost:3005/fornecedores/123");

    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      req.reply({
        data: {
          findCompany: {
            kwh: "123",
          },
          listSuppliers: [],
        },
      });
    }).as("suppliers");

    cy.wait("@suppliers").then(({ response }) => {
      expect(response!.body.data.findCompany.kwh).to.equal("123");
      expect(response!.body.data.listSuppliers.length).to.equal(0);
    });
  });

  it("should not be possible to create a registration if the cnpj has less than 14 digits", () => {
    cy.get("#name").type("Teste");
    cy.get("#email").type("meContrata@example.com");
    cy.get("#phone").type("12345678901");
    cy.get("#cnpj").type("12345678901");
    cy.get("#kwh").type("100");

    cy.get("button[type=submit]").click();

    cy.contains("CNPJ preciso ter 14 caracteres").should("be.visible");
  });
});
