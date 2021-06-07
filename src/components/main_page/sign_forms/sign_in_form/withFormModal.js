import React, {useState} from 'react'
import {Close} from 'grommet-icons'
import {
    Box,
    Button,
    Layer,
} from 'grommet'

/**
 * Компонент высшего порядка, оборачивающий компонент в
 * модальное окно
 *
 * @param closeModal Фукнция закрытия модального окна
 * @returns {function(*): function(*): *} - Изначальный компонент, обернутый в модальное окно, а также
 * имеющий дополнительные пропсы localLoading, setLocalLoading, отображающие загрузку обернутого компонента.
 */
export default function withFormModal(closeModal) {

    return (ComponentInsideModal) => {
        return (props) => {

            const [childComponentLoading, setChildComponentLoading] = useState(false)
            const onEsc = childComponentLoading ? () => {} : closeModal

            return (
                <Layer
                    onEsc={onEsc}
                    onClickOutside={onEsc}
                    overflow={'auto'}
                >
                    <Box
                        align={'end'}
                        margin={'medium'}
                    >
                        <Button
                            icon={<Close size={'medium'}/>}
                            onClick={onEsc}
                            id={'close_btn'}
                            disabled={childComponentLoading}
                        />
                    </Box>
                    <Box
                        fill={true}
                        justify={'center'}
                        width={'large'}
                        color={'brand'}
                        pad={'large'}
                    >
                        <ComponentInsideModal
                            {...props}
                            localLoading={childComponentLoading}
                            setLocalLoading={setChildComponentLoading}
                        />
                    </Box>
                </Layer>
            )
        }
    }
}
