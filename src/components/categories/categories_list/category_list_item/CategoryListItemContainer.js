import React, {useEffect, useState} from 'react'
import CategoryListItem from './CategoryListItem'

export default function CategoryListItemContainer({ categoryDesc, categoryTitle, updateOneCategory,
                                                    categoryId, deleteOneCategory }) {
    return <CategoryListItem
        categoryDesc={categoryDesc}
        categoryTitle={categoryTitle}
        categoryId={categoryId}
        deleteOneCategory={deleteOneCategory}
    />
}