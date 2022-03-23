import "@testing-library/cypress";

describe("App Component", () => {
  //Given a user visits our app
  beforeEach(() => {
    cy.visit("/");
  });

  //When a user is on the landing page

  //They see a header with app name of code talkers
  it("Should render an app header that says Code Talkers", () => {
    cy.findByRole("AppBar").contain("Talkers");
  });

  //They see a list ToDo
  it("Should find 1 lists on the page with a Header of ToDO", () => {});

  //They see a list Doing
  it("Should find 1 lists on the page with a Header of Doing", () => {});

  //They see a list Done
  it("Should find 1 lists on the page with a Header of Done", () => {});

  //They see a login button on right side top of page
  it("Should find a button with Login", () => {
    cy.get("button").contain("login");
  });

  //When they click the login button
  //they see a modal where they can input their credentials
  it("Should click the Login button and open a Modal", () => {
    cy.get("button").contain("login").click();
  });

  //when they input the credentials
  // then they see a confirmation for acceptance
  it("Should enter default credentials into Login modal and be logged in", () => {
    cy.get("button").contain("login").click();
    cy.get(".modal-dialog").should("be.visible");
  });

  //when they add text
  //and they click the add card button
  //then they should see a new card
  it("Should be able to add a card into a list", () => {});

  //when they drag a card from one list to another
  //it moves
  it("Should be able to move a card from one list to another", () => {});

  //when they hover over a card
  //and they click the trash icon
  //the card gets deleted
  it("Should be able to delete a card into  list", () => {});

  //when they click add list
  //they should be able to input a name of list
  //then click add list
  //it forms a new list
  it("Should be able to add a list", () => {});

  it("Should be able to delete a list", () => {});
});
