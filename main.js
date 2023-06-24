"use strict";
class EmployeeOrgApp {
    constructor(ceo) {
        this.ceo = ceo;
        this.moveHistory = [];
        this.undoHistory = [];
    }
    move(employeeId, supervisorId) {
        // prevent to move employee itself
        if (employeeId === supervisorId)
            return 'Cannot do this action';
        // prevent to move ceo to subordinates
        if (employeeId === this.ceo.uniqueId)
            return 'Cannot move CEO';
        // get employee detail first by its id
        const employee = this.findEmployeeById(this.ceo, employeeId);
        const supervisor = this.findEmployeeById(this.ceo, supervisorId);
        if (!employee)
            return 'Invalid - Employee not found';
        if (!supervisor)
            return 'Invalid - Supervisor not found';
        const currentSupervisor = this.findSupervisor(this.ceo, employeeId);
        if (currentSupervisor) {
            currentSupervisor.subordinates = currentSupervisor.subordinates.filter((subordinate) => subordinate.uniqueId !== employeeId);
            // add action to history
            const previousSubordinates = currentSupervisor.subordinates.filter((subordinate) => subordinate.uniqueId !== employeeId);
            this.moveHistory.push({ employee, supervisor, currentSupervisor, previousSubordinates });
            // move previous employee subordinates to old supervisor
            currentSupervisor.subordinates.push(...employee.subordinates);
        }
        // remove subordinate before move
        const newEmployee = Object.assign(Object.assign({}, employee), { subordinates: [] });
        supervisor.subordinates.push(newEmployee);
        console.log(`Successfully move employee ${employee.name} to ${supervisor.name}`);
        this.getSubordinates();
        // clear redo action when new move perform
        this.undoHistory = [];
    }
    undo() {
        // check history from moveHistory
        const lastMove = this.moveHistory.pop();
        if (!lastMove)
            return console.log('Nothing to undo');
        const { employee, supervisor, currentSupervisor, previousSubordinates } = lastMove;
        // Remove employee from the current supervisor's subordinates
        supervisor.subordinates = supervisor.subordinates.filter(el => el.uniqueId !== employee.uniqueId);
        // Move the employee back to the previous supervisor and prevent double push on redo action
        currentSupervisor.subordinates = previousSubordinates;
        if (!currentSupervisor.subordinates.some(el => el.uniqueId === employee.uniqueId)) {
            currentSupervisor.subordinates.push(employee);
        }
        console.log(`Undo successful - Moved employee ${employee.name} back to ${currentSupervisor.name}`);
        this.getSubordinates();
        // record to redo action
        this.undoHistory.push(lastMove);
    }
    redo() {
        const lastUndo = this.undoHistory.pop();
        if (!lastUndo)
            return console.log('Nothing to redo');
        const { employee, supervisor, currentSupervisor, previousSubordinates } = lastUndo;
        // Remove employee from the current supervisor's subordinates
        currentSupervisor.subordinates = currentSupervisor.subordinates.filter(el => el.uniqueId !== employee.uniqueId);
        // Put employee back to previous supervisor
        currentSupervisor.subordinates = [...currentSupervisor.subordinates, ...employee.subordinates];
        // remove employee subordinates
        const newEmployee = Object.assign(Object.assign({}, employee), { subordinates: [] });
        supervisor.subordinates.push(newEmployee);
        console.log(`Redo successful - Moved employee ${employee.name} to ${supervisor.name}`);
        this.getSubordinates();
        // record to redo action
        this.moveHistory.push(lastUndo);
    }
    // Method to log all subordinates
    getSubordinates() {
        console.log(`Subordinates of ${this.ceo.name} are:`);
        this.printSubordinates(this.ceo.subordinates);
    }
    printSubordinates(subordinates, indentation = '') {
        for (const subordinate of subordinates) {
            console.log(`${indentation} - ${subordinate.name} (${subordinate.uniqueId})`);
            if (subordinate.subordinates.length > 0) {
                this.printSubordinates(subordinate.subordinates, `${indentation}   `);
            }
        }
    }
    // function to search employee recursively
    findEmployeeById(employee, id) {
        if (employee.uniqueId === id)
            return employee;
        for (const subordinate of employee.subordinates) {
            const foundEmployee = this.findEmployeeById(subordinate, id);
            if (foundEmployee)
                return foundEmployee;
        }
        return null;
    }
    // function to search supervisor recursively
    findSupervisor(employee, id) {
        for (const subordinate of employee.subordinates) {
            if (subordinate.uniqueId === id)
                return employee;
            const supervisor = this.findSupervisor(subordinate, id);
            if (supervisor)
                return supervisor;
        }
        return null;
    }
}
// org structure
const CEO = {
    uniqueId: 1,
    name: 'Mark Zuckerberg',
    subordinates: [
        {
            uniqueId: 2,
            name: 'Sarah Donald',
            subordinates: [
                {
                    uniqueId: 6,
                    name: 'Cassandra Reynolds',
                    subordinates: [
                        {
                            uniqueId: 11,
                            name: 'Mary Blue',
                            subordinates: []
                        },
                        {
                            uniqueId: 12,
                            name: 'Bob Saget',
                            subordinates: [
                                {
                                    uniqueId: 14,
                                    name: 'Tina Teff',
                                    subordinates: [
                                        {
                                            uniqueId: 15,
                                            name: 'Will Turner',
                                            subordinates: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            uniqueId: 3,
            name: 'Tyler Simpson',
            subordinates: [
                {
                    uniqueId: 7,
                    name: 'Harry Tobs',
                    subordinates: [
                        {
                            uniqueId: 13,
                            name: 'Thomas Brown',
                            subordinates: []
                        }
                    ]
                },
                {
                    uniqueId: 8,
                    name: 'George Carrey',
                    subordinates: []
                },
                {
                    uniqueId: 9,
                    name: 'Gary Styles',
                    subordinates: []
                }
            ]
        },
        {
            uniqueId: 4,
            name: 'Bruce Willis',
            subordinates: []
        },
        {
            uniqueId: 5,
            name: 'Georgina Flangy',
            subordinates: [
                {
                    uniqueId: 10,
                    name: 'Sophie Turner',
                    subordinates: []
                }
            ]
        }
    ]
};
