import React, {useState} from 'react'
import CategoryListItem from './CategoryListItem'
import { connect } from "react-redux"
import { Box } from 'grommet'
import ChangeCategoryContainer from './ChangeCategoryContainer'

function CategoryListItemContainer({ categoryDesc, categoryTitle, changeCategory,
                                     categoryId, deleteOneCategory }) {
    let [editMode, setEditMode] = useState(false)
    return   <Box> {editMode
        ? <ChangeCategoryContainer
            setEditMode={setEditMode}
            categoryTitle={categoryTitle}
            categoryId={categoryId}
            categoryDesc={categoryDesc}
            goToEditMode={() => { setEditMode(true) }}
        />
        : <CategoryListItem
            goToEditMode={() => { setEditMode(true) }}
            categoryDesc={categoryDesc}
            categoryTitle={categoryTitle}
            categoryId={categoryId}
            deleteOneCategory={deleteOneCategory}
            changeCategory={changeCategory}
        />    }
    </Box>   
}
function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps, {})(CategoryListItemContainer)