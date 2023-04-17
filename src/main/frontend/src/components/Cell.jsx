import {useState} from "react";

export default function Cell({onToggle}) {
    const [state, setState] = useState(false);

    const toggle = () => {
        onToggle();
        setState(!state);
    }

    const onHover = (event) => {
        if (event.buttons === 1)
            toggle()
    }

    return <div className={`cell ${state ? 'toggled' : ''}`} onMouseEnter={onHover} onMouseDown={toggle}/>
}