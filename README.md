# PixCap Test Assessment

This project is part of an assessment to create an Employee Organization Typescript App. The goal of this application is to manage the hierarchical structure of an organization and perform actions such as moving employees between supervisors, undoing and redoing those actions, and displaying the current hierarchy.

## Project Description

This project is built using TypeScript and follows an object-oriented programming design. It implements the `IEmployeeOrgApp` interface, which defines the required methods for managing the organization structure.

The core features of the app include:

- Moving an employee to become the subordinate of another supervisor.
- Undoing the last move action, which restores the previous hierarchy.
- Redoing a previously undone move action.
- Displaying the current hierarchy of the organization.

The app maintains a hierarchical structure of employees, where each employee is represented by the `Employee` interface. The CEO (Chief Executive Officer) is the top-level employee in the organization, and other employees can have subordinates.

## Usage

To use the Employee Organization App, follow these steps:

1. Clone the repository: `git clone https://github.com/yusufvandy/pixcap-test.git`
2. Run `main.html` directly to preferred browser.
3. Open browser developer console.
4. Instantiate `EmployeeOrgApp` with `CEO` that already defined on code.
5. Perform getSubordinates, move, undo, redo.

## Assessment Criteria

The assessment will be evaluated based on the following criteria:

1. **Efficiency of the code:** Ensure that the code is optimized and performs actions efficiently.
2. **Object-oriented programming design:** Implement clean and well-structured object-oriented code.
3. **Readability:** Write code that is easy to read, understand, and maintain.
4. **Completeness of the solution:** Implement all the required features accurately.


## License

This project is licensed under the [MIT License](LICENSE).

