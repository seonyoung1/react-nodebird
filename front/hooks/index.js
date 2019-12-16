import {useCallback, useState} from "react";

//useState, onchange 한번에 해결하는 커스텀 훅
export const useInput = (initValue = "") => {
    const [value, onChange] = useState(initValue);
    const handler = useCallback((e) => {
        onChange(e.target.value);
    }, []);
    return [value, handler];
};