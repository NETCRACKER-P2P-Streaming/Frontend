import React, { useEffect, useState } from 'react'

// Получение ширины и высоты окна в данный момент
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height
    }
}

/**
 * Хук, возвращающий актуальные ширину и высоту окна
 *
 * @returns {{width: number, height: number}} - Объект с актуальной высотой и шириной окна
 */
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    )

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}