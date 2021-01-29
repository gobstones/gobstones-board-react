import React, {ChangeEvent} from "react";

export function ThemeSelect(props: { onChange: (event: ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <div className='modal_section'>
            <label className='section_title'> Select Lool</label>
            <select className='modal_select' onChange={props.onChange} name='themes'>
                <option value='modern'> Modern</option>
                <option value='classic'> Classic</option>
                <option value='deuteranope'> Deuteranope</option>
                <option value='protanope'> Protanope</option>
                <option value='tritanope'> Tritanope</option>
                <option value='flat'> Flat</option>
                <option value='high-contrast'> High Contrast</option>
                <option value='lines'> Lines</option>
                <option value='shapes'> Shapes</option>
            </select>
        </div>
    );
}