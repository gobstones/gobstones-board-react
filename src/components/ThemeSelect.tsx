import React, {ChangeEvent} from "react";
import { useTranslation } from 'react-i18next';


export function ThemeSelect(props: { onChange: (event: ChangeEvent<HTMLSelectElement>) => void }) {
    const [ t ] = useTranslation();

    return (
        <div className='modal_section'>
            <label className='section_title'> {t("Select theme")}</label>
            <select className='modal_select' onChange={props.onChange} name='themes'>
                <option value='modern'> {t("Modern")}</option>
                <option value='classic'> {t("Classic")}</option>
                <option value='deuteranope'> {t("Deuteranope")}</option>
                <option value='protanope'> {t("Protanope")}</option>
                <option value='tritanope'> {t("Tritanope")}</option>
                <option value='flat'> {t("Flat")}</option>
                <option value='high-contrast'> {t("High Contrast")}</option>
                <option value='lines'> {t("Lines")}</option>
                <option value='shapes'> {t("Shapes")}</option>
            </select>
        </div>
    );
}