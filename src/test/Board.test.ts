import {Board} from "../components/Board";
import EditableBoard from "../components/EditableBoard";
import {StaticBoard} from "../components/StaticBoard";

describe("Board", () => {


    test("A board is created with a columns quantity, a rows quantity", () => {
        let columnsQuantity: number = 4;
        const rowsQuantity: number = 4;
        let cellInfo: undefined = undefined;
        let board = new Board(columnsQuantity, rowsQuantity, cellInfo);
        expect(board.getColumnsQuantity()).toBe(columnsQuantity);
        expect(board.getRowsQuantity()).toBe(rowsQuantity);
        expect(board.getCellInfo()).toHaveLength(columnsQuantity);
        expect(board.getCellInfo().pop()).toHaveLength(rowsQuantity);
    });

    test("A board can be created with cell data", () => {
        let cellInfo = new Array(5);
        let anyNumber: number = 5;
        let board = new Board(anyNumber, anyNumber, cellInfo);
        expect(board.getCellInfo()).toBe(cellInfo);
    });

    test("add column to board", () => {
        let initialColumnQuantity: number = 4;
        let board: Board = new Board(initialColumnQuantity, 5, undefined);
        board.addColumn();
        expect(board.getColumnsQuantity()).toBe(initialColumnQuantity + 1);
    });
    test("add row to board", () => {
        let initialRowQuantity: number = 4;
        let board: Board = new Board(5, initialRowQuantity, undefined);
        board.addRow();
        expect(board.getRowsQuantity()).toBe(initialRowQuantity + 1);
    });

    test("retrieve specific cell information", () => {
        let cellInfo = Board.initializeMatrix(3, 3);
        let x = 1;
        let y = 2;
        const expectedInfo = {a: 1, n: 2, r: 3, v: 4};
        cellInfo[x][y] = expectedInfo;
        let board: Board = new Board(3, 3, cellInfo);
        expect(board.getCell([x, y])).toBe(expectedInfo);
    });
    describe("EditableBoard", () => {
        test("remove blue stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.removeNBlueAt([x, y], 1)
            expect(board.getCell([x, y])).toEqual({a: 0, n: 2, r: 3, v: 4});

        });
        test("remove black stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.removeNBlackAt([x, y], 1)
            expect(board.getCell([x, y])).toEqual({a: 1, n: 1, r: 3, v: 4});

        });
        test("remove red stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.removeNRedAt([x, y], 1)
            expect(board.getCell([x, y])).toEqual({a: 1, n: 2, r: 2, v: 4});

        });
        test("remove green stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.removeNGreenAt([x, y], 1)
            expect(board.getCell([x, y])).toEqual({a: 1, n: 2, r: 3, v: 3});

        });
        test("add blue stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.addNBlueAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual({a: 2, n: 2, r: 3, v: 4});

        });
        test("add black stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.addNBlackAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual({a: 1, n: 3, r: 3, v: 4});

        });
        test("add red stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.addNRedAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual({a: 1, n: 2, r: 4, v: 4});

        });
        test("add green stones from an specific cell", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new EditableBoard(3, 3, cellInfo);
            board.addNGreenAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual({a: 1, n: 2, r: 3, v: 5});
        });
    });
    describe("StaticBoard", () => {
        test("removing blue cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.removeNBlueAt([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
        test("removing black cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.removeNBlackAt([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
        test("removing red cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.removeNRedAt([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
        test("removing green cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.removeNGreenAt([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
        test("adding blue cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.addNBlueAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
        test("adding black cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.addNBlackAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
        test("adding red cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.addNRedAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
        test("adding green cells does not affect the board content", () => {
            let cellInfo = Board.initializeMatrix(3, 3);
            let x = 1;
            let y = 2;
            const initialState = {a: 1, n: 2, r: 3, v: 4};
            cellInfo[x][y] = initialState;
            let board: Board = new StaticBoard(3, 3, cellInfo);
            board.addNGreenAtOn([x, y], 1);
            expect(board.getCell([x, y])).toEqual(initialState);
        });
    });
});
