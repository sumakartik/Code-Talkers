import "@testing-library/cypress";

describe("App Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should render an app header thant says Code Talkers", () => {
    cy.findByRole;
  });
});
