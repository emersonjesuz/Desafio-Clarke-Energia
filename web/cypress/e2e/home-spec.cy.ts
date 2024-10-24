describe("Mobile size home screen", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(375, 667);
  });

  it("Should be possible to view the main page", () => {
    cy.contains("Compre energia até").should("be.visible");
  });

  it("should be possible to redirect to the registration screen by clicking on the 'Quero ser um cliente' link on the mobile-sized screen", () => {
    cy.get("#registerMobile").should("be.visible");

    cy.get("#registerMobile").click();

    cy.url().should("eq", "http://localhost:3005/cadastro");
  });
});

describe("Desktop size home screen", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 720);
  });
  it("Should be possible to view the main page", () => {
    cy.contains("Compre energia até").should("be.visible");
  });

  it("should be possible to redirect to the registration screen by clicking on the 'ser um cliente' link on the desktop-sized screen", () => {
    cy.get("#registerHeader").should("be.visible");

    cy.get("#registerHeader").click();

    cy.url().should("eq", "http://localhost:3005/cadastro");
  });

  it("should be possible to redirect to the login screen by clicking on the 'Area do cliente' link on the desktop-sized screen", () => {
    cy.get("#loginHeader").should("be.visible");

    cy.get("#loginHeader").click();

    cy.url().should("eq", "http://localhost:3005/login");
  });

  it("should be possible to redirect to the registration screen by clicking on the 'Quero ser um cliente' link on the desktop-sized screen", () => {
    cy.get("#registerDesktop").should("be.visible");

    cy.get("#registerDesktop").click();

    cy.url().should("eq", "http://localhost:3005/cadastro");
  });
});
