import React from "react";
import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        // Toggle selection: close if same item is clicked again
        setSelected(selected === getCurrentId ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId) {
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

        if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
        else copyMultiple.splice(findIndexOfCurrentId, 1);

        setMultiple(copyMultiple);
    }

    return (
        <div className="div">
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                {enableMultiSelection ? "Disable" : "Enable"} MultiSelection
            </button>
            
            <div className="accordian">
                {data && data.length > 0 ? (
                    data.map(dataItem => (
                        <div className="item" key={dataItem.id}>
                            <div
                                onClick={
                                    enableMultiSelection
                                        ? () => handleMultiSelection(dataItem.id)
                                        : () => handleSingleSelection(dataItem.id)
                                }
                                className="title"
                            >
                                <h3>{dataItem.question}</h3>
                                <span>
                                    {enableMultiSelection
                                        ? multiple.includes(dataItem.id) ? "-" : "+"
                                        : selected === dataItem.id ? "-" : "+"}
                                </span>
                            </div>
                            {enableMultiSelection
                                ? multiple.includes(dataItem.id) && (
                                    <div className="content">{dataItem.answer}</div>
                                )
                                : selected === dataItem.id && (
                                    <div className="content">{dataItem.answer}</div>
                                )}
                        </div>
                    ))
                ) : (
                    <div>No data Found</div>
                )}
            </div>
        </div>
       </div> 
    );
}