import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { BoardComponent } from "../components/BoardComponent";
import "@testing-library/jest-dom";

describe("BoardComponent", () => {
  describe("rendering", () => {
    it("renders the board", () => {
      let documentBody: RenderResult = render(<BoardComponent />);
      expect(documentBody.container).toBeInTheDocument();
    });

    it("renders with two rows by default", () => {
      let documentBody: RenderResult = render(<BoardComponent />);
      expect(documentBody.getAllByTestId(/row*/)).toHaveLength(2);
    });

    it("renders with two columns by default", () => {
      let documentBody: RenderResult = render(<BoardComponent />);
      expect(documentBody.getAllByTestId(/cell-\d-0/)).toHaveLength(2);
    });
    it("can be rendered with another column quantity", () => {
      let n = 8;
      let documentBody: RenderResult = render(
        <BoardComponent columnsQuantity={n} />
      );
      expect(documentBody.getAllByTestId(/cell-\d-0/)).toHaveLength(n);
    });
    it("can be rendered with another row quantity", () => {
      let n = 8;
      let documentBody: RenderResult = render(
        <BoardComponent rowsQuantity={n} />
      );
      expect(documentBody.getAllByTestId(/row*/)).toHaveLength(n);
    });
  });
  describe("change size", () => {
    it("clicking on the top right arrow increases the column quantity", () => {
      let documentBody: RenderResult = render(
        <BoardComponent editable={true} />
      );
      documentBody.getByTestId("increase-column-quantity").click();
      expect(documentBody.getAllByTestId(/cell-\d-0/)).toHaveLength(3);
    });

    it("clicking on the bottom right arrow decreases the column quantity", () => {
      let documentBody: RenderResult = render(<BoardComponent editable />);
      documentBody.getByTestId("decrease-column-quantity").click();
      expect(documentBody.getAllByTestId(/cell-\d-0/)).toHaveLength(1);
    });
    it("clicking on the top left arrow increases the row quantity", () => {
      let documentBody: RenderResult = render(<BoardComponent editable />);
      documentBody.getByTestId("increase-row-quantity").click();
      expect(documentBody.getAllByTestId(/row-\d/)).toHaveLength(1);
    });
    it("clicking on the top right arrow decreases the row quantity", () => {
      let documentBody: RenderResult = render(<BoardComponent editable />);
      documentBody.getByTestId("decrease-row-quantity").click();
      expect(documentBody.getAllByTestId(/row-\d/)).toHaveLength(3);
    });
  });
});
