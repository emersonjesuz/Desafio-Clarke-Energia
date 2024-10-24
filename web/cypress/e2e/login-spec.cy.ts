describe("Login E2E", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3000/graphql");
    cy.visit("/login");
  });

  it("should be possible to login with valid credentials", () => {
    cy.get("#emailLogin").type("g5jzZ@example.com");
    cy.get("#passwordLogin").type("123456");
    cy.get("button[type=submit]").click();

    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      req.reply({
        data: {
          findCompany: {
            id: "123",
          },
        },
      });
    }).as("login");

    cy.wait("@login").then(({ response }) => {
      expect(response!.body.data.findCompany.id).to.equal("123");
    });

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

  it("should not be possible to login with invalid credentials", () => {
    cy.get("#emailLogin").type("g5jzZ@example.com");
    cy.get("#passwordLogin").type("123456");

    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName === "GET_COMPANIES") {
        req.reply({
          errors: [
            {
              message: "Cliente não encontrado",
              extensions: {
                code: "CLIENT_NOT_FOUND",
              },
            },
          ],
        });
      }
    }).as("login");

    cy.get("button[type=submit]").click();

    cy.wait("@login").then(({ response }) => {
      expect(response!.body.errors[0].message).to.equal(
        "Cliente não encontrado",
      );
    });

    cy.contains("Cliente não encontrado").should("be.visible");
  });
});
