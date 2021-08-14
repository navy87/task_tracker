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

// const dialogTypes = {
//     info: {
//         icon: <MdInfo className="dialog_icon info" />,
//     },
//     warning: {
//         icon: <MdWarning className="dialog_icon warning" />,
//     },
//     error: {
//         icon: <MdError className="dialog_icon error" />,
//     },
//     question: {
//         icon: <BsQuestionCircleFill className="dialog_icon question" />,
//     },
// };

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

// export const InfoDialog = ({ title, text }) => {
//     return <CommonDialog text={text} title={title} type="info" />;
// };

// export const ErrorDialog = ({ title, text }) => {
//     return <CommonDialog text={text} title={title} type="error" />;
// };

// export const WarningDialog = ({ title, text }) => {
//     return <CommonDialog text={text} title={title} type="warning" />;
// };

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

    // return (
    //     <Dialog
    //         render={
    //             <div className="common_dialog">
    //                 {dialogTypes.question.icon} <span>{text}</span>
    //             </div>
    //         }
    //         title={title}
    //     />
    // );
};

// export const ErrorDialog = ({ title, text }) => {
//     return CommonDialog(title, text, "error");
// };

// export const WarningDialog = ({ title, text }) => {
//     return CommonDialog(title, text, "question");
// };

// export const QuestionDialog = ({ title, text }) => {
//     return CommonDialog(title, text, "question");
// };

export default Dialog;
