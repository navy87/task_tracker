import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Dialog = ({ render, title }) => {
    const { setDialog } = useContext(GlobalContext);

    const handleBackgroundClick = (e) => {
        setDialog(null);
    };

    return (
        <div className="dialog-container" onClick={handleBackgroundClick}>
            <div className="dialog">
                {title && <h2 className="title">{title}</h2>}
                <>{render}</>
            </div>
        </div>
    );
};

const CommonDialog = ({ text, type, subtext, onYes, onNo }) => {
    const { setDialog } = useContext(GlobalContext);

    const handleButton = (e, func) => {
        func();
        setDialog(null);
    };

    return (
        <Dialog
            render={
                <>
                    <div className="content">
                        <h4 className="text">{text}</h4>
                        <p className="subtext">{subtext}</p>
                    </div>
                    <div className="buttons">
                        <button
                            className="dialog_btn positive"
                            onClick={(e) => handleButton(e, onYes)}
                        >
                            Yes
                        </button>
                        <button
                            className="dialog_btn negative"
                            onClick={(e) => handleButton(e, onNo)}
                        >
                            No
                        </button>
                    </div>
                </>
            }
            title="Just Checking"
        />
    );
};

export const QuestionDialog = ({ title, subtext, text, onYes, onNo }) => {
    return (
        <CommonDialog
            text={text}
            type="question"
            subtext={subtext}
            onYes={onYes}
            onNo={onNo}
        />
    );
};

export default Dialog;
