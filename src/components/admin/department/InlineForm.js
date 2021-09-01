import React, {useState, useEffect} from "react"
const InlineForm = ({initialValue, onSubmit}) => {
    const [value, setValue] = useState(initialValue)
    const [cancelled, setCancelled] = useState(true);

    useEffect(() => {
        setCancelled(!value || value === initialValue)
    }, [value, initialValue, setCancelled])

    return <form className={"inline"} onSubmit={(e) => onSubmit(e, {value, cancelled})}>
        <input
            type={"text"}
            placeholder={"Department Name"}
            value={value}
            onChange={event => setValue(event.target.value)}
            autoFocus
        />
        <input
            type={"submit"}
            className={cancelled ? "cancel": ""}
            value={ !cancelled ? "Submit" : "Cancel"}
        />
    </form>
}

export default InlineForm;