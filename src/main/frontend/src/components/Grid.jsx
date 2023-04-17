import Cell from "./Cell";
import {forwardRef, useImperativeHandle} from "react";

function Grid({size}, ref) {
    const toggled = []

    useImperativeHandle(ref, () => ({
        getToggled: () => toggled
    }));

    const handleToggle = (gridIdx) => {
        if (toggled.includes(gridIdx))
            toggled.splice(toggled.indexOf(gridIdx), 1);
        else
            toggled.push(gridIdx);
    }

    const grid = [];
    for(let i = 0; i < size; ++i)
        for(let j = 0; j < size; ++j)
            grid.push(<Cell key={i * size + j} onToggle={() => handleToggle(i * size + j)}/>)

    const style = {
        gridTemplateColumns: `repeat(${size}, minmax(50px, 2vw))`,
        gridTemplateRows: `repeat(${size}, minmax(50px, 2vw))`
    }
    return <div className="grid centered" style={style}>{grid}</div>;
}

export default forwardRef(Grid);