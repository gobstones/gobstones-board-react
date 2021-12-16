import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cell from "../components/Cell";

let cellInfo: { a: number; r: number; v: number; n: number };
let blueClickedFunction: jest.Mock<any, any>;
let blackClickedFunction: jest.Mock<any, any>;
let redClickedFunction: jest.Mock<any, any>;
let blueRemovedFunction: jest.Mock<any, any>;
let greenClickedFunction: jest.Mock<any, any>;
let redRemovedFunction: jest.Mock<any, any>;
let blackRemovedFunction: jest.Mock<any, any>;
let greenRemovedFunction: jest.Mock<any, any>;
beforeEach(() => {
  cellInfo = { a: 0, r: 1, v: 2, n: 3 };
  blueClickedFunction = jest.fn();
  blackClickedFunction = jest.fn();
  redClickedFunction = jest.fn();
  greenClickedFunction = jest.fn();
  blueRemovedFunction = jest.fn();
  blackRemovedFunction = jest.fn();
  redRemovedFunction = jest.fn();
  greenRemovedFunction = jest.fn();
});

function getCell() {
  return render(
    <Cell
      isHeader={false}
      content={cellInfo}
      addBlue={blueClickedFunction}
      removeBlue={blueRemovedFunction}
      addBlack={blackClickedFunction}
      removeBlack={blackRemovedFunction}
      addRed={redClickedFunction}
      removeRed={redRemovedFunction}
      addGreen={greenClickedFunction}
      removeGreen={greenRemovedFunction}
      attire={{ image: "", text: "" }}
    />
  );
}

describe("<Cell/>", () => {
  it("is created with a cell info content", () => {
    let documentBody = getCell();
    expect(documentBody.getByRole("blue-stone")).toHaveTextContent(
      cellInfo.a.toString()
    );
    expect(documentBody.getByRole("red-stone")).toHaveTextContent(
      cellInfo.r.toString()
    );
    expect(documentBody.getByRole("green-stone")).toHaveTextContent(
      cellInfo.v.toString()
    );
    expect(documentBody.getByRole("black-stone")).toHaveTextContent(
      cellInfo.n.toString()
    );
  });
  it("executes the given function when the blue stone is clicked", () => {
    let documentBody: RenderResult = getCell();
    documentBody.getByRole("blue-stone").click();
    expect(blueClickedFunction.mock.calls.length).toBe(1);
    expect(blackClickedFunction.mock.calls.length).toBe(0);
    expect(greenClickedFunction.mock.calls.length).toBe(0);
    expect(redClickedFunction.mock.calls.length).toBe(0);
  });
  it("executes the given function when the red stone is clicked", () => {
    let documentBody: RenderResult = getCell();
    documentBody.getByRole("red-stone").click();
    expect(blueClickedFunction.mock.calls.length).toBe(0);
    expect(redClickedFunction.mock.calls.length).toBe(1);
    expect(blackClickedFunction.mock.calls.length).toBe(0);
    expect(greenClickedFunction.mock.calls.length).toBe(0);
  });
  it("executes the given function when the black stone is clicked", () => {
    let documentBody: RenderResult = getCell();
    documentBody.getByRole("black-stone").click();
    expect(blueClickedFunction.mock.calls.length).toBe(0);
    expect(redClickedFunction.mock.calls.length).toBe(0);
    expect(blackClickedFunction.mock.calls.length).toBe(1);
    expect(greenClickedFunction.mock.calls.length).toBe(0);
  });
  it("executes the given function when the green stone is clicked", () => {
    let documentBody: RenderResult = getCell();
    fireEvent.click(documentBody.getByRole("green-stone"));
    expect(blueClickedFunction.mock.calls.length).toBe(0);
    expect(redClickedFunction.mock.calls.length).toBe(0);
    expect(blackClickedFunction.mock.calls.length).toBe(0);
    expect(greenClickedFunction.mock.calls.length).toBe(1);
  });
  it("executes the given function when the blue stone is right clicked", () => {
    let documentBody: RenderResult = getCell();
    fireEvent.contextMenu(documentBody.getByRole("blue-stone"));
    expect(blueRemovedFunction.mock.calls.length).toBe(1);
    expect(redRemovedFunction.mock.calls.length).toBe(0);
    expect(blackRemovedFunction.mock.calls.length).toBe(0);
    expect(greenRemovedFunction.mock.calls.length).toBe(0);
  });
  it("executes the given function when the red stone is right clicked", () => {
    let documentBody: RenderResult = getCell();
    fireEvent.contextMenu(documentBody.getByRole("red-stone"));
    expect(blueRemovedFunction.mock.calls.length).toBe(0);
    expect(redRemovedFunction.mock.calls.length).toBe(1);
    expect(blackRemovedFunction.mock.calls.length).toBe(0);
    expect(greenRemovedFunction.mock.calls.length).toBe(0);
  });
  it("executes the given function when the black stone is right clicked", () => {
    let documentBody: RenderResult = getCell();
    fireEvent.contextMenu(documentBody.getByRole("black-stone"));
    expect(blueRemovedFunction.mock.calls.length).toBe(0);
    expect(redRemovedFunction.mock.calls.length).toBe(0);
    expect(blackRemovedFunction.mock.calls.length).toBe(1);
    expect(greenRemovedFunction.mock.calls.length).toBe(0);
  });
  it("executes the given function when the green stone is right clicked", () => {
    let documentBody: RenderResult = getCell();
    fireEvent.contextMenu(documentBody.getByRole("green-stone"));
    expect(blueRemovedFunction.mock.calls.length).toBe(0);
    expect(redRemovedFunction.mock.calls.length).toBe(0);
    expect(blackRemovedFunction.mock.calls.length).toBe(0);
    expect(greenRemovedFunction.mock.calls.length).toBe(1);
  });
});
