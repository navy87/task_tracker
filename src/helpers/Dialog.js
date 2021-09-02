import React, {useContext} from "react";
import {GlobalContext} from "../contexts/GlobalContext";

const DialogTypes = {info: "info", question: "question"}
Object.freeze(DialogTypes)

const Dialog = ({render, title}) => {
    const {setDialog} = useContext(GlobalContext);

    const handleBackgroundClick = (e) => {
        if (e.target.id === "id_dialog_holder") {
            setDialog(null);
        }
    };

    return (
        <div
            id="id_dialog_holder"
            className="dialog-container"
            onClick={handleBackgroundClick}
        >
            <div className="dialog">
                {title && <h2 className="title">{title}</h2>}
                <>{render}</>
            </div>
        </div>
    );
};

const CommonDialog = ({
                          text,
                          title,
                          subtext,
                          onYes,
                          onNo,
                          closeAfterwards = true,
                          type
                      }) => {
    const {setDialog} = useContext(GlobalContext);
    const handleButton = (e, func) => {
        func();
        if (closeAfterwards) {
            setDialog(null);
        }
    };

    return (
        <Dialog
            render={
                <div className="common_dialog">
                    <div className="content">
                        <h4 className="text">{text}</h4>
                        <p className="subtext">{subtext}</p>
                    </div>
                    <div className="buttons">
                        <button
                            className="dialog_btn positive"
                            onClick={(e) => handleButton(e, onYes)}
                        >
                            {type === DialogTypes.question ? "Yes" : "Okay"}
                        </button>
                        {type === DialogTypes.question && (<button
                            className="dialog_btn negative"
                            onClick={(e) => handleButton(e, onNo)}
                        >
                            No
                        </button>)}
                    </div>
                </div>
            }
            title={title}
            closeAfterwards={closeAfterwards}
        />
    );
};

export const QuestionDialog = ({
                                   title,
                                   subtext,
                                   text,
                                   onYes,
                                   onNo,
                                   closeAfterwards,
                               }) => {
    return (
        <CommonDialog
            text={text}
            type={DialogTypes.question}
            subtext={subtext}
            onYes={onYes}
            onNo={onNo}
            title={title}
            closeAfterwards={closeAfterwards}
        />
    );
};

export const InfoDialog = ({
                               title,
                               subtext,
                               text,
                               onYes,
                               onNo,
                               closeAfterwards,
                           }) => {
    return (
        <CommonDialog
            text={text}
            type={DialogTypes.info}
            subtext={subtext}
            onYes={onYes}
            title={title}
            closeAfterwards={closeAfterwards}
        />
    );
};

export default Dialog;
