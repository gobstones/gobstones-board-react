import React, { useEffect, useRef, useState } from "react";
import "../style/size-edition.css";
import dice from "../img/dice.svg";
import { randomInt } from "../utils/random";
import { CellLocation } from "./BoardComponent";
import { ThemeSelect } from "./ThemeSelect";
import { useTranslation } from "react-i18next";
import gearImgSrc from "../gear.png";

interface Props {
  initialRows: number;
  initialColumns: number;
  rowQuantitySetter: (quantity: number) => void;
  columnQuantitySetter: (quantity: number) => void;
  initialHead: CellLocation;
  headSetter: (coord: CellLocation) => void;
  exportGBB: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleBoardLoaded: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleThemeChange: (theme: string) => void;
}

function NumericInput(props: {
  label: string;
  value: number;
  onChange: (e: number) => void;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const number = parseInt(e.target.value.replace(/\D/g, ""));
    props.onChange(isNaN(number) ? 0 : number);
  }

  return (
    <div className="input_container">
      <label className="modal_label">{props.label} </label>
      <input
        className="modal_input"
        value={props.value}
        onChange={(e) => handleChange(e)}
      />
      <img
        src={dice}
        alt="Random"
        className="random_button"
        onClick={() => props.onChange(randomInt(1, 100))}
      />
    </div>
  );
}

export const SizeEditionModal = ({
  rowQuantitySetter,
  columnQuantitySetter,
  headSetter,
  initialColumns,
  initialRows,
  initialHead,
  exportGBB,
  handleBoardLoaded,
  handleThemeChange,
}: Props) => {
  const [show, setShow] = useState(false);
  const [x, setX]: [number, (x: number) => void] = useState(initialColumns);
  const [y, setY]: [number, (x: number) => void] = useState(initialRows);
  const [headY, setHeadY]: [number, (x: number) => void] = useState(
    initialHead[1]
  );
  const [headX, setHeadX]: [number, (x: number) => void] = useState(
    initialHead[0]
  );
  const [t] = useTranslation();

  const listenOpenShortcut = (e: KeyboardEvent) => {
    if (e.key === "g" && e.ctrlKey) {
      e.preventDefault();
      setShow(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", listenOpenShortcut);
    return () => document.removeEventListener("keydown", listenOpenShortcut);
  }, []);
  let fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button onClick={() => setShow(true)} className="modal_open_button">
        <img
          alt="modal open icon"
          className="modal_open_icon"
          src={gearImgSrc}
        />
      </button>
      <div className={`modal ${show && "active"}`}>
        <div className="modal_section">
          <label className="section_title">{t("Board size")}</label>
          <div className="modal_section_break" />
          <div className="modal_section_content">
            <NumericInput label={t("Columns")} value={x} onChange={setX} />
            <NumericInput label={t("Rows")} value={y} onChange={setY} />
          </div>
        </div>
        <div className="modal_section">
          <label className="section_title">{t("Head position")}</label>
          <div className="modal_section_break" />
          <div className="modal_section_content">
            <NumericInput
              label={t("At column")}
              value={headX}
              onChange={setHeadX}
            />
            <NumericInput
              label={t("At row")}
              value={headY}
              onChange={setHeadY}
            />
          </div>
        </div>
        <div className="modal_section modal_section--center">
          <div className="modal_section modal_section--column">
            <button className="modal_button" onClick={exportGBB}>
              {t("Save")}
            </button>
            <input
              style={{ display: "none" }}
              ref={fileInputRef}
              type="file"
              onChange={(e) => handleBoardLoaded(e)}
            />
            <button
              className="modal_button"
              onClick={() =>
                fileInputRef.current ? fileInputRef.current.click() : undefined
              }
            >
              {t("Open")}
            </button>
          </div>
          <div className="modal_section modal_section--column">
            <button
              className="modal_button"
              onClick={() => {
                columnQuantitySetter(4);
                rowQuantitySetter(4);
                headSetter([0, 0]);
              }}
            >
              {t("New")}
            </button>
            <button className="modal_button">{t("Random")}</button>
          </div>
        </div>
        <ThemeSelect
          onChange={(event) => handleThemeChange(event.target.value)}
        />
        <div className="modal_section modal_section--right">
          <label onClick={() => setShow(false)} className="modal_close">
            {" "}
            {t("Close")}{" "}
          </label>
          <button
            className="modal_button"
            onClick={() => {
              columnQuantitySetter(x);
              rowQuantitySetter(y);
              headSetter([headX, headY]);
              setShow(false);
            }}
          >
            {t("Done")}
          </button>
        </div>
      </div>
    </>
  );
};
