import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getCategoryNameApi } from "src/api/category.api";
import Categories from "src/views/components/basic/categories/Categories";
import HelmetSEO from "src/views/utils/HelmetSEO";

const CategoriesPage = () => {
  const { categoryId } = useParams()
  const [categoryName, setCategoryName] = useState({
    gifs: [],
    categoryName: ''
  })

  useEffect(() => {
    let isMounted = true
    const getCategory = async () => {
      if (categoryId) {
        const response = await getCategoryNameApi(categoryId.toString())
        if (response.status === 200) {
          setCategoryName(response.result)
        }
      }
    }
    isMounted && getCategory()
    return () => { isMounted = false }
  }, [categoryId])

  return (
    <HelmetSEO
      title={categoryId ? `${categoryName} | DaGif` : `Categories | DaGif`}
      description={categoryId ? `DaGif ${categoryName} page` : ` DaGif Categories page`}
    >
      {!categoryId ? <Categories /> : <Outlet />}
    </HelmetSEO>
  )
}

export default CategoriesPage;